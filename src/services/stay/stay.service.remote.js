import { httpService } from "../http.service";
//TODO: refactor function to suit our needs

export const stayService = {
  query,
  getById,
  save,
  remove,
  // addStayMsg,
};

async function query(filterBy = { txt: "", price: 0 }) {
  return httpService.get(`stay`, filterBy);
}

function getById(stayId) {
  return httpService.get(`stay/${stayId}`);
}

async function remove(stayId) {
  return httpService.delete(`stay/${stayId}`);
}
async function save(stay) {
  var savedStay;
  if (stay._id) {
    savedStay = await httpService.put(`stay/${stay._id}`, stay);
  } else {
    savedStay = await httpService.post("stay", stay);
  }
  return savedStay;
}

//TODO: delete if not relevant
// async function addStayMsg(stayId, txt) {
//   const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt });
//   return savedMsg;
// }
