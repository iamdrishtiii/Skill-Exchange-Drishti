const express = require("express");
const app = express();
const dbConnection = require("./config/config");
const dotenv = require("dotenv");
const cors = require("cors");
const userroute = require("./routes/userRoute");
const swapReqRoute = require("./routes/swapReqRoute")
dotenv.config();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(userroute);
app.use(swapReqRoute)

dbConnection();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
