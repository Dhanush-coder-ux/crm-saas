import { NavLink } from "react-router-dom"

import{ sidebarLinks }from "../constants/index"

const SideBar = () => {
  return (
    <div className='w-[12%] h-screen fixed top-0 left-0 rounded-r-lg bg-gray-800 flex flex-col justify-between'>
        <div>
            <h1 className='text-white text-3xl font-bold text-center py-6 border-b border-gray-600'>
              <img src="/icons/logo.png" className="px-4" width={150} height={150} alt="" />
            </h1>
        </div>
        <div className='flex flex-col gap-3 px-2 text-[20px] text-white py-6  h-full'>

         {sidebarLinks.map(({name,icon,path})=>(
            <NavLink to={path} key={name} className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-5 rounded-lg shadow-sm  border-l-2 border-white w-full 
             ${
               isActive ? "bg-gray-700 font-medium" : ""
             }`
          }>
            <img src={icon} width={25} height={25}/>
            <p>{name}</p>
           </NavLink>
         ))  
          }
        </div>  
    </div>
  )
}

export default SideBar
