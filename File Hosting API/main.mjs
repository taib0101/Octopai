import express from "express";
import swaggerUI from "swagger-ui-express";

import { upload } from "./multer.mjs";
import { cloudinaryUpload } from "./cloudinary.mjs";
import { verify } from "./authentication.mjs";
import { specs } from "./swagger.mjs";

const app = express();
const router = express.Router();

app.use(router);
router.use(express.json());
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const uploadFields = [
  { name: "image", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
];

// http://127.0.0.1:3000/upload
// token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGFpYiIsInBhc3N3b3JkIjoiMTIzNCIsImlhdCI6MTczNzYyNDkxN30.c9XiKwDdSlPzzcAvX_2fKB330C25yJww8sXfPzhpvJM

router.post(
  "/upload",
  [verify, upload.fields(uploadFields), cloudinaryUpload],
  (req, res) => {
    console.log("request file :", req.files);
    const response = [];

    if (req.files.image) {
      response.push({
        url: req.files["image"][0].path,
        type: req.files["image"][0].mimetype,
        size: req.files["image"][0].size,
      });
    }

    if (req.files.pdf) {
      response.push({
        url: req.files["pdf"][0].path,
        type: req.files["pdf"][0].mimetype,
        size: req.files["pdf"][0].size,
      });
    }

    console.log(req.files);
    return res.status(200).json({
      response,
    });
  }
);

router.use((err, req, res, next) => {
  console.log("error message : ", err.message);
  console.log(err);
  return res.status(200).json({
    status: "error",
  });
});

app.listen(3000, () => {
  console.log(`listening port is 3000`);
});
