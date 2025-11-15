import { useContext, useEffect, useState } from "react";
import ProductAdd from "../components/ProductAdd";
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import DetailView from "../components/DetailView";

const Product = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅ added for skeleton

  const { products, getProducts, deleteProduct } = useContext(ProductContext);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await getProducts();
      setLoading(false);
    };
    fetch();
  }, []);

  const handleRowClick = (product) => {
    setAlertData(product);
    setIsAlertOpen(true);
  };

  const contents = [
    { label: "Name", value: alertData?.name },
    { label: "Price", value: `₹${alertData?.price}` },
    { label: "Quantity", value: alertData?.quantity },
    { label: "Product Type", value: alertData?.product_type },
    { label: "Description", value: alertData?.description },
  ];

  const actionButtons = [
    {
      id: "edit",
      element: (
        <Link to={`/update-product/${alertData?.id}`}>
          <button className="bg-blue-950 cursor-pointer px-2 py-2 rounded-lg">
            <img src="/icons/edit.svg" width={15} height={15} alt="edit" />
          </button>
        </Link>
      ),
    },
    {
      id: "delete",
      element: (
        <button
          onClick={() => {
            deleteProduct(alertData?.id);
            window.location.reload();
          }}
          className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg"
        >
          <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
        </button>
      ),
    },
  ];

  const alertButtons = [
    {
      id: "close",
      label: "Close",
      onClick: () => setIsAlertOpen(false),
    },
  ];

  return (
    <div className="w-[88%] ml-[12%] p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Product Controls</h1>

      <ProductAdd />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Price</th>
              <th className="px-6 py-3 border-b">Quantity</th>
              <th className="px-6 py-3 border-b">Product Type</th>
              <th className="px-6 py-3 border-b">Description</th>
            </tr>
          </thead>

          <tbody>
            {/* ███ Skeleton Loading ███ */}
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 border-b">
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <div className="h-4 w-28 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-4 border-b">
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ))}

            {/* Real Data */}
            {!loading &&
              products.map((product) => (
                <tr
                  key={product?.id}
                  onClick={() => handleRowClick(product)}
                  className="hover:bg-gray-100 transition duration-150 cursor-pointer"
                >
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {product?.name}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    ₹{product?.price}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {product?.quantity}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {product?.product_type}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {product?.description}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <DetailView
        title={"Product Details"}
        topButtons={actionButtons}
        contents={contents}
        alertButtons={alertButtons}
        canOpenAlert={isAlertOpen}
        setAlert={setIsAlertOpen}
      />
    </div>
  );
};

export default Product;
