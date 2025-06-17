import { storageService } from "../async-storage.service";

const LOGGEDIN_USER_STORAGE_KEY = "loggedinUser_local";
const USERS_STORAGE_KEY = "STAY_USERS";

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  saveLoggedinUser,
};

async function getUsers() {
  const users = await storageService.query(USERS_STORAGE_KEY);
  return users.map((user) => {
    delete user.password;
    return user;
  });
}

async function getById(userId) {
  return await storageService.get(USERS_STORAGE_KEY, userId);
}

function remove(userId) {
  return storageService.remove(USERS_STORAGE_KEY, userId);
}

async function update({ _id, score }) {
  const user = await storageService.get(USERS_STORAGE_KEY, _id);
  user.score = score;
  await storageService.put(USERS_STORAGE_KEY, user);

  // When admin updates other user's details, do not update loggedinUser
  const loggedinUser = getLoggedinUser();
  if (loggedinUser._id === user._id) saveLoggedinUser(user);

  return user;
}

async function login(userCred) {
  const users = await storageService.query(USERS_STORAGE_KEY);
  const user = users.find((user) => user.username === userCred.username);

  if (user) return saveLoggedinUser(user);
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  userCred.score = 10000;

  const user = await storageService.post(USERS_STORAGE_KEY, userCred);
  return saveLoggedinUser(user);
}

async function logout() {
  localStorage.removeItem(LOGGEDIN_USER_STORAGE_KEY);
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem(LOGGEDIN_USER_STORAGE_KEY));
}

function saveLoggedinUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    imgUrl: user.imgUrl,
    score: user.score,
    isAdmin: user.isAdmin,
    isHost: user.isHost,
  };
  localStorage.setItem(LOGGEDIN_USER_STORAGE_KEY, JSON.stringify(user));
  return user;
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
  const user = {
    username: "admin",
    password: "admin",
    fullname: "Mustafa Adminsky",
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    score: 10000,
  };

  const newUser = await storageService.post(USERS_STORAGE_KEY, userCred);
}

_populateDemoUserData();
async function _populateDemoUserData() {
  const existingUsers = await storageService.query(USERS_STORAGE_KEY);
  if (!existingUsers.length) {
    const demoUsers = [
      {
        _id: "622f3403e36c59e6164faf93",
        username: "patty",
        fullname: "Patty And Beckett",
        imgUrl:
          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        isAdmin: false,
        isHost: true,
      },
      {
        _id: "622f3407e36c59e6164fbf76",
        username: "dan",
        fullname: "Dan",
        imgUrl: "https://robohash.org/6460525?set=set1",
        isAdmin: false,
        isHost: false,
      },
    ];
    await storageService.postWithoutMakeId(USERS_STORAGE_KEY, demoUsers);
  }
}
