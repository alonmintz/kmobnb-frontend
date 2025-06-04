import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { orderService } from "../../services/order";
import { capitalize, humanDateFormat, humanDateTimeFormat } from "../../services/util.service";
import { useNavigate, useSearchParams } from "react-router-dom";

export function OrderIndex() {
  const user = useSelector(storeState => storeState.userModule.user)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [listingName, setListingName] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'startDate', direction: 'desc' })
  const [filters, setFilters] = useState({})
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    loadOrders()
  }, [user])

  async function loadOrders() {
    const filter = {
      listingId: searchParams.get('listingId')
    }

    if (filter.listingId) {
      stayActions.getStayById(filter.listingId)
        .then(stay => {
          setListingName(stay.name)
        })
        .catch(err => console.log('Failed to load listing details:', err))
    }

    await orderService.getOrdersByHostId(filter)
      .then(orders => {
        const filteredOrders = filter.listingId
          ? orders.filter(order => order.stayId === filter.listingId)
          : orders;
        setOrders(filteredOrders);
      })
      .catch(err => console.log('Failed to load orders:', err))
    setIsLoading(false)
  }

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


  function handleSort(key) {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  function getSortedOrders() {
    let sortedOrders = [...orders]
    if (sortConfig.key) {
      sortedOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortedOrders.filter(order => {
      return (!filters.status || order.status === filters.status) &&
        (!filters.timing || getTiming(order.startDate, order.endDate) === filters.timing)
    })
  }

  function getStatusClass(status) {
    switch (status) {
      case 'canceled': return 'status-canceled'
      case 'approved': return 'status-approved'
      case 'pending': return 'status-pending'
      default: return ''
    }
  }

  if (!user) {
    return (
      <div className="orders">
        <div className="section-title">
          <h1>Please log in</h1>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="orders">
        <div className="section-title">
          <h1>Loading . . .</h1>
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
              <th>
                Status<br/>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="canceled">Canceled</option>
                </select>
              </th>
              <th className="clickable" onClick={() => handleSort('stayName')}>
                Listing Name {sortConfig.key === 'stayName' && (sortConfig.direction === 'asc' ? '⬆' : '⬇')}
              </th>
              <th>
                Timing<br/>
                <select
                  value={filters.timing}
                  onChange={(e) => setFilters(prev => ({ ...prev, timing: e.target.value }))}
                >
                  <option value="">All</option>
                  <option value="Future">Future</option>
                  <option value="Active">Active</option>
                  <option value="Past">Past</option>
                </select>
              </th>
              <th className="clickable" onClick={() => handleSort('startDate')}>
                Check-in {sortConfig.key === 'startDate' && (sortConfig.direction === 'asc' ? '⬆' : '⬇')}
              </th>
              <th className="clickable" onClick={() => handleSort('endDate')}>
                Check-out {sortConfig.key === 'endDate' && (sortConfig.direction === 'asc' ? '⬆' : '⬇')}
              </th>
              <th className="clickable" onClick={() => handleSort('orderTime')}>
                Order Time {sortConfig.key === 'orderTime' && (sortConfig.direction === 'asc' ? '⬆' : '⬇')}
              </th>
              <th className="last-column">Guests</th>
            </tr>
          </thead>
          <tbody>
            {getSortedOrders().map(order => (
              <tr key={order._id} className={getStatusClass(order.status)} onClick={() => navigate(`../order/${order._id}`)}>
                <td title={order._id}>{order._id.slice(-6)}</td>
                <td >{order.status ? capitalize(order.status) : "Pending"}</td>
                <td>{order.stayName}</td>
                <td>{getTiming(order.startDate, order.endDate)}</td>
                <td>{humanDateFormat(order.startDate)}</td>
                <td>{humanDateFormat(order.endDate)}</td>
                <td>{humanDateTimeFormat(order.orderTime)}</td>
                <td className="last-column">{order.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!orders.length &&
        <div className="section-title">
          <h1>
            No orders
          </h1>
        </div>
      }
    </section>
  )
}
