const { DEV, VITE_LOCAL } = import.meta.env;

import { getRandomIntInclusive, makeId } from "../util.service";

import { stayService as local } from "./stay.service.local";
// import { stayService as remote } from "./stay.service.remote";

function getEmptyStay() {
  //TODO: refactor to stay object
  return {};
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

//TODO: modify to remote when we learn backend
// const service = VITE_LOCAL === "true" ? local : remote;
const service = local;
export const stayService = { getEmptyStay, getDefaultFilter, ...service };

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService;
