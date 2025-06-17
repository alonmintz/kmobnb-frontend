import { httpService } from "../http.service";
import { uploadService } from "../upload.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";
//TODO: change to actual cloudinary url
export const DEFAULT_USE_IMAGE_URL = "https://robohash.org/CUX.png?set=set2";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLoggedinUser,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
};

async function login(userCred) {
  const user = await httpService.post("auth/login", userCred);
  if (user) return saveLoggedinUser(user);
}

async function signup(userInput) {
  const imgUrlToSave = await _uploadNewImage(userInput.imgUrl);
  const userInputToSave = { ...userInput, imgUrl: imgUrlToSave };

  const user = await httpService.post("auth/signup", userInputToSave);
  return saveLoggedinUser(user);
}

async function logout() {
  localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  return await httpService.post("auth/logout");
}

async function getUserWishlist() {
  const result = await httpService.get("user/wishlist");

  return result;
}

async function addToWishlist(stayIds) {
  const result = await httpService.post("user/wishlist", { stayIds });
  return result;
}

async function removeFromWishlist(stayIds) {
  return await httpService.delete("user/wishlist", { stayIds });
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

function saveLoggedinUser(user) {
  // user = {
  //   _id: user._id,
  //   fullname: user.fullname,
  //   imgUrl: user.imgUrl,
  //   isHost: user.isHost,
  //   isAdmin: user.isAdmin,
  // };
  localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

//private functions:

async function _uploadNewImage(imgObj) {
  if (imgObj && imgObj.file) {
    const { secure_url } = await uploadService.uploadImg(imgObj.file);
    return secure_url;
  } else {
    return DEFAULT_USE_IMAGE_URL;
  }
}
