import { storageService } from "../async-storage.service";
import { loadFromStorage, saveToStorage } from "../util.service";
import STAYS_DATA from "./stay_mockdata.json";
import { uploadService } from "../upload.service";

export const stayService = {
  getStays,
  getById,
  save,
  remove,
};

const STORAGE_KEY = "STAY_DB";
const STAYS_PER_LOAD = 20;

_createStays();

// window.cs = stayService;

const emptyFilter = {
  status: "",
  city: "",
  startDate: null,
  endDate: null,
  capacity: 0,
  isPetsAllowed: false,
  type: "",
  hostId: "",
};

async function getStays(
  filterBy = emptyFilter,
  bulkIdx = 0,
  amount = STAYS_PER_LOAD
) {
  try {
    let stays = await storageService.query(STORAGE_KEY);

    const {
      status,
      city,
      startDate,
      endDate,
      capacity,
      isPetsAllowed,
      type,
      hostId,
    } = filterBy;

    if (status) {
      stays = stays.filter((stay) => stay.status === status);
    }
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
    if (hostId) {
      stays = stays.filter((stay) => stay.host._id === hostId);
    }

    stays = stays.slice(bulkIdx * amount, bulkIdx * amount + amount);

    return stays;
  } catch (err) {
    throw new Error(err);
  }
}

async function getById(stayId) {
  try {
    return await storageService.get(STORAGE_KEY, stayId);
  } catch (err) {
    throw new Error(err);
  }
}

async function remove(stayId) {
  try {
    await storageService.remove(STORAGE_KEY, stayId);
  } catch (err) {
    throw new Error(err);
  }
}

async function save(stay) {
  const imgUrlsToSave = await _uploadNewImages(stay.imgUrls);
  const stayToSave = { ...stay, imgUrls: imgUrlsToSave };
  try {
    var savedStay;
    if (stayToSave._id) {
      savedStay = await storageService.put(STORAGE_KEY, stayToSave);
    } else {
      savedStay = await storageService.post(STORAGE_KEY, stayToSave);
    }

    return savedStay;
  } catch (err) {
    throw new Error(err);
  }
}

//private functions:

function _createStays() {
  let stays = loadFromStorage(STORAGE_KEY);
  if (!stays || !stays.length) {
    saveToStorage(STORAGE_KEY, STAYS_DATA);
  }
}

function _filterStaysByDates(stays, filterByStartDate, filterByEndDate) {
  stays = stays.filter(({ occupancy }) => {
    if (!occupancy || !occupancy.length) return true;

    const filterStart = new Date(filterByStartDate);
    const filterEnd = new Date(filterByEndDate);

    const hasOverlap = occupancy.some((period) => {
      const periodStart = new Date(period.startDate);
      const periodEnd = new Date(period.endDate);

      return (
        (filterStart >= periodStart && filterStart <= periodEnd) ||
        (filterEnd >= periodStart && filterEnd <= periodEnd) ||
        (filterStart <= periodStart && filterEnd >= periodEnd)
      );
    });

    return !hasOverlap;
  });

  return stays;
}

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
