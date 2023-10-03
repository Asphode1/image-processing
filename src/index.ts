import sharp from "sharp";
import express from "express";
import multer from "multer";

import "dotenv/config";
import axios from "axios";

const app = express();
const upload = multer();

app.post("/image-process", upload.single("image"), async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not Allowed");
  }
  const resizedImageBuffer = await sharp(req.file.buffer).resize(1920, 1080).toFormat("jpg").toBuffer();
  const formData = new FormData();
  formData.append("content", resizedImageBuffer.toString("base64"));
  await axios
    .post(process.env.GAS_UPLOAD_URL, formData)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
});

app.listen(8000, () => {
  console.log("server listening on port 8000....");
});
