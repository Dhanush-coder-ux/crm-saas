import React from 'react'
import AddProductForm from '../components/AddProductForm'
import { products } from '../constants'


const DashBoard = () => {
  return (
      <div className="w-[90%] ml-[12%] p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddProductForm/>
        
        <div className='flex flex-col space-y-4'>
            <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>
            <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Balance Products</h2>
                <p className="text-3xl font-bold" >{products.length}</p>
            </div>
        </div>
      </div>

    </div>
  )
}

export default DashBoard
