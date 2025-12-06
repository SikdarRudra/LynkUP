import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (file) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;
  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });

  return result.secure_url;
};

export default uploadOnCloudinary;
