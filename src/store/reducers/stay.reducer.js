import { INITIAL_GUESTS } from "../../services/stay/index";

export const SET_STAYS = "SET_STAYS";
export const INCREMENT_STAYS = "INCREMENT_STAYS";
export const SET_BULK_INDEX = "SET_BULK_INDEX";
export const INCREMENT_BULK_INDEX = "INCREMENT_BULK_INDEX";
export const SET_STAY = "SET_STAY";
export const REMOVE_STAY = "REMOVE_STAY";
export const ADD_STAY = "ADD_STAY";
export const UPDATE_STAY = "UPDATE_STAY";
export const SET_LISTINGS = "SET_LISTINGS";
export const INCREMENT_LISTINGS = "INCREMENT_LISTINGS";
export const ADD_LISTING = "ADD_LISTING";
export const UPDATE_LISTING = "UPDATE_LISTING";
export const ADD_STAY_MSG = "ADD_STAY_MSG";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const REPLACE_FILTER_BY = "REPLACE_FILTER_BY";
export const RESET_FILTER_BY = "RESET_FILTER_BY";
export const SET_GUESTS = "SET_GUESTS";
export const SET_DATES_RANGE = "SET_DATES_RANGE";

const initialState = {
  stays: [],
  hostListings: [],
  stay: null,
  lastRemovedStay: null,
  filterBy: {},
  guests: structuredClone(INITIAL_GUESTS),
  datesRange: [],
};

export function stayReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_STAYS:
      return { ...state, stays: action.stays };
    case INCREMENT_STAYS:
      return { ...state, stays: [...state.stays, ...action.stays] };
    case SET_STAY:
      return { ...state, stay: action.stay };
    case REMOVE_STAY: {
      const lastRemovedStay = state.stays.find(
        (stay) => stay._id === action.stayId
      );
      const stays = state.stays.filter((stay) => stay._id !== action.stayId);
      return { ...state, stays, lastRemovedStay };
    }
    case ADD_STAY:
      return {
        ...state,
        hostListings: [...state.hostListings, action.stay],
      };
    case UPDATE_STAY: {
      const stays = state.stays.map((stay) =>
        stay._id === action.stay._id ? action.stay : stay
      );
      return { ...state, stays };
    }
    case SET_LISTINGS:
      return { ...state, hostListings: action.hostListings };
    case INCREMENT_LISTINGS:
      return {
        ...state,
        hostListings: [...state.hostListings, ...action.hostListings],
      };
    case ADD_LISTING:
      return {
        ...state,
        hostListings: [...state.hostListings, action.listing],
      };
    case UPDATE_LISTING: {
      const hostListings = state.hostListings.map((listing) =>
        listing._id === action.listing._id ? action.listing : listing
      );
      return { ...state, hostListings };
    }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...action.filterBy },
      };
    case REPLACE_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy },
      };
    case RESET_FILTER_BY: {
      const emptyFilter = {};
      return {
        ...state,
        filterBy: emptyFilter,
      };
    }
    case SET_GUESTS:
      return { ...state, guests: [...action.guests] };
    case SET_DATES_RANGE:
      return { ...state, datesRange: [...action.datesRange] };
    default:
      return state;
  }
}