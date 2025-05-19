const { DEV, VITE_LOCAL } = import.meta.env;
import { orderService as local } from "./order,service.local";
import { orderService as remote } from "./order.service.remote";

const service = VITE_LOCAL === "true" ? local : remote;
export const orderService = { ...service };
