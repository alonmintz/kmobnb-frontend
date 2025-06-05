const { LOCAL } = import.meta.env;

import { orderService as local } from "./order.service.local";
import { orderService as remote } from "./order.service.remote";

function getEmptyUserOrders() {
  return {
    active: [],
    future: [],
    past: [],
  };
}

const service = LOCAL === "true" ? local : remote;
export const orderService = { getEmptyUserOrders, ...service };
