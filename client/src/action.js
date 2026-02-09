/* eslint-disable no-unused-vars */
// redux/requests/actions.js
import toast from "react-hot-toast";
import { Authurl } from "./assets/api";
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

/* FETCH PROFILES  */

export const fetchProfiles = () => async (dispatch) => {
  dispatch({ type: FETCH_PROFILES_REQUEST });

  try {
    const res = await fetch(`${Authurl}/get-skills`);
    const data = await res.json();

    dispatch({
      type: FETCH_PROFILES_SUCCESS,
      payload: data.alluser,
    });
  } catch (error) {
    dispatch({ type: FETCH_PROFILES_FAIL });
    toast.error("Failed to load profiles");
  }
};

/* SEND SWAP REQUEST  */

export const sendSwapRequest =
  ({ receiverId, skillOffered, skillToLearn, message }) =>
  async (dispatch) => {
    dispatch({ type: SEND_SWAP_REQUEST_REQUEST });

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${Authurl}/swap-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId,
          skillOffered,
          skillToLearn,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      dispatch({ type: SEND_SWAP_REQUEST_SUCCESS });
      toast.success("Request sent successfully");
    } catch (error) {
      dispatch({ type: SEND_SWAP_REQUEST_FAIL });
      toast.error(error.message || "Failed to send request");
    }
  };

/* FETCH REQUESTS */
export const fetchRequests = (activeTab) => async (dispatch) => {
  dispatch({ type: FETCH_REQUESTS_START });

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${Authurl}/${activeTab}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error();

    dispatch({
      type: FETCH_REQUESTS_SUCCESS,
      payload: data.requests,
    });
  } catch (error) {
    toast.error("Failed to load requests");
    dispatch({ type: FETCH_REQUESTS_FAIL });
  }
};

/*  ACCEPT  */
export const acceptRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${Authurl}/accept/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error();

    toast.success("Request accepted");
    dispatch({ type: ACCEPT_REQUEST_SUCCESS, payload: id });
  } catch {
    toast.error("Failed to accept request");
  }
};

/* REJECT  */
export const rejectRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${Authurl}/reject/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error();

    toast.success("Request rejected");
    dispatch({ type: REJECT_REQUEST_SUCCESS, payload: id });
  } catch {
    toast.error("Failed to reject request");
  }
};

/* DELETE SENT*/
export const deleteSentRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${Authurl}/sent/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error();

    toast.success("Request cancelled");
    dispatch({ type: DELETE_REQUEST_SUCCESS, payload: id });
  } catch {
    toast.error("Failed to cancel request");
  }
};
