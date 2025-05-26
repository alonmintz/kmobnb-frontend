import { storageService } from "../async-storage.service";
import { stayService } from "../stay";

const STORAGE_KEY = "STAY_ORDER_DB";

// Order statuses
const PENDING = 'pending'
const APPROVED = 'approved'
const CANCELED = 'canceled'

export const orderService = {
  save,
  getOrdersByUserId,
  getOrdersByStayId,
  getOrdersByHostId,
  getOrderById,
  changeOrderStatus,

  PENDING: PENDING,
  APPROVED: APPROVED,
  CANCELED: CANCELED
};

window.orders = orderService

async function save(order) {
  const orderToSave = {
    ...order,
    orderTime: new Date().toISOString(),
    status: PENDING
  }
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

async function getOrderById(orderId) {
  try {
    const orders = await storageService.query(STORAGE_KEY)
    const order = orders.find(order => order._id === orderId)
    return order
  } catch (err) {
    throw new Error(err)
  }
}

async function changeOrderStatus(orderId, status) {
  try {
    const order = await getOrderById(orderId)
    console.log('order from getOrderById:', order)
    const orderToSave = {
      ...order,
      status
    }
    console.log('orderToSave:', orderToSave)
    return await storageService.put(STORAGE_KEY, orderToSave);
  } catch (err) {
    throw new Error(err);
  }
}
