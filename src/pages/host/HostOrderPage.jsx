import { useParams } from "react-router"
import { orderService } from "../../services/order/order.service.local"
import { APPROVED, CANCELED } from "../../services/order/order.service.local"
import { useEffect, useState } from "react"
import { capitalize } from "../../services/util.service"

export function HostOrderPage() {
  const params = useParams()
  const [order, setOrder] = useState({})
  const orderId = params.orderId

  useEffect(() => {
    // const orderdemo = orderService.getOrderById(orderId)
    loadOrder()
  }, [])

  async function loadOrder() {
    const orderData = await orderService.getOrderById(orderId)
    setOrder(orderData)
  }

  async function onChangeStatusClick(ev, status) {
    ev.preventDefault()
    try {
      await orderService.changeOrderStatus(orderId, status)
      setOrder({ ...order, status })
    } catch (err) {
      throw new Error('Failed to change order status:', err)
    }
  }

  if (!order) {
    return (
      <div className="host-order-page">
        <div className="section-title">
          <h1>Loading order. . .</h1>
        </div>
      </div>
    )
  }

  return (
    <section className="host-order-page">
      <header className="section-title">
        <h1>{params.orderId ? `Order ID: ${params.orderId}` : "No order!"}</h1>
      </header>
      <div className="host-order-contents">
        <h1>Order status: {order.status ? capitalize(order.status) : "Pending"}</h1>
        <button onClick={(ev) => onChangeStatusClick(ev, APPROVED)}>
          Approve order
        </button>
        <button onClick={(ev) => onChangeStatusClick(ev, CANCELED)}>
          Cancel order
        </button>
      </div>
    </section>
  )
}