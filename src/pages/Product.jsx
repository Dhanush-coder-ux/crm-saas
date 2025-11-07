import { useContext, useEffect, useState } from "react";
// import { products } from "../constants";

import ProductAdd from "../components/ProductAdd";
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
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

const Product = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {products,getProducts,deleteProduct,editProduct } = useContext(ProductContext)

  const handleRowClick = (product) => {
    setAlertData(product);
    setIsAlertOpen(true);
  };

  useEffect(()=>{
    getProducts();
  },[])

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
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleRowClick(product)}
                className="hover:bg-gray-100 transition duration-150 cursor-pointer"
              >
                <td className="px-6 py-3 border-b border-e-blue-950">{product.name}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">₹{product.price}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{product.quantity}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{product.product_type}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{product.description}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">
                  <div className="space-x-2 py-1 flex">
                    <Link to={`/update-product/${product.id}`}>
                    `<button className="bg-blue-950 cursor-pointer px-2 py-2 rounded-lg">
                      <img src="/icons/edit.svg" width={15} height={15} alt="edit" />
                    </button>`
                    </Link>
                    
                    <button onClick={()=>deleteProduct(product.id)} className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg">
                      <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Alert Dialog */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-bold">
                Product Details
              </AlertDialogTitle>
              <AlertDialogDescription>
                {alertData && (
                  <div className="text-sm space-y-2 mt-3">
                    <p><strong>Name:</strong> {alertData.name}</p>
                    <p><strong>Price:</strong> ₹{alertData.price}</p>
                    <p><strong>Quantity:</strong> {alertData.quantity}</p>
                    <p><strong>Product Type:</strong> {alertData.product_type}</p>
                    <p><strong>Description:</strong> {alertData.description}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-4">
              <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Product;
