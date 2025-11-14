import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Link, NavLink, useParams } from "react-router-dom";
import { OrderContext } from "../contexts/OrderContext";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { accountId } = useParams();
  const { getOrders, orders, deleteOrders } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, []);


    
  const accountOrders = useMemo(() => {
    if (!accountId) return orders;
    return orders.filter(
      (order) => String(order.customer_id) === String(accountId)
    );
  }, [accountId, orders]);


const filteredOrders = useMemo(() => {
  const list = accountOrders ?? [];

  let filtered = list.filter((order) => {
    const s = search.toLowerCase();

    return (
      String(order.id).includes(s) ||
      String(order.customer_id).includes(s) ||
      String(order.product_id).includes(s)
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

console.log("orders",filteredOrders);


 
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce(
    (sum, o) => sum + o.final_price,
    0
  );
  const highestOrder =
    filteredOrders.length > 0
      ? Math.max(...filteredOrders.map((o) => o.final_price))
      : 0;

 
  const handleRowClick = (order) => {
    setAlertData(order);
    setIsAlertOpen(true);
  };

  // useEffect(() => {
  //   if (accountId) {
  //     getOrders(accountId);
  //   }
  // }, [accountId]);



  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen bg-gray-50">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Orders Controls</h1>
        <Link to="/add-order">
          <button className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            + Add New Order
          </button>
        </Link>
      </div>

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

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer ID</th>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Discount</th>
              <th className="px-6 py-3">Final Price</th>
              <th className="px-6 py-3">Requested Date</th>
              <th className="px-6 py-3">Delivery Date</th>
              <th className="px-6 py-3">Shipping</th>
              <th className="px-6 py-3">Payment Terms</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-100 border-b transition cursor-pointer"
                onClick={() => handleRowClick(order)}
              >
                <td className="px-6 py-3">{order.id}</td>
                <td className="px-6 py-3">{order.customer_id}</td>
                <td className="px-6 py-3">{order.product_id}</td>
                <td className="px-6 py-3">{order.quantity}</td>
                <td className="px-6 py-3">₹{order.total_price}</td>
                <td className="px-6 py-3 text-red-600">
                  ₹{order.discount_price}
                </td>
                <td className="px-6 py-3 text-green-700 font-semibold">
                  ₹{order.final_price}
                </td>
                <td className="px-6 py-3">
                  {order.delivery_info?.requested_date}
                </td>
                <td className="px-6 py-3">
                  {order.delivery_info?.delivery_date}
                </td>
                <td className="px-6 py-3">
                  {order.delivery_info?.shipping_method}
                </td>
                <td className="px-6 py-3">
                  {order.delivery_info?.payment_terms}
                </td>

                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <NavLink to={`/update-order/${order.id}`}>
                      <button className="bg-blue-950 px-2 py-2 rounded-lg">
                        <img
                          src="/icons/edit.svg"
                          width={15}
                          height={15}
                          alt="edit"
                        />
                      </button>
                    </NavLink>

                    <button
                      onClick={() =>deleteOrders(order.id,order.customer_id)
                      }
                      className="bg-red-600 px-2 py-2 rounded-lg"
                    >
                      <img
                        src="/icons/delete.svg"
                        width={15}
                        height={15}
                        alt="delete"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Order Details</AlertDialogTitle>
              <AlertDialogDescription>
                {alertData && (
                  <div className="text-sm space-y-1 mt-2">
                    <p><strong>Order ID:</strong> {alertData.id}</p>
                    <p><strong>Customer ID:</strong> {alertData.customer_id}</p>
                    <p><strong>Product ID:</strong> {alertData.product_id}</p>
                    <p><strong>Quantity:</strong> {alertData.quantity}</p>
                    <p><strong>Total Price:</strong> ₹{alertData.total_price}</p>
                    <p><strong>Discount:</strong> ₹{alertData.discount_price}</p>
                    <p><strong>Final Price:</strong> ₹{alertData.final_price}</p>
                    <p>
                      <strong>Requested Date:</strong>{" "}
                      {alertData.delivery_info?.requested_date}
                    </p>
                    <p>
                      <strong>Delivery Date:</strong>{" "}
                      {alertData.delivery_info?.delivery_date}
                    </p>
                    <p>
                      <strong>Shipping Method:</strong>{" "}
                      {alertData.delivery_info?.shipping_method}
                    </p>
                    <p>
                      <strong>Payment Terms:</strong>{" "}
                      {alertData.delivery_info?.payment_terms}
                    </p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Orders;
