import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../constants/index";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

const SideBar = () => {
  const { getLoginUrl, logout, isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = Cookies.get("user_name");

  return (
    <div className="w-[12%] h-screen fixed top-0 left-0 rounded-r-lg bg-gray-800 flex flex-col justify-between">

      {/* Logo */}
      <div>
        <h1 className="text-white text-3xl font-bold text-center py-6 border-b border-gray-600">
          <img src="/icons/logo.png" className="px-4" width={150} height={150} alt="" />
        </h1>
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col gap-3 px-2 text-[20px] text-white py-6 h-full">
        {sidebarLinks.map(({ name, icon, path }) => (
          <NavLink
            to={path}
            key={name}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-5 rounded-lg shadow-sm border-l-2 border-white w-full 
              ${isActive ? "bg-gray-700 font-medium" : ""}`
            }
          >
            <img src={icon} width={25} height={25} />
            <p>{name}</p>
          </NavLink>
        ))}
      </div>

      {/* Bottom Login / User */}
      <div className="bottom-0 px-3 py-3 relative" ref={dropdownRef}>
        {isLoggedIn ? (
          <div
            onClick={() => setOpen(!open)}
            className="text-white flex items-center justify-evenly cursor-pointer select-none"
          >
            {/* Profile Circle */}
            <div className="w-10 h-10 rounded-full border-2 border-blue-300 flex items-center justify-center overflow-hidden">
              {Cookies.get("profile_url") !== undefined ? (
                <img src={Cookies.get("profile_url")} className="rounded-full" />
              ) : (
                <p className="text-[20px] font-bold">
                  {userName?.slice(0, 2).toUpperCase()}
                </p>
              )}
            </div>

            {/* Username */}
            <p className="text-sm truncate w-[100px] font-medium" title={userName}>
              {userName}
            </p>
          </div>
        ) : (
          <div
            className="text-white flex border-t-2 border-white pt-3 rounded-lg items-center gap-3 cursor-pointer"
            onClick={getLoginUrl}
          >
            <img src="/icons/login.svg" width={30} height={30} /><p className="text-lg"> Sign In </p>
          </div>
        )}

        {/* Dropdown */}
        {open && isLoggedIn && (
          <div className="absolute bottom-14 left-7 w-48 bg-white rounded-lg shadow-md border p-3 text-black z-40">
            {/* Name with ellipsis */}
            <p className="font-medium mb-2" title={userName}>
             Hii !, {userName}
            </p>
            <div className="border-t my-3 border-gray-300"></div>
            {/* Logout */}
            <button
              onClick={logout}
              className="w-full  text-left text-red-600 hover:bg-red-100 px-2 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
