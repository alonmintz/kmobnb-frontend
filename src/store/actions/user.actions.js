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
  ADD_TO_WISHLIST_NO_DISPLAY_EFFECT,
  REMOVE_FROM_WISHLIST_NO_DISPLAY_EFFECT,
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
  addToWishlist_noDisplayEffect,
  removeFromWishlist_noDisplayEffect,
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
    console.log("Cannot signup", err);
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
    // socketService.logout()
  } catch (err) {
    console.log("Cannot logout", err);
    throw err;
  }
}

async function loadUser(userId) {
  try {
    const user = await userService.getById(userId);
    store.dispatch({ type: SET_WATCHED_USER, user });
  } catch (err) {
    showErrorMsg("Cannot load user");
    console.log("Cannot load user", err);
  }
}

async function addToWishlist(stayId) {
  try {
    const wishlist = await userService.addToWishlist([stayId]);
    //debug:
    console.log({ wishlist });
    store.dispatch({ type: ADD_TO_WISHLIST, wishlist });
  } catch (err) {
    console.log("Cannot add to wishlist:", err);
    throw err;
  }
}

async function removeFromWishlist(stayId) {
  try {
    await userService.removeFromWishlist([stayId]);
    //debug:
    store.dispatch({ type: REMOVE_FROM_WISHLIST, stayId });
  } catch (err) {
    console.log("Cannot add to wishlist:", err);
    throw err;
  }
}

async function addToWishlist_noDisplayEffect(stayId) {
  try {
    const wishlist = await userService.addToWishlist([stayId]);
    //debug:
    console.log({ wishlist });
    store.dispatch({ type: ADD_TO_WISHLIST_NO_DISPLAY_EFFECT, wishlist });
  } catch (err) {
    console.log("Cannot add to wishlist:", err);
    throw err;
  }
}

async function removeFromWishlist_noDisplayEffect(stayId) {
  console.log("removeFromWishlist_noDisplayEffect");

  try {
    await userService.removeFromWishlist([stayId]);
    //debug:
    store.dispatch({ type: REMOVE_FROM_WISHLIST_NO_DISPLAY_EFFECT, stayId });
  } catch (err) {
    console.log("Cannot add to wishlist:", err);
    throw err;
  }
}
