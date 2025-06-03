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
        stays: [...state.stays, action.stay],
        hostListings: [...state.hostListings, action.stay],
      };
    case UPDATE_STAY: {
      const stays = state.stays.map((stay) =>
        stay._id === action.stay._id ? action.stay : stay
      );
      const hostListings = state.hostListings.map((listing) =>
        listing._id === action.stay._id ? action.stay : listing
      );
      return { ...state, stays, hostListings };
    }
    case SET_LISTINGS:
      return { ...state, hostListings: action.hostListings };
    case INCREMENT_LISTINGS:
      return {
        ...state,
        hostListings: [...state.hostListings, ...action.hostListings],
      };
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

// unitTestReducer()

// eslint-disable-next-line no-unused-vars
// function unitTestReducer() {
//   var state = initialState;
//   const stay1 = {
//     _id: "b101",
//     vendor: "Stay " + parseInt(Math.random() * 10),
//     msgs: [],
//   };
//   const stay2 = {
//     _id: "b102",
//     vendor: "Stay " + parseInt(Math.random() * 10),
//     msgs: [],
//   };

//   state = stayReducer(state, { type: SET_STAYS, stays: [stay1] });
//   console.log("After SET_STAYS:", state);

//   state = stayReducer(state, { type: ADD_STAY, stay: stay2 });
//   console.log("After ADD_STAY:", state);

//   state = stayReducer(state, {
//     type: UPDATE_STAY,
//     stay: { ...stay2, vendor: "Good" },
//   });
//   console.log("After UPDATE_STAY:", state);

//   state = stayReducer(state, { type: REMOVE_STAY, stayId: stay2._id });
//   console.log("After REMOVE_STAY:", state);

//   // const msg = { id: "m" + parseInt(Math.random() * 100), txt: "Some msg" };
//   // state = stayReducer(state, { type: ADD_STAY_MSG, stayId: stay1._id, msg });
//   // console.log("After ADD_STAY_MSG:", state);

//   state = stayReducer(state, { type: REMOVE_STAY, stayId: stay1._id });
//   console.log("After REMOVE_STAY:", state);
// }
