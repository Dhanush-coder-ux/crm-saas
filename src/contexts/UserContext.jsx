import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState([]); 
  const [userId, setUserId] = useState(null);

  const { NetWorkCalls } = useNetWorkCall();

  const getUser = async () => {
    try {
      const response = await NetWorkCalls({ endpoint: 'user', method: 'get' });
      setUser(response.users);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await NetWorkCalls({ endpoint: `user/${id}`, method: 'get' });
      setUserId(response.user);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      await NetWorkCalls({ endpoint: `user/${id}`, method: 'delete' });
      setUser(prev => prev.filter(u => u.id !== id)); 
    } catch (error) {
      console.error(error);
    }
  };

  const getUserByRole = async (role) => {
    try {
      const response = await NetWorkCalls({ endpoint: `user/role/${role}`, method: 'get' });
      setUser(response.users);
    } catch (error) {
      console.error(error);
    }
  };

const updateUserRole = async ({ id, newRole }) => {
  try {
    const response = await NetWorkCalls({
      endpoint: "user/role",
      method: "patch",
      data: {
        user_id: id,
        role: newRole,
      }

    });

    setUser([...userId,response.users]);

    console.log("Role updated successfully for", id);
  } catch (error) {
    console.error("Failed to update role:", error);
  }
};


  const value = {
    getUser,
    getUserById,
    deleteUserById,
    getUserByRole,
    updateUserRole,
    user,
    userId,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
