import React, { useContext, useState, useEffect } from "react";
import OrderStatus from "../sections/OrderStatus";
import ProductStatus from "../sections/ProductStatus";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { UserContext } from "../contexts/UserContext";

const DashBoard = () => {
  const { user, getUser, updateUserRole, deleteUserById  } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUser(); 
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await updateUserRole(id, newRole);
  };


  return (
    <div className="flex w-[90%] ml-[12%] h-[90vh] bg-gray-50">

    
      <div className="flex-1 space-y-6 overflow-y-auto">
        <OrderStatus />
        <ProductStatus />
      </div>

      <div className="w-[30%] h-full bg-white border-l border-gray-200 p-4 shadow-md rounded-l-2xl flex flex-col">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Team Members</h2>

      
     {selectedUser && (
          <div className="mb-4 p-4 bg-blue-50 rounded-xl text-sm text-gray-700 border">
            <h3 className="font-semibold text-blue-900 mb-2">Selected User</h3>
            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role}</p>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide ">
          {user.map((userItem) => (
            <div
              key={userItem.id}
              onClick={() => setSelectedUser(userItem)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition border-b-2 border-blue-950${
                selectedUser?.id === userItem.id
                  ? "bg-blue-50 border border-blue-300"
                  : "hover:bg-gray-50"
              }`}
            >
               {
               userItem.profile_url ? <img
                src={userItem.profile_url || "https://via.placeholder.com/150"}
                alt={userItem.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              /> : <div className="w-12 h-12  flex items-center justify-center rounded-full border border-gray-300">
                <h1 className="text-2xl font-semibold">{userItem.name.slice(0,2).toUpperCase()}</h1>
              </div>
              }

              <div className="flex-1 w-20 ">
                  <h3 className="font-medium text-sm text-gray-800 truncate">
                    {userItem.name}
                  </h3>

                  <h3 className="text-sm text-gray-800 truncate">
                    {userItem.email}
                  </h3>

                  <p className="text-sm text-gray-500 truncate">
                    {userItem.role}
                  </p>
                </div>


          
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Assign Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["admin" , "super admin", "user"].map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() =>handleRoleChange({ id: userItem.id, newRole: role })}
                      className={`cursor-pointer ${
                        userItem.role === role ? "bg-blue-100 text-blue-700" : ""
                      }`}
                    >
                      {role}
                    </DropdownMenuItem>
                  ))}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUserById(userItem.id);
                      }}
                      className="cursor-pointer text-red-600"
                    >
                      Delete User
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
