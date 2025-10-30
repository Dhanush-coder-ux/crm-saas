import { products } from "../constants";
import ProductAdd from "./ProductAdd";
const ProductList = () => {

  return (
    <div className="w-[88%] ml-[12%] p-6  min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-blue-900">Product List</h1>

      <ProductAdd/>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Price</th>
              <th className="px-6 py-3 border-b">Quantity</th>
              <th className="px-6 py-3 border-b">Product Type</th>
              <th className="px-6 py-3 border-b">Description</th>
              <th className="px-6 py-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-100 transition duration-150"
              >
                <td className="px-6 py-3 border-b border-e-blue-950">{product.name}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">₹{product.price}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{product.quantity}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{product.product_type}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{product.description}</td>
                <div className="space-x-2 py-4">
                <button className="bg-blue-950 cursor-pointer px-2 py-2 rounded-lg">
                  <img src="/icons/edit.svg" width={15} height={15} alt="" />
                </button>
                <button className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg">
                  <img src="/icons/delete.svg" width={15} height={15} alt="" />
                </button>
                </div>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
