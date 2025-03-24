import { storageService } from "../async-storage.service";
import { makeId } from "../util.service";
import { userService } from "../user";

const STORAGE_KEY = "stay";

//TODO: refactor function to suit our needs
export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
};
window.cs = stayService;

async function query(filterBy = { txt: "", price: 0 }) {
  var stays = await storageService.query(STORAGE_KEY);
  //TODO: refactor to stays logic
  //   const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy;

  //   if (txt) {
  //     const regex = new RegExp(filterBy.txt, "i");
  //     stays = stays.filter(
  //       (stay) => regex.test(stay.vendor) || regex.test(stay.description)
  //     );
  //   }
  //   if (minSpeed) {
  //     stays = stays.filter((stay) => stay.speed >= minSpeed);
  //   }
  //   if (sortField === "vendor" || sortField === "owner") {
  //     stays.sort(
  //       (stay1, stay2) =>
  //         stay1[sortField].localeCompare(stay2[sortField]) * +sortDir
  //     );
  //   }
  //   if (sortField === "price" || sortField === "speed") {
  //     stays.sort(
  //       (stay1, stay2) => (stay1[sortField] - stay2[sortField]) * +sortDir
  //     );
  //   }

  //   stays = stays.map(({ _id, vendor, price, speed, owner }) => ({
  //     _id,
  //     vendor,
  //     price,
  //     speed,
  //     owner,
  //   }));
  return stays;
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId);
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId);
}

async function save(stay) {
  var savedStay;
  //TODO: refactor to stays logic

  //   if (stay._id) {
  //     const stayToSave = {
  //       _id: stay._id,
  //       price: stay.price,
  //       speed: stay.speed,
  //     };
  //     savedStay = await storageService.put(STORAGE_KEY, stayToSave);
  //   } else {
  //     const stayToSave = {
  //       vendor: stay.vendor,
  //       price: stay.price,
  //       speed: stay.speed,
  //       // Later, owner is set by the backend
  //       owner: userService.getLoggedinUser(),
  //       msgs: [],
  //     };
  //     savedStay = await storageService.post(STORAGE_KEY, stayToSave);
  //   }
  return savedStay;
}

async function addStayMsg(stayId, txt) {
  //TODO: refactor to stays logic
  //   const stay = await getById(stayId);

  //   const msg = {
  //     id: makeId(),
  //     by: userService.getLoggedinUser(),
  //     txt,
  //   };
  //   stay.msgs.push(msg);
  //   await storageService.put(STORAGE_KEY, stay);

  return msg;
}
