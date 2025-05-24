import { storageService } from "../async-storage.service";
import { stayService } from "../stay";

const STORAGE_KEY = "STAY_ORDER_DB";

export const orderService = {
  save,
  getOrdersByUserId,
  getOrdersByStayId,
  getOrdersByHostId
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
    const orders = await storageService.query(STORAGE_KEY);
    return orders.filter((order) => order.userId === userId);
  } catch (err) {
    throw new Error(err);
  }
}

async function getOrdersByStayId(stayId) {
  try {
    const orders = await storageService.query(STORAGE_KEY);
    return orders.filter((order) => order.stayId === stayId);
  } catch (err) {
    throw new Error(err);
  }
}

async function getOrdersByHostId(hostId) {
  try {
    const listings = await stayService.query({ filterBy: { hostId } })
    const listingIds = listings.map(listing => listing._id)
    const orders = await storageService.query(STORAGE_KEY);

    const hostOrders = []
    listingIds.forEach(listingId => {
      const listingOrders = orders.filter(order => order.stayId === listingId)
      hostOrders.push(...listingOrders)
    })
    return hostOrders
    
  } catch (err) {
    throw new Error(err);
  }
}