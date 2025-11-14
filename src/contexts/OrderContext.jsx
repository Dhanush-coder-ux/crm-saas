import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { createContext, useState } from 'react'

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
  const {NetWorkCalls} = useNetWorkCall()
      const [orders,setOrders] = useState([]);
      const [orderId,setOrderId] = useState();


  const addOrders = async (form)=>{
    try {
      const response = await NetWorkCalls({endpoint:'order', method:'POST', data:form})
      setOrders(...orders,[response.data])
    } catch (error) {
      console.error(error);
      
    }
  }
const getOrders = async () => {
  try {
    const response = await NetWorkCalls({
      endpoint: "order",
      method: "GET",
    });

    const incomingOrders = response?.orders ?? [];

    setOrders(incomingOrders);
  } catch (error) {
    console.error(error);
    setOrders([]); 
  }
};

  const editOrders = async (orderId,data)=>{
    try {
      data['order_id'] =orderId
      const response = await NetWorkCalls({endpoint:'order', method:'POST', data:data})
      setOrders(...orders,[response.data])
    } catch (error) {
      console.error(error);
      
    }
  }
  const deleteOrders = async (orderId,customer_id)=>{
    try {
      const response = await NetWorkCalls({endpoint:`order/${customer_id}/${orderId}`, method:'delete', data:orderId})
      setOrderId(response.data)
    } catch (error) {
      console.error(error);
      
    }
  }
  const value = {
      orders,
    addOrders,
    deleteOrders,
    editOrders,
    getOrders,
  }
  return (
    <OrderContext.Provider value={value}>
      {props.children}
    </OrderContext.Provider>
  )
}

export default OrderContextProvider
