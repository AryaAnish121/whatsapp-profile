import setImage from "./setImage.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  await setImage();
  res.send("done.");
});

app.listen(PORT, () => {
  console.log("server started at " + PORT);
});
