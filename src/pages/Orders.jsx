import React, { useState, useMemo } from "react";
import { orders } from "../constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 🔍 Filter & sort logic
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter(
      (order) =>
        order.order_id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer_id.toLowerCase().includes(search.toLowerCase()) ||
        order.product_type.toLowerCase().includes(search.toLowerCase())
    );

    if (sortType === "amount-high") {
      filtered.sort((a, b) => b.final_amount - a.final_amount);
    } else if (sortType === "amount-low") {
      filtered.sort((a, b) => a.final_amount - b.final_amount);
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.delivery_info.requested_date) -
          new Date(a.delivery_info.requested_date)
      );
    }
    return filtered;
  }, [search, sortType]);

  // 📊 Calculate stats
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce(
    (sum, o) => sum + o.final_amount,
    0
  );

  const handleRowClick = (order) => {
    setAlertData(order);
    setIsAlertOpen(true);
  };

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Orders Controls</h1>
        <button className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition">
          + Add New Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-950 p-4 rounded-xl shadow text-center">
          <h2 className="text-sm text-white">Total Orders</h2>
          <p className="text-2xl font-semibold text-white">{totalOrders}</p>
        </div>
        <div className="bg-blue-950 p-4 rounded-xl shadow text-center">
          <h2 className="text-sm text-white">Total Revenue</h2>
          <p className="text-2xl font-semibold text-green-400">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-950 p-4 rounded-xl shadow text-center">
          <h2 className="text-sm text-white">Highest Order</h2>
          <p className="text-xl font-semibold text-blue-300">
            ₹
            {Math.max(...filteredOrders.map((o) => o.final_amount)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by order, customer, or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-1/2 ring-2 outline-none ring-blue-900"
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
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Customer ID</th>
              <th className="px-6 py-3">Product Type</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Discount</th>
              <th className="px-6 py-3">Final Amount</th>
              <th className="px-6 py-3">Requested Date</th>
              <th className="px-6 py-3">Delivery Date</th>
              <th className="px-6 py-3">Shipping</th>
              <th className="px-6 py-3">Payment Terms</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.order_id}
                onClick={() => handleRowClick(order)}
                className="hover:bg-gray-100 border-b transition cursor-pointer"
              >
                <td className="px-6 py-3">{order.order_id}</td>
                <td className="px-6 py-3">{order.customer_name}</td>
                <td className="px-6 py-3">{order.customer_id}</td>
                <td className="px-6 py-3">{order.product_type}</td>
                <td className="px-6 py-3">{order.quantity}</td>
                <td className="px-6 py-3">₹{order.total_price}</td>
                <td className="px-6 py-3 text-red-600">
                  ₹{order.discount_price}
                </td>
                <td className="px-6 py-3 text-green-700 font-semibold">
                  ₹{order.final_amount}
                </td>
                <td className="px-6 py-3">
                  {order.delivery_info.requested_date}
                </td>
                <td className="px-6 py-3">
                  {order.delivery_info.delivery_date}
                </td>
                <td className="px-6 py-3">{order.shipping_method}</td>
                <td className="px-6 py-3">{order.payment_terms}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-bold">
                Order Details
              </AlertDialogTitle>
              <AlertDialogDescription>
                {alertData && (
                  <div className="text-sm space-y-1 mt-2">
                    <p className="text-sm text-gray-800 "><strong>Order ID:</strong> {alertData.order_id}</p>
                    <p  className="text-sm text-gray-800 "><strong>Customer Name:</strong> {alertData.customer_name}</p>
                    <p  className="text-sm text-gray-800 "><strong>Customer ID:</strong> {alertData.customer_id}</p>
                    <p  className="text-sm text-gray-800 "><strong>Product Type:</strong> {alertData.product_type}</p>
                    <p  className="text-sm text-gray-800 "><strong>Quantity:</strong> {alertData.quantity}</p>
                    <p className="text-sm text-gray-800 "><strong>Total Price:</strong> ₹{alertData.total_price}</p>
                    <p  className="text-sm text-gray-800 "><strong>Discount:</strong> ₹{alertData.discount_price}</p>
                    <p  className="text-sm text-gray-800 "><strong>Final Amount:</strong> ₹{alertData.final_amount}</p>
                    <p className="text-sm text-gray-800 "><strong>Requested Date:</strong> {alertData.delivery_info.requested_date}</p>
                    <p className="text-sm text-gray-800 "><strong>Delivery Date:</strong> {alertData.delivery_info.delivery_date}</p>
                    <p className="text-sm text-gray-800 "><strong>Shipping Method:</strong> {alertData.shipping_method}</p>
                    <p className="text-sm text-gray-800 "><strong>Payment Terms:</strong> {alertData.payment_terms}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-4">
              
              <AlertDialogAction >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Orders;
