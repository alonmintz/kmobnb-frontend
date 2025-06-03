import { userService } from "../../services/user";
// import { socketService } from "../../services/socket.service";
import { store } from "../store";
import { showErrorMsg } from "../../services/event-bus.service";
import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer";
import {
  REMOVE_USER,
  SET_USER,
  SET_USERS,
  SET_WATCHED_USER,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_USER_WISHLIST,
} from "../reducers/user.reducer";

export const userActions = {
  loadUsers,
  removeUser,
  login,
  signup,
  logout,
  loadUser,
  addToWishlist,
  removeFromWishlist,
  setUserWishlist,
};

async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START });
    const users = await userService.getUsers();
    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.log("UserActions: err in loadUsers", err);
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

async function removeUser(userId) {
  try {
    await userService.remove(userId);
    store.dispatch({ type: REMOVE_USER, userId });
  } catch (err) {
    console.log("UserActions: err in removeUser", err);
  }
}

//TODO: uncomment when we know the use of socket service

async function login(credentials) {
  try {
    const user = await userService.login(credentials);
    store.dispatch({ type: SET_USER, user });
    // socketService.login(user._id)
    console.log("logged in successfully as", user);
    return user;
  } catch (err) {
    console.log("Cannot login:", err);
    throw err;
  }
}

async function signup(credentials) {
  try {
    const user = await userService.signup(credentials);
    store.dispatch({
      type: SET_USER,
      user,
    });
    // socketService.login(user._id)
    return user;
  } catch (err) {
    console.log("Cannot signup:", err);
    throw err;
  }
}

async function logout() {
  try {
    await userService.logout();
    store.dispatch({
      type: SET_USER,
      user: null,
    });
    window.location.assign("/");
    // socketService.logout()
  } catch (err) {
    console.log("Cannot logout:", err);
    throw err;
  }
}

async function loadUser(userId) {
  try {
    const user = await userService.getById(userId);
    store.dispatch({ type: SET_WATCHED_USER, user });
  } catch (err) {
    showErrorMsg("Cannot load user");
    console.log("Cannot load user:", err);
  }
}

async function addToWishlist(stayId) {
  try {
    const wishlist = await userService.addToWishlist([stayId]);
    store.dispatch({ type: ADD_TO_WISHLIST, wishlist });
  } catch (err) {
    console.log("Cannot add to wishlist:", err);
    throw err;
  }
}

async function removeFromWishlist(stayId) {
  try {
    await userService.removeFromWishlist([stayId]);
    store.dispatch({ type: REMOVE_FROM_WISHLIST, stayId });
  } catch (err) {
    console.log("Cannot add to wishlist:", err);
    throw err;
  }
}

async function setUserWishlist(wishlist) {
  try {
    store.dispatch({ type: SET_USER_WISHLIST, wishlist });
  } catch (err) {
    console.log("Cannot set wishlist:", err);
    throw err;
  }
}
