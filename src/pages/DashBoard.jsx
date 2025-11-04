import React, { useState } from "react";
import OrderStatus from "../sections/OrderStatus";
import ProductStatus from "../sections/ProductStatus";
import { UserCircle2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const initialUsers = [
  { id: 1, name: "Dhanush", role: "Admin",  },
  { id: 2, name: "Zoya", role: "Manager" },
  { id: 3, name: "Ravi", role: "Customer",  },
  { id: 4, name: "Priya", role: "Admin",  },
  { id: 5, name: "Shiva", role: "Seller", },
  { id: 5, name: "Shiva", role: "Seller", },
  { id: 5, name: "Shiva", role: "Seller", },
  { id: 5, name: "Shiva", role: "Seller", },
  { id: 5, name: "Shiva", role: "Seller", },
  { id: 5, name: "Shiva", role: "Seller", },
];

const DashBoard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔄 Handle role change
  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="flex w-[90%] ml-[12%] min-h-screen bg-gray-50">
      {/* LEFT SIDE */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <OrderStatus />
        <ProductStatus />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[30%] bg-white border-l border-gray-200 p-4 shadow-md rounded-l-2xl">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Team Members
        </h2>

        {/* user lsist */}
        <div className="space-y-3 overflow-y-auto max-h-screen scrollbar-hide">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                selectedUser?.id === user.id
                  ? "bg-blue-50 border border-blue-300"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
              <img
                src={user.image || "https://via.placeholder.com/150"} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />

              
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>

              {/* ⋯ Dropdown  */}
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
                  {["Admin", "Manager", "Seller", "Customer"].map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => handleRoleChange(user.id, role)}
                      className={`cursor-pointer ${
                        user.role === role ? "bg-blue-100 text-blue-700" : ""
                      }`}
                    >
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        {/* Selected Users */}
        {selectedUser && (
          <div className="mt-5 p-4 bg-blue-50 rounded-xl text-sm text-gray-700">
            <h3 className="font-semibold text-blue-900 mb-2">
              Selected User
            </h3>
            <p>
              <span className="font-medium">Name:</span> {selectedUser.name}
            </p>
            <p>
              <span className="font-medium">Role:</span> {selectedUser.role}
            </p>
            <p>
              <span className="font-medium">Status:</span> {selectedUser.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
