import { storageService } from "../async-storage.service";
import { loadFromStorage, saveToStorage } from "../util.service";
import STAYS_DATA from "./stay_mockdata.json";
import mauiIcon from "../../assets/img/city-icons/maui-icon.png";
import montrealIcon from "../../assets/img/city-icons/montreal-icon.png";
import portoIcon from "../../assets/img/city-icons/porto-icon.png";
import newYorkIcon from "../../assets/img/city-icons/new-york-icon.png";
import barcelonaIcon from "../../assets/img/city-icons/barcelona-icon.png";
import istanbulIcon from "../../assets/img/city-icons/istanbul-icon.png";
import hongKongIcon from "../../assets/img/city-icons/hong-kong-icon.png";
import sydneyIcon from "../../assets/img/city-icons/sydney-icon.png";
import rioDeJaneiroIcon from "../../assets/img/city-icons/rio-de-janeiro-icon.png";

export const INITIAL_GUESTS = [
  { type: "adults", desc: "Ages 13 or above", count: 0 },
  { type: "children", desc: "Ages 2 – 12", count: 0 },
  { type: "infants", desc: "Under 2", count: 0 },
  { type: "pets", desc: "Bringing a service animal?", count: 0 },
];

export const CITY_OPTIONS = [
  {
    city: "Maui",
    country: "United States",
    phrase: "Tropical paradise with beaches and volcanoes",
    imgUrl: mauiIcon,
  },
  {
    city: "Montreal",
    country: "Canada",
    phrase: "French-Canadian charm and vibrant culture",
    imgUrl: montrealIcon,
  },
  {
    city: "Porto",
    country: "Portugal",
    phrase: "Historic riverside city with wine and charm",
    imgUrl: portoIcon,
  },
  {
    city: "New York",
    country: "United States",
    phrase: "The city that never sleeps",
    imgUrl: newYorkIcon,
  },
  {
    city: "Barcelona",
    country: "Spain",
    phrase: "Beachside beauty with Gaudí’s magic",
    imgUrl: barcelonaIcon,
  },
  {
    city: "Istanbul",
    country: "Turkey",
    phrase: "Where East meets West in stunning style",
    imgUrl: istanbulIcon,
  },
  {
    city: "Hong Kong",
    country: "Hong Kong",
    phrase: "Skyline views, street food, and endless energy",
    imgUrl: hongKongIcon,
  },
  {
    city: "Sydney",
    country: "Australia",
    phrase: "Harbor life with iconic Aussie vibes",
    imgUrl: sydneyIcon,
  },
  {
    city: "Rio De Janeiro",
    country: "Brazil",
    phrase: "Beaches, samba, and breathtaking views",
    imgUrl: rioDeJaneiroIcon,
  },
];
const STORAGE_KEY = "STAY_DB";
const STAYS_PER_LOAD = 20;

_createStays();

export const stayService = {
  query,
  getById,
  save,
  remove,
};

// window.cs = stayService;

const emptyFilter = {
  city: "",
  startDate: null,
  endDate: null,
  capacity: 0,
  isPetsAllowed: false,
  type: "",
  hostId: ""
}

async function query(
  filterBy = emptyFilter,
  bulkIdx = 0,
  amount = STAYS_PER_LOAD
) {
  try {
    let stays = await storageService.query(STORAGE_KEY);

    const { city, startDate, endDate, capacity, isPetsAllowed, type, hostId } =
      filterBy;

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
  try {
    var savedStay;
    if (stay._id) {
      const stayToSave = {
        ...stay,
      };
      savedStay = await storageService.put(STORAGE_KEY, stayToSave);
    } else {
      //TODO: later on, add a function that populates the added stay with data not presented in the "edit stay" in the UI
      const stayToSave = {
        ...stay,
      };
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
