const { DEV, LOCAL } = import.meta.env;

import { userService } from "../user";
import { reviewService as local } from "./review.service.local";
import { reviewService as remote } from "./review.service.remote";

export function getEmptyReviewWithLoggedinUser() {
  const loggedinUser = userService.getLoggedinUser();
  const { _id: userId, fullname, imgUrl } = loggedinUser;
  return {
    at: null,
    by: {
      userId,
      fullname,
      imgUrl,
    },
    txt: "",
    starsRate: 0,
    stayId: null,
    categoryRatings: {
      cleanliness: 0,
      accuracy: 0,
      checkIn: 0,
      communications: 0,
      location: 0,
      value: 0,
    },
  };
}

const service = LOCAL === "true" ? local : remote;
export const reviewService = { getEmptyReviewWithLoggedinUser, ...service };

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.reviewService = reviewService;
