import { storageService } from "../async-storage.service";

const STORAGE_KEY = "STAY_ORDER_DB";

export const orderService = {
  save,
  getOrdersByUserId,
};

async function save(order) {
  const orderToSave = { ...order };
  try {
    return await storageService.post(STORAGE_KEY, orderToSave);
  } catch (err) {
    throw new Error(err);
  }
}

async function getOrdersByUserId(userId) {
  try {
    let orders = await storageService.query(STORAGE_KEY);
    return orders.filter((order) => order.userId === userId);
  } catch (err) {
    throw new Error(err);
  }
}
