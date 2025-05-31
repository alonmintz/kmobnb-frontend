const { DEV, VITE_LOCAL } = import.meta.env;

import { INITIAL_GUESTS, stayService as local } from "./stay.service.local";
import { stayService as remote } from "./stay.service.remote";

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

//TODO: modify to remote when we learn backend
const service = VITE_LOCAL === "true" ? local : remote;
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
