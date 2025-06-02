import { httpService } from "../http.service";

console.log('using remote order service!')

// Order statuses
export const PENDING = 'pending'
export const APPROVED = 'approved'
export const CANCELED = 'canceled'

export const orderService = {
  save,
  getOrdersByUserId,
  getOrdersByHostId
};


async function save(order) {

}

async function getOrdersByUserId(userId) {
  
}

async function getOrdersByHostId(filter) {
  return httpService.get(`order`, filter)
}