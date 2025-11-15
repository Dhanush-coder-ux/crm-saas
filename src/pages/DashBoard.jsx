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
import { AuthContext } from "../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";

const DashBoard = () => {
  const { user, getUser, updateUserRole, deleteUserById } =
    useContext(UserContext);
  const { getLoginUrl, checkIsLoggedIn, setLoggedInTokens } =
    useContext(AuthContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchparams] = useSearchParams();
  const [loading, setLoading] = useState(true); // 🔹 loading for skeleton

  const auth = searchparams.get("auth");
  const access_token = searchparams.get("access_token");
  const refresh_token = searchparams.get("refresh_token");
  const profile_url = searchparams.get("profile_url");
  const user_name = searchparams.get("user_name");

  useEffect(() => {
    const init = async () => {
      console.log(
        "search params :",
        auth,
        access_token,
        refresh_token,
        profile_url,
        user_name
      );

      if ((auth != null || auth != false) && access_token != null && refresh_token != null) {
        setLoggedInTokens({ access_token, refresh_token, profile_url, user_name });
      }

      await getUser();
      setLoading(false); // ⬅ stop skeleton after users loaded
    };

    init();
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

      <div className="w-[30%] h-full bg-white border-2 border-blue-200 p-4 shadow-md rounded-l-2xl flex flex-col">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Team Members
        </h2>

        {selectedUser && (
          <div className="mb-4 p-4 bg-blue-50 rounded-xl text-sm text-gray-700 border">
            <h3 className="font-semibold text-blue-900 mb-2">Selected User</h3>
            <p>
              <b>Name:</b> {selectedUser.name}
            </p>
            <p>
              <b>Email:</b> {selectedUser.email}
            </p>
            <p>
              <b>Role:</b> {selectedUser.role}
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide ">
          {/* 🔹 Skeleton loading for team members */}
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl border-b-2 border-blue-950 animate-pulse"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              </div>
            ))}

          {/* 🔹 Real user list once loaded */}
          {!loading &&
            user.map((userItem) => (
              <div
                key={userItem.id}
                onClick={() => setSelectedUser(userItem)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition border-b-2 border-blue-950${
                  selectedUser?.id === userItem.id
                    ? "bg-blue-50 border border-blue-300"
                    : "hover:bg-gray-50"
                }`}
              >
                {userItem.profile_url ? (
                  <img
                    src={
                      userItem.profile_url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={userItem.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-300">
                    <h1 className="text-2xl font-semibold text-blue-500">
                      {userItem.name.slice(0, 2).toUpperCase()}
                    </h1>
                  </div>
                )}

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
                    {["admin", "super admin", "user"].map((role) => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() =>
                          handleRoleChange({ id: userItem.id, newRole: role })
                        }
                        className={`cursor-pointer ${
                          userItem.role === role
                            ? "bg-blue-100 text-blue-700"
                            : ""
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
                    >
                      <p className="text-red-600">Delete User</p>
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
