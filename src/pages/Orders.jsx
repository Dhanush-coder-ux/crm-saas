import React, { useState, useMemo, useEffect, useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { OrderContext } from "../contexts/OrderContext";
import DetailView from "../components/DetailView";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  // Detail view states
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Loading for skeleton
  const [loading, setLoading] = useState(true);

  const { accountId } = useParams();
  const { getOrders, orders, deleteOrders } = useContext(OrderContext);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await getOrders();
      setLoading(false);
    };
    fetch();
  }, []);

  // Filter orders for account
  const accountOrders = useMemo(() => {
    const orderList = Array.isArray(orders)
      ? orders
      : Object.values(orders || {});

    const clean = orderList.filter((o) => o && typeof o === "object");

    if (!accountId) return clean;

    return clean.filter(
      (order) => String(order.customer_id) === String(accountId)
    );
  }, [accountId, orders]);

  // Search + Sort
  const filteredOrders = useMemo(() => {
    const s = search.toLowerCase();

    let filtered = accountOrders?.filter((order) => {
      return (
        String(order?.id).includes(s) ||
        String(order?.customer_name).includes(s) ||
        String(order?.product_name).includes(s)
      );
    });

    if (sortType === "amount-high") {
      filtered.sort((a, b) => b.final_price - a.final_price);
    } else if (sortType === "amount-low") {
      filtered.sort((a, b) => a.final_price - b.final_price);
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.delivery_info?.requested_date || 0) -
          new Date(a.delivery_info?.requested_date || 0)
      );
    }

    return filtered;
  }, [search, sortType, accountOrders]);

  // Stats
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.final_price, 0);
  const highestOrder =
    filteredOrders.length > 0
      ? Math.max(...filteredOrders.map((o) => o.final_price))
      : 0;

  // Open detail popup
  const handleRowClick = (order) => {
    setAlertData(order);
    setIsAlertOpen(true);
  };

  // Buttons (edit + delete)
  const actionButtons = [
    {
      id: "edit",
      element: (
        <NavLink to={`/update-order/${alertData?.id}`}>
          <button className="bg-blue-950 px-2 py-2 rounded-lg">
            <img src="/icons/edit.svg" width={15} height={15} alt="edit" />
          </button>
        </NavLink>
      ),
    },
    {
      id: "delete",
      element: (
        <button
          onClick={() => {
            deleteOrders(alertData?.id, alertData?.customer_id);
            window.location.reload();
          }}
          className="bg-red-600 px-2 py-2 rounded-lg"
        >
          <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
        </button>
      ),
    },
  ];

  // Only close button
  const alertButtons = [
    {
      id: "close",
      label: "Close",
      onClick: () => setIsAlertOpen(false),
    },
  ];

  // Detail popup contents
  const contents = [
    { label: "Order ID", value: alertData?.id },
    { label: "Customer", value: alertData?.customer_name },
    { label: "Product", value: alertData?.product_name },
    { label: "Quantity", value: alertData?.quantity },
    { label: "Total Price", value: `₹${alertData?.total_price}` },
    { label: "Discount", value: `₹${alertData?.discount_price}` },
    { label: "Final Price", value: `₹${alertData?.final_price}` },
    {
      label: "Requested Date",
      value: alertData?.delivery_info?.requested_date,
    },
    {
      label: "Delivery Date",
      value: alertData?.delivery_info?.delivery_date,
    },
    {
      label: "Shipping",
      value: alertData?.delivery_info?.shipping_method,
    },
    {
      label: "Payment Terms",
      value: alertData?.delivery_info?.payment_terms,
    },
    {
      label: "Freight Terms",
      value: alertData?.delivery_info?.freight_terms,
    },
  ];

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Orders Controls</h1>
        <Link to="/add-order">
          <button className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            + Add New Order
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-950 p-4 rounded-xl text-center text-white">
          <h2 className="text-sm">Total Orders</h2>
          <p className="text-2xl font-semibold">{totalOrders}</p>
        </div>

        <div className="bg-blue-950 p-4 rounded-xl text-center text-white">
          <h2 className="text-sm">Total Revenue</h2>
          <p className="text-2xl font-semibold text-green-400">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-blue-950 p-4 rounded-xl text-center text-white">
          <h2 className="text-sm">Highest Order</h2>
          <p className="text-2xl font-semibold text-blue-300">
            ₹{highestOrder.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by Order ID, Customer ID, Product ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-1/2 ring-2 ring-blue-900 outline-none"
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-4 py-2 rounded-lg ring-2 ring-blue-900"
        >
          <option value="latest">Sort by Latest</option>
          <option value="amount-high">Amount: High → Low</option>
          <option value="amount-low">Amount: Low → High</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Discount</th>
              <th className="px-6 py-3">Final Price</th>
              <th className="px-6 py-3">Requested Date</th>
              <th className="px-6 py-3">Delivery Date</th>
              <th className="px-6 py-3">Shipping</th>
              <th className="px-6 py-3">Payment Terms</th>
              <th className="px-6 py-3">Freight Terms</th>
            </tr>
          </thead>

          <tbody>
            {/* ███ Skeleton Loading ███ */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 12 }).map((__, j) => (
                    <td key={j} className="px-6 py-4 border-b">
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}

            {/* ███ Real Data ███ */}
            {!loading &&
              filteredOrders?.map((order) => (
                <tr
                  key={order?.id}
                  className="hover:bg-gray-100 border-b transition cursor-pointer"
                  onClick={() => handleRowClick(order)}
                >
                  <td className="px-6 py-3">{order?.id}</td>
                  <td className="px-6 py-3">{order?.customer_name}</td>
                  <td className="px-6 py-3">{order?.product_name}</td>
                  <td className="px-6 py-3">{order?.quantity}</td>
                  <td className="px-6 py-3">₹{order?.total_price}</td>
                  <td className="px-6 py-3 text-red-600">
                    ₹{order?.discount_price}
                  </td>
                  <td className="px-6 py-3 text-green-700 font-semibold">
                    ₹{order?.final_price}
                  </td>
                  <td className="px-6 py-3">
                    {order?.delivery_info?.requested_date}
                  </td>
                  <td className="px-6 py-3">
                    {order?.delivery_info?.delivery_date}
                  </td>
                  <td className="px-6 py-3">
                    {order?.delivery_info?.shipping_method}
                  </td>
                  <td className="px-6 py-3">
                    {order?.delivery_info?.payment_terms}
                  </td>
                  <td className="px-6 py-3">
                    {order?.delivery_info?.freight_terms}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Reusable Detail View */}
      <DetailView
        title={"Order Details"}
        topButtons={actionButtons}
        contents={contents}
        alertButtons={alertButtons}
        canOpenAlert={isAlertOpen}
        setAlert={setIsAlertOpen}
      />
    </div>
  );
};

export default Orders;
