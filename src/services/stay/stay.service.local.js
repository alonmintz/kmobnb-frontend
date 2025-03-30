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
};
window.cs = stayService;

async function query(
  filterBy = {
    city: "",
    startDate: null,
    endDate: null,
    capacity: 0,
    isPetsAllowed: false,
    type: "",
  }
) {
  var stays = await storageService.query(STORAGE_KEY);
  //TODO: refactor to stays logic
  const { city, startDate, endDate, capacity, isPetsAllowed, type } = filterBy;

  if (city) {
    stays = stays.filter((stay) => stay.loc.city === city);
  }
  if (capacity > 0) {
    stays = stays.filter((stay) => stay.capacity > capacity);
  }
  if (isPetsAllowed) {
    stays = stays.filter((stay) => stay.amenities.includes("Pets allowed"));
  }
  if (startDate && endDate) {
    stays = _filterStaysByDates(stays, startDate, endDate);
  }
  if (type) {
    stays = stays.filter((stay) => stay.type === type);
  }

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

//private functions:

function _filterStaysByDates(stays, startDate, endDate) {
  return;
}
