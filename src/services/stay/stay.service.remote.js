import { httpService } from "../http.service";
import { uploadService } from "../upload.service";

export const stayService = {
  getStays,
  getById,
  save,
  updateStatus,
};

async function getStays(filterBy) {
  return httpService.get(`stay`, filterBy);
}

function getById(stayId) {
  return httpService.get(`stay/${stayId}`);
}

async function save(stay) {
  const imgUrlsToSave = await _uploadNewImages(stay.imgUrls);
  const stayToSave = { ...stay, imgUrls: imgUrlsToSave, status: "active" };
  var savedStay;
  if (stayToSave._id) {
    savedStay = await httpService.put(`stay/${stay._id}`, stayToSave);
  } else {
    savedStay = await httpService.post("stay", stayToSave);
  }
  return savedStay;
}

async function updateStatus(listingId, statusObj) {
  return httpService.put(`stay/${listingId}/status`, statusObj);
}

//private functions:

async function _uploadNewImages(imgUrls) {
  const uploadedUrls = await Promise.all(
    imgUrls.map(async (imgObj) => {
      if (typeof imgObj === "string") return imgObj;
      if (imgObj && imgObj.file) {
        const { secure_url } = await uploadService.uploadImg(imgObj.file);
        return secure_url;
      }
      return imgObj; // fallback if not string or valid object
    })
  );
  return uploadedUrls;
}
