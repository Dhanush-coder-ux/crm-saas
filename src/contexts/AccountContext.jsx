import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { createContext,useState } from 'react'

export const AccountContext = createContext();

const AccountContextProvider = (props) => {
    const {NetWorkCalls} = useNetWorkCall();
    const [account,setAccount] = useState([]);
    const [accountId,setAccountId] = useState();


    const addAccount = async (form) =>{
        try {
            const response = await NetWorkCalls({endpoint:'customers', method:'POST', data:form});
            setAccount([...account, response.data]);
        } catch (error) {
            console.error(error);
            
        }
    }
    const getAccount = async () =>{
        try {
            const response = await NetWorkCalls({endpoint:'customers', method:'get'});
            console.log(response.customers);
            setAccount(response.customers)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    const getAccountById = async (accountId) =>{
        try {
            const response = await NetWorkCalls({endpoint:`customers/${accountId}`, method:'get'});
            console.log(response.customers);
            setAccountId(response.customers)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    const editAccountById = async (accountId,data) =>{
        try {
            data['customer_id']= accountId
            const response = await NetWorkCalls({endpoint:`customers`, method:'put'});
            console.log(response.customers);
            setAccountId(response.customers)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    const deleteAccountById = async (accountId) =>{
        try {
            const response = await NetWorkCalls({endpoint:`customers/${accountId}`, method:'delete'});
            console.log(response.customers);
            setAccountId(response.customers)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    
    const value = {
        account,
        accountId,
        addAccount,
        getAccount,
        getAccountById,
        editAccountById,
        deleteAccountById

    }
  return (
    <AccountContext.Provider value={value}>
      {props.children}
    </AccountContext.Provider>
  )
}

export default AccountContextProvider
