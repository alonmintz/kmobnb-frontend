import { userService } from "../../services/user";

export const SET_USER = "SET_USER";
export const SET_WATCHED_USER = "SET_WATCHED_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SET_USERS = "SET_USERS";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const ADD_TO_WISHLIST_NO_DISPLAY_EFFECT =
  "ADD_TO_WISHLIST_NO_DISPLAY_EFFECT";
export const REMOVE_FROM_WISHLIST_NO_DISPLAY_EFFECT =
  "REMOVE_FROM_WISHLIST_NO_DISPLAY_EFFECT";

const initialState = {
  user: userService.getLoggedinUser(),
  users: [],
  watchedUser: null,
  wishlistDisplay: userService.getLoggedinUser().wishlist || [],
};

export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case SET_USER:
      newState = { ...state, user: action.user };
      break;
    case SET_WATCHED_USER:
      newState = { ...state, watchedUser: action.user };
      break;
    case REMOVE_USER:
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
      break;
    case SET_USERS:
      newState = { ...state, users: action.users };
      break;
    case ADD_TO_WISHLIST:
      newState = {
        ...state,
        user: {
          ...state.user,
          wishlist: action.wishlist,
        },
        wishlistDisplay: action.wishlist,
      };
      break;
    case REMOVE_FROM_WISHLIST:
      newState = {
        ...state,
        user: {
          ...state.user,
          wishlist: state.user.wishlist.filter(
            (stay) => stay.stayId !== action.stayId
          ),
        },
        wishlistDisplay: state.user.wishlist.filter(
          (stay) => stay.stayId !== action.stayId
        ),
      };
      break;
    case ADD_TO_WISHLIST_NO_DISPLAY_EFFECT:
      newState = {
        ...state,
        user: {
          ...state.user,
          wishlist: action.wishlist,
        },
      };
      break;
    case REMOVE_FROM_WISHLIST_NO_DISPLAY_EFFECT:
      newState = {
        ...state,
        user: {
          ...state.user,
          wishlist: state.user.wishlist.filter(
            (stay) => stay.stayId !== action.stayId
          ),
        },
      };
      break;
    default:
  }
  // For debug:
  // window.userState = newState
  // console.log('State:', newState)
  return newState;
}
