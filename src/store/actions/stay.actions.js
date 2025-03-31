import { stayService } from "../../services/stay";
import { store } from "../store";
import {
  ADD_STAY,
  REMOVE_STAY,
  SET_STAYS,
  SET_STAY,
  UPDATE_STAY,
  SET_FILTER_BY,
  RESET_FILTER_BY,
} from "../reducers/stay.reducer";

export const stayActions = {
  loadStays,
  getStayById,
  removeStay,
  addStay,
  updateStay,
  setFilterBy,
  resetFilterBy,
};

async function loadStays(filterBy, startIdx, amount) {
  try {
    const stays = await stayService.query(filterBy, startIdx, amount);
    store.dispatch({
      type: SET_STAYS,
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

async function addStay(stay) {
  try {
    const savedStay = await stayService.save(stay);
    store.dispatch({
      type: ADD_STAY,
      stay,
    });
    return savedStay;
  } catch (err) {
    console.log("Cannot add stay", err);
    throw err;
  }
}

async function updateStay(stay) {
  try {
    const savedStay = await stayService.save(stay);
    store.dispatch({
      type: UPDATE_STAY,
      stay,
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
      type: SET_FILTER_BY,
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

// unitTestActions()
// eslint-disable-next-line no-unused-vars
// async function unitTestActions() {
//   await loadStays();
//   await addStay(stayService.getEmptyStay());
//   await updateStay({
//     _id: "m1oC7",
//     title: "Stay-Good",
//   });
//   await removeStay("m1oC7");
//   // TODO unit test addStayMsg
// }
