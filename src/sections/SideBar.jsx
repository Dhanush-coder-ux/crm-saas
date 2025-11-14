import { NavLink } from "react-router-dom"

import{ sidebarLinks }from "../constants/index"
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Cookies from "js-cookie";

const SideBar = () => {
  const { getLoginUrl, logout, isLoggedIn } = useContext(AuthContext);
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
        <div className="bottom-0 cursor-pointer" onClick={()=>isLoggedIn ? logout() : getLoginUrl()}> 
            <div className="text-2xl text-white px-3 py-3 flex rounded-lg shadow-sm gap-3  border-t-2 border-white w-full ">
                {
                  isLoggedIn ? <div className="w-full h-10 flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full flex flex-row justify-center items-center border-2 border-blue-300">
                      {
                        Cookies.get('profile_url')!=undefined ? <img src={Cookies.get('profile_url')} className="rounded-full"/> : <p className="text-[20px] font-bold">{Cookies.get('user_name')?.slice(0,2).toUpperCase()}</p>
                      }
                    </div>
                    <div>
                        <p className="text-ellipsis overflow-clip">{Cookies.get('user_name')}</p>
                    </div>
                    
                  </div>
                  : <div className="flex justify-evenly items-center"><img src="/icons/login.svg" width={30} height={30} /> Sign In</div>
                }
            </div>
        </div>
    </div>
  )
}

export default SideBar
