// redux/requests/reducer.js
import {
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAIL,
  SEND_SWAP_REQUEST_REQUEST,
  SEND_SWAP_REQUEST_SUCCESS,
  SEND_SWAP_REQUEST_FAIL,
  FETCH_REQUESTS_START,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_FAIL,
  ACCEPT_REQUEST_SUCCESS,
  REJECT_REQUEST_SUCCESS,
  DELETE_REQUEST_SUCCESS,
} from "./actionType";

const initialState = {
  profiles: [],
  requests: [],
  loading: false,
  sending: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILES_REQUEST:
      return { ...state, loading: true };

    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
      };

    case FETCH_PROFILES_FAIL:
      return { ...state, loading: false };

    case SEND_SWAP_REQUEST_REQUEST:
      return { ...state, sending: true };

    case SEND_SWAP_REQUEST_SUCCESS:
      return { ...state, sending: false };

    case SEND_SWAP_REQUEST_FAIL:
      return { ...state, sending: false };

    case FETCH_REQUESTS_START:
      return {
        ...state,
        loading: true,
      };

    case FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };

    case FETCH_REQUESTS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.map((req) =>
          req._id === action.payload ? { ...req, status: "accepted" } : req,
        ),
      };

    case REJECT_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.map((req) =>
          req._id === action.payload ? { ...req, status: "rejected" } : req,
        ),
      };

    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.filter((req) => req._id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
