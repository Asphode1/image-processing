"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)();
app.post("/image-process", upload.single("image"), async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send("Method not Allowed");
    }
    const resizedImageBuffer = await (0, sharp_1.default)(req.file.buffer).resize(1920, 1080).toFormat("jpg").toBuffer();
    const formData = new FormData();
    formData.append("content", resizedImageBuffer.toString("base64"));
    await axios_1.default
        .post(process.env.GAS_UPLOAD_URL, formData)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
});
app.get("/", (req, res) => {
    return res.status(200).send("Hello world");
});
app.listen(8000, () => {
    console.log("server listening on port 8000....");
});
//# sourceMappingURL=index.js.map