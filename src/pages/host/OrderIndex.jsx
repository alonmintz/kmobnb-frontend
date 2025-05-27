import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { stayActions } from "../../store/actions/stay.actions";
import { orderService } from "../../services/order/order.service.local";
import { capitalize, humanDateFormat, humanDateTimeFormat } from "../../services/util.service";
import { useSearchParams } from "react-router-dom";
import { stayActions } from "../../store/actions/stay.actions";

export function OrderIndex() {
  const user = useSelector(storeState => storeState.userModule.user)
  const [orders, setOrders] = useState([])
  const [searchParams] = useSearchParams()
  const [listingName, setListingName] = useState('')

  useEffect(() => {
    if (!user) return

    const filter = {
      listingId: searchParams.get('listingId')
    }

    if (filter.listingId) {
      stayActions.getStayById(filter.listingId)
        .then(stay => {
          console.log('Listing details:', stay.name)
          setListingName(stay.name)
        })
        .catch(err => console.log('Failed to load listing details:', err))
    }

    orderService.getOrdersByHostId(user._id)
      .then(orders => {
        const filteredOrders = filter.listingId
          ? orders.filter(order => order.stayId === filter.listingId)
          : orders;
        setOrders(filteredOrders);
      }).catch(err => console.log('Failed to load orders:', err))
  }, [user, searchParams])

  function getTiming(orderStartDate, orderEndDate) {
    const now = new Date();
    const startDate = new Date(orderStartDate);
    const endDate = new Date(orderEndDate);

    if (startDate > now) {
      return "Future";
    } else if (endDate < now) {
      return "Past";
    } else {
      return "Active";
    }
  }

  async function onUpdateOrderStatus(orderId, status) {
    await orderService.onUpdateOrderStatus(orderId, status)
  }

  if (!orders || !orders.length || !user) {
    return (
      <div className="orders">
        <div className="section-title">
          <h1>No orders to show</h1>
        </div>
      </div>
    )
  }

  return (
    <section className="order-index">
      <header className="section-title">
        <h1>Your Orders{listingName ? ` - filtering for listing "${listingName}"` : ""}</h1>
      </header>
      <div className="order-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Listing Name</th>
              <th>Timing</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Order Time</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td title={order._id}>{order._id.slice(-6)}</td>
                <td>{order.status ? capitalize(order.status) : ""}</td>
                <td>{order.stayName}</td>
                <td>{getTiming(order.startDate, order.endDate)}</td>
                <td>{humanDateFormat(order.startDate)}</td>
                <td>{humanDateFormat(order.endDate)}</td>
                <td>{humanDateTimeFormat(order.orderTime)}</td>
                <td>{order.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
