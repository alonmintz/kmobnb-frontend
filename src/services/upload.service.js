const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET } =
  import.meta.env;

export const uploadService = {
  uploadImg,
};

async function uploadImg(file) {
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();

  // Building the request body
  formData.append("file", file);
  formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);

  // Sending a post method request to Cloudinary API
  try {
    const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
    const imgData = await res.json();

    return imgData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
