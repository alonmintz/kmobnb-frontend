const { DEV, LOCAL } = import.meta.env;

// import { INITIAL_GUESTS, stayService as local } from "./stay.service.local";
import { stayService as local } from "./stay.service.local";
import { stayService as remote } from "./stay.service.remote";
import { imgService } from "../img.service";

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
    imgUrl: imgService.getCityIconImage("Maui"),
  },
  {
    city: "Montreal",
    country: "Canada",
    phrase: "French-Canadian charm and vibrant culture",
    imgUrl: imgService.getCityIconImage("Montreal"),
  },
  {
    city: "Porto",
    country: "Portugal",
    phrase: "Historic riverside city with wine and charm",
    imgUrl: imgService.getCityIconImage("Porto"),
  },
  {
    city: "New York",
    country: "United States",
    phrase: "The city that never sleeps",
    imgUrl: imgService.getCityIconImage("New York"),
  },
  {
    city: "Barcelona",
    country: "Spain",
    phrase: "Beachside beauty with Gaudí’s magic",
    imgUrl: imgService.getCityIconImage("Barcelona"),
  },
  {
    city: "Istanbul",
    country: "Turkey",
    phrase: "Where East meets West in stunning style",
    imgUrl: imgService.getCityIconImage("Istanbul"),
  },
  {
    city: "Hong Kong",
    country: "Hong Kong",
    phrase: "Skyline views, street food, and endless energy",
    imgUrl: imgService.getCityIconImage("Hong Kong"),
  },
  {
    city: "Sydney",
    country: "Australia",
    phrase: "Harbor life with iconic Aussie vibes",
    imgUrl: imgService.getCityIconImage("Sydney"),
  },
  {
    city: "Rio De Janeiro",
    country: "Brazil",
    phrase: "Beaches, samba, and breathtaking views",
    imgUrl: imgService.getCityIconImage("Rio De Janeiro"),
  },
];

function getEmptyStay() {
  return {
    name: "",
    imgUrls: [null, null, null, null, null],
    price: 0,
    capacity: 1,
    bathrooms: 1,
    bedrooms: 1,
    amenities: [],
    summary: "",
    loc: {},
  };
}

function getDefaultFilter() {
  return {
    city: "",
    startDate: null,
    endDate: null,
    capacity: 0,
    isPetsAllowed: false,
    type: "",
  };
}

function getFilterByFromSearchParams(searchParams) {
  const filterBy = {};

  for (const [key, value] of searchParams.entries()) {
    if (value === "true") {
      filterBy[key] = true;
    } else if (value === "false") {
      filterBy[key] = false;
    } else if (!isNaN(value) && value.trim() !== "") {
      filterBy[key] = +value;
    } else {
      filterBy[key] = value;
    }
  }

  return filterBy;
}

function getGuestsFromSearchParams(searchParams) {
  const guests = structuredClone(INITIAL_GUESTS);
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  const {
    adults = "0",
    children = "0",
    infants = "0",
    pets = "0",
  } = searchParamsObj;

  const typeToCountMap = {
    adults: +adults,
    children: +children,
    infants: +infants,
    pets: +pets,
  };

  guests.forEach((guest) => {
    if (typeToCountMap.hasOwnProperty(guest.type)) {
      guest.count = typeToCountMap[guest.type];
    }
  });

  return guests;
}

function getDatesRangeFromSearchParams(searchParams) {
  return [searchParams.get("startDate"), searchParams.get("endDate")];
}

function getEmptyLocation() {
  return {
    country: "",
    countryCode: "",
    city: "",
    address: "",
    lat: "",
    lan: "",
  };
}

// console.log("local_env:", LOCAL);

//TODO: modify to remote when we learn backend
const service = LOCAL === "true" ? local : remote;
export const stayService = {
  getEmptyStay,
  getDefaultFilter,
  getFilterByFromSearchParams,
  getGuestsFromSearchParams,
  getDatesRangeFromSearchParams,
  getEmptyLocation,
  ...service,
};

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService;
