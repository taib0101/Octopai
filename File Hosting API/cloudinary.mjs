import { v2 as cloudinary} from "cloudinary";

// URL: https://console.cloudinary.com/pm/c-e314caf5b521a8363eae92d050cfd4/media-explorer

cloudinary.config({
  cloud_name: "name",
  api_key: "key",
  api_secret: "secret",
});

export const cloudinaryUpload = async (req, res, next) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      "./upload/Mustain Murtaza Taib_+8801969330120.pdf",
      { public_id: "Mustain Murtaza Taib" }
    );

    console.log("cloudinary secured URL :", uploadResult.secure_url);
    next();
  } catch (error) {
    console.log("cloudinary error :", error.message);
  }
};
