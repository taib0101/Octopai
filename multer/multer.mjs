import multer from "multer";

// For Store the file , giving destiantion and filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    return callback(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.fieldname === "image" && file.mimetype === "image/png") {
      return callback(null, true);
    } else if (
      file.fieldname === "pdf" &&
      file.mimetype === "application/pdf"
    ) {
      return callback(null, true);
    } else {
      return callback(new Error("File are accepted only image or pdf"));
    }
  },

  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});
