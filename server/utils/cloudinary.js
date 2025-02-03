import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (image) => {
  try {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "ff" }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }).end(buffer);
    });

    return uploadResult;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    throw new Error(`Image delete failed: ${error.message}`);
  }
};

export { uploadImage, deleteImage };
