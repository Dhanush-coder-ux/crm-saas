import { orders } from '../constants';
import React from 'react'

const OrderStatus = () => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.final_amount,
    0
  );
  const TotalRevenue =   Math.max(...orders.map((o) => o.final_amount)).toLocaleString()

  const orderDetail = [
    { label: 'Total Orders', value: totalOrders,cl:'text-cyan-500',bdr:'border-cyan-500' },
    { label: 'Total Revenue', value: totalRevenue,cl:'text-green-500',bdr:'border-green-500' },
    { label: 'Highest Order', value: TotalRevenue ,cl:'text-purple-500',bdr:'border-purple-500' },
  ]

  return (
    <div>
         <h1 className='text-3xl font-bold py-4 text-blue-900'>Orders info</h1>
          <div className='w-[80%] py-6  grid md:grid-cols-2 gap-4'>
            
       { orderDetail.map(({label,value,cl,bdr})=>(
        <div key={label} className={`bg-white border-t-4  ${bdr} py-5 px-4 shadow text-center`}>
              <h2 className={`text-xl ${cl}`}>{label}</h2>
              {/* progress bar */}
                <div className="relative w-15 h-15 mx-auto mt-4">
                     <div className="absolute inset-0 rounded-full border-[6px] border-gray-200" />
                      <div
                        className={`absolute inset-0 rounded-full border-[6px] ${bdr} border-t-transparent border-l-transparent`}
                        style={{
                          transform: `rotate(${value}deg)`,
                          transition: "transform 0.4s ease",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-purple-700 font-semibold">
                        {value}
                      </div>
                </div>
              </div>
       ))  } 

         </div>
      
    </div>
  )
}

export default OrderStatus
