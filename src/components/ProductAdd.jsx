import { Link } from "react-router-dom"
import { products } from "../constants"

const ProductAdd = () => {
  return (
    <div className="flex items-center justify-between mb-6">
        <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Balance Products</h2>
            <p className="text-3xl font-bold" >{products.length}</p>
        </div>
        <Link to={'/add-product'}>
             <button
          className="bg-blue-950 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
          // onClick={() => alert("Add new product clicked!")} 
        >
          + Add New Product
        </button>
        </Link>
       
      </div>
  )
}

export default ProductAdd
