import React, { useState } from "react";
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

const initialUsers = [
  { id: 1, name: "Dhanush", role: "Admin" },
  { id: 2, name: "Zoya", role: "Super Admin" },
  { id: 3, name: "Ravi", role: "User" },
  { id: 4, name: "Priya", role: "Admin" },
  { id: 5, name: "Shiva", role: "User" },
  { id: 6, name: "Arun", role: "Seller" },
  { id: 7, name: "Meena", role: "Customer" },
  { id: 8, name: "Vikram", role: "Manager" },
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

    // Update selected user’s role if it’s the one being edited
    if (selectedUser?.id === id) {
      setSelectedUser({ ...selectedUser, role: newRole });
    }
  };

  return (
    <div className="flex w-[90%] ml-[12%] h-[90vh] bg-gray-50">
      {/* LEFT SIDE */}
      <div className="flex-1  space-y-6 overflow-y-auto">
        <OrderStatus />
        <ProductStatus />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[30%] h-full bg-white border-l border-gray-200 p-4 shadow-md rounded-l-2xl flex flex-col">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Team Members
        </h2>

        {/* Selected User Card */}
        {selectedUser && (
          <div className="mb-4 p-4 bg-blue-50 rounded-xl text-sm text-gray-700 border border-blue-100">
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
              <span className="font-medium">Status:</span> Active
            </p>
          </div>
        )}

        {/* User List */}
        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
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
              <img
                src={user.image || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>

              {/* ⋯ Dropdown */}
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
                  {["Admin", "Super Admin","User"].map(
                    (role) => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => handleRoleChange(user.id, role)}
                        className={`cursor-pointer ${
                          user.role === role
                            ? "bg-blue-100 text-blue-700"
                            : ""
                        }`}
                      >
                        {role}
                      </DropdownMenuItem>
                    )
                  )}
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
