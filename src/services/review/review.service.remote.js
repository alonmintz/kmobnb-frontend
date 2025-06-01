import { httpService } from "../http.service";

export const reviewService = {
  getReviewsByStayId,
  getReviewsGeneralDataByStayId,
  getReviewsDataByStayId,
  save,
};

async function getReviewsByStayId(stayId) {
  return await httpService.get(`review/${stayId}`);
}

async function getReviewsGeneralDataByStayId(stayId) {
  return await httpService.get(`review/${stayId}/general`);
}

async function getReviewsDataByStayId(stayId) {
  return await httpService.get(`review/${stayId}/data`);
}

async function save(review) {
  return await httpService.post(`review`, review);
}
