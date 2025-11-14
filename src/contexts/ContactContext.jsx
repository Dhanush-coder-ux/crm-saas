import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { createContext, useState} from 'react'

export const CustomerContext = createContext();

const CutomerContextProvider = (props) => {
    const {NetWorkCalls} = useNetWorkCall();
      const [contact,setContact] = useState([]);
      const [contactId,setContactId] = useState([]);
  
  
      const addContact = async (form) =>{
          try {
              const response = await NetWorkCalls({endpoint:'contact', method:'POST', data:form});
              setContact([...contact, response.data]);
          } catch (error) {
              console.error(error);
              
          }
      }
      const getContact = async () =>{
          try {
              const response = await NetWorkCalls({endpoint:'contact', method:'get'});
              setContact(response.contacts);

              
          } catch (error) {
              console.error(error);
              
          }
      }
    //   const getContactByContactId = async (contactcId) =>{
    //       try {
    //           const response = await NetWorkCalls({endpoint:`contact/${contactcId}`, method:'get'});
    //           console.log(response.data);
    //           setContactId(response.data)
              
    //       } catch (error) {
    //           console.error(error);
              
    //       }
    //   }

      const getContactByAccountId = async (accountId) =>{
          try {
              const response = await NetWorkCalls({endpoint:`contact/customer/${accountId}`, method:'get'});
              console.log("response contact :",response.contacts);
              setContactId(response.contacts);
              
          } catch (error) {
              console.error(error);
              
          }
      }
      const editContactById = async (data) => {
              try {
                  const response = await NetWorkCalls({endpoint: `contact`, method: 'put',data: data});
                  if (response.data) {
                      console.log("Update successful, new data:", response.data);
                      setContact([...contact,response.data]);
                  }
                  
              } catch (error) {
                  console.error(error);
              }
          }
      const deleteContactById = async (contactcId,customer_id) =>{
          try {
              const response = await NetWorkCalls({endpoint:`contact/${customer_id}/${contactcId}`, method:'delete'});
              console.log(response.data);
              setContact(response.data)
              
          } catch (error) {
              console.error(error.message);
              
          }
      }


      
      const value = {
        contact,
        addContact,
        editContactById,
        deleteContactById,
        getContact,
        contactId,
        getContactByAccountId
      }
    
  return (
    <CustomerContext.Provider value={value}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CutomerContextProvider
