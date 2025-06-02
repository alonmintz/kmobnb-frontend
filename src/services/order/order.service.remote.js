import { httpService } from "../http.service";

// Order statuses
export const PENDING = 'pending'
export const APPROVED = 'approved'
export const CANCELED = 'canceled'

export const orderService = {
  save,
  getOrdersByUserId,
  getOrdersByHostId,
  getOrderById,
  changeOrderStatus
};


async function save(order) {
  return httpService.post(`order`, {order})
}

async function getOrdersByUserId(userId) {

}

async function getOrdersByHostId(filter) {
  return httpService.get(`order`, filter)
}

async function getOrderById(orderId) {
  return httpService.get(`order/${orderId}`)
}

async function changeOrderStatus(orderId, status) {
  return httpService.put(`order/${orderId}`, { status })
}