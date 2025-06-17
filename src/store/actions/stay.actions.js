import { stayService } from "../../services/stay";
import { store } from "../store";
import {
  ADD_STAY,
  REMOVE_STAY,
  SET_STAYS,
  INCREMENT_STAYS,
  SET_STAY,
  UPDATE_STAY,
  REPLACE_FILTER_BY,
  RESET_FILTER_BY,
  SET_GUESTS,
  SET_DATES_RANGE,
  SET_LISTINGS,
  INCREMENT_LISTINGS,
  ADD_LISTING,
  UPDATE_LISTING,
} from "../reducers/stay.reducer";

export const stayActions = {
  loadStays,
  getStayById,
  removeStay,
  addListing,
  updateListing,
  setFilterBy,
  resetFilterBy,
  setGuests,
  setDatesRange,
  loadHostListings,
  updateListingStatus,
};

async function loadStays(filterBy, bulkIdx = 0, bulkSize = 20) {
  try {
    const stays = await stayService.getStays({
      ...filterBy,
      bulkIdx,
      bulkSize,
    });
    store.dispatch({
      type: bulkIdx !== 0 ? INCREMENT_STAYS : SET_STAYS,
      stays,
    });

    return stays;
  } catch (err) {
    console.log("Cannot load stays", err);
    throw err;
  }
}

async function getStayById(stayId) {
  try {
    const stay = await stayService.getById(stayId);
    store.dispatch({
      type: SET_STAY,
      stay,
    });
    return stay;
  } catch (err) {
    console.log("Cannot load stay", err);
    throw err;
  }
}

async function removeStay(stayId) {
  try {
    await stayService.remove(stayId);
    store.dispatch({
      type: REMOVE_STAY,
      stayId,
    });
  } catch (err) {
    console.log("Cannot remove stay", err);
    throw err;
  }
}

async function addListing(listing) {
  try {
    const savedStay = await stayService.save(listing);
    const stayToStore = {
      ...savedStay,
      nearAvailableDates: _populateNearAvailableDates(),
    };

    store.dispatch({
      type: ADD_LISTING,
      listing: stayToStore,
    });
    return stayToStore;
  } catch (err) {
    console.log("Cannot add stay", err);
    throw err;
  }
}

async function updateListing(listing) {
  try {
    const savedStay = await stayService.save(listing);
    store.dispatch({
      type: UPDATE_LISTING,
      listing,
    });
    return savedStay;
  } catch (err) {
    console.log("Cannot save stay", err);
    throw err;
  }
}

async function setFilterBy(filterBy) {
  try {
    await store.dispatch({
      type: REPLACE_FILTER_BY,
      filterBy,
    });
    return filterBy;
  } catch (err) {
    console.log("cannot set filter by", err);
    throw err;
  }
}

async function resetFilterBy() {
  const emptyFilter = {};
  try {
    await store.dispatch({
      type: RESET_FILTER_BY,
    });
    return emptyFilter;
  } catch (err) {
    console.log("cannot reset filter by", err);
    throw err;
  }
}

async function setGuests(guests) {
  try {
    await store.dispatch({ type: SET_GUESTS, guests });
  } catch (err) {
    console.log("cannot set guests", err);
    throw err;
  }
}

async function setDatesRange(datesRange) {
  try {
    await store.dispatch({ type: SET_DATES_RANGE, datesRange });
  } catch (err) {
    console.log("cannot set dates range", err);
    throw err;
  }
}

async function loadHostListings(filterBy = {}, bulkIdx = 0, bulkSize = 20) {
  try {
    filterBy = {
      listType: "by-host",
      bulkIdx,
      bulkSize,
    };
    const hostListings = await stayService.getStays(filterBy);
    store.dispatch({
      type: bulkIdx !== 0 ? INCREMENT_LISTINGS : SET_LISTINGS,
      hostListings,
    });

    return hostListings;
  } catch (err) {
    console.log("Cannot load listings:", err);
    throw err;
  }
}

async function updateListingStatus(listing, status) {
  try {
    const savedListing = await stayService.updateStatus(listing._Id, {
      _id: listing._id,
      status,
    });
    store.dispatch({
      type: UPDATE_LISTING,
      listing: savedListing,
    });
    return savedListing;
  } catch (err) {
    console.log("Update listing status failed:", err);
  }
}

function _populateNearAvailableDates() {
  const now = new Date();
  const startDate = now.toISOString();

  // Add 2 nights (2 days) to now
  const end = new Date(now);
  end.setDate(now.getDate() + 2);
  const endDate = end.toISOString();

  return {
    startDate,
    endDate,
  };
}
