import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { stayActions } from "../../store/actions/stay.actions";
import { orderService } from "../../services/order/order.service.local";
import { humanDateFormat, humanDateTimeFormat } from "../../services/util.service";
import { useSearchParams } from "react-router-dom";

export function OrderIndex() {
  const user = useSelector(storeState => storeState.userModule.user)
  const [orders, setOrders] = useState([])
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!user) return

    const filter = {
      listingId: searchParams.get('listingId')
    }

    orderService.getOrdersByHostId(user._id)
      .then(orders => {
        const filteredOrders = filter.listingId
          ? orders.filter(order => order.stayId === filter.listingId)
          : orders;

        const ordersWithStatus = filteredOrders.map(order => {
          const now = new Date();
          const startDate = new Date(order.startDate);
          const endDate = new Date(order.endDate);

          let status;
          if (startDate > now) {
            status = "future";
          } else if (endDate < now) {
            status = "past";
          } else {
            status = "active";
          }

          return { ...order, status };
        });
        setOrders(ordersWithStatus);
      }).catch(err => console.log('Failed to load orders:', err))
  }, [user, searchParams])

  return (
    <section className="order-index">
      <header className="section-title">
        <h1>Your Orders</h1>
      </header>
      <div className="order-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Listing Name</th>
              <th>Status</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Order Time</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.stayName}</td>
                <td>{order.status}</td>
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
