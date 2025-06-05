import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { orderService } from "../../services/order";
import { capitalize, humanDateTimeFormat } from "../../services/util.service";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  HOST_NOTIFICATION,
  userActions,
} from "../../store/actions/user.actions";

export function OrderIndex() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [listingName, setListingName] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "startDate",
    direction: "desc",
  });
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    userActions.setUserNotification({
      notificationType: HOST_NOTIFICATION,
      isNotified: false,
    });
    if (!user) return;
    loadOrders();
  }, [user]);

  async function loadOrders() {
    const filter = {
      listingId: searchParams.get("listingId"),
    };

    if (filter.listingId) {
      stayActions
        .getStayById(filter.listingId)
        .then((stay) => {
          setListingName(stay.name);
        })
        .catch((err) => console.log("Failed to load listing details:", err));
    }

    await orderService
      .getOrdersByHostId(filter)
      .then((orders) => {
        const filteredOrders = filter.listingId
          ? orders.filter((order) => order.stayId === filter.listingId)
          : orders;
        setOrders(filteredOrders);
      })
      .catch((err) => console.log("Failed to load orders:", err));
    setIsLoading(false);
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
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  function getSortedOrders() {
    let sortedOrders = [...orders];
    if (sortConfig.key) {
      sortedOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedOrders.filter((order) => {
      return (
        (!filters.status || order.status === filters.status) &&
        (!filters.timing ||
          getTiming(order.startDate, order.endDate) === filters.timing) &&
        (!filters.stayName || order.stayName === filters.stayName)
      );
    });
  }

  function getStatusClass(status) {
    switch (status) {
      case "canceled":
        return "status-canceled";
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  }

  function getDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentYear = new Date().getFullYear();

    const formatDate = (date) => {
      const options = { month: "short", day: "numeric" };
      if (date.getFullYear() !== currentYear) {
        options.year = "numeric";
      }
      return date.toLocaleDateString("en-US", options);
    };

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${formatDate(start)}-${end.getDate()}`;
    } else {
      return `${formatDate(start)}-${formatDate(end)}`;
    }
  }

function getUniqueListingNames() {
  return [...new Set(orders.map(order => order.stayName))]
    .filter(name => name) // filter out empty/null/undefined values
    .sort();
}

  async function handleStatusChange(e, orderId, status) {
    e.preventDefault();
    try {
      await orderService.changeOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      throw new Error("Failed to change order status:", err);
    }
  }

  if (!user) {
    return (
      <div className="orders">
        <div className="section-title">
          <h1>Please log in</h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="orders">
        <div className="section-title">
          <h1>Loading . . .</h1>
        </div>
      </div>
    );
  }

  return (
    <section className="order-index">
      <header className="section-title">
        <h1>
          Orders{listingName ? ` - filtering for listing "${listingName}"` : ""}
        </h1>
      </header>
      <div className="order-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>
                Status
                <br />
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="canceled">Canceled</option>
                </select>
              </th>
              <th className="clickable" onClick={() => handleSort("stayName")}>
                Listing Name{" "}
                {sortConfig.key === "stayName" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
                <br />
                <select
                  value={filters.stayName || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, stayName: e.target.value }))
                  }
                >
                  <option value="">All</option>
                  {getUniqueListingNames().map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </th>
              <th>
                Timing
                <br />
                <select
                  value={filters.timing}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, timing: e.target.value }))
                  }
                >
                  <option value="">All</option>
                  <option value="Future">Future</option>
                  <option value="Active">Active</option>
                  <option value="Past">Past</option>
                </select>
              </th>
              <th className="clickable" onClick={() => handleSort("startDate")}>
                Dates{" "}
                {sortConfig.key === "startDate" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="clickable" onClick={() => handleSort("orderTime")}>
                Order Time{" "}
                {sortConfig.key === "orderTime" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="clickable" onClick={() => handleSort("price")}>
                Price{" "}
                {sortConfig.key === "price" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="last-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {getSortedOrders().map((order) => (
              <tr key={order._id} className={getStatusClass(order.status)}>
                <td title={order._id}>{order._id.slice(-5)}</td>
                <td>{order.status ? capitalize(order.status) : ""}</td>
                <td>{order.stayName}</td>
                <td>{getTiming(order.startDate, order.endDate)}</td>
                <td>{getDateRange(order.startDate, order.endDate)}</td>
                <td>{humanDateTimeFormat(order.orderTime)}</td>
                <td className="text-bold">
                  ${order.price.toLocaleString("en-US")}
                </td>
                <td className="last-column">
                  {order.status === "pending" && (
                    <div className="action-buttons">
                      <button
                        className="btn-action approve"
                        onClick={(e) =>
                          handleStatusChange(e, order._id, "approved")
                        }
                        title="Approve Order"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className="btn-action cancel"
                        onClick={(e) =>
                          handleStatusChange(e, order._id, "canceled")
                        }
                        title="Cancel Order"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!orders.length && (
        <div className="section-title">
          <h1>No orders to show</h1>
        </div>
      )}
    </section>
  );
}
