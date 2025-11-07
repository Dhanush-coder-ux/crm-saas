import { useContext, useEffect, useState } from "react";
import AccountInfo from "../components/AccountInfo";
import { account } from "../constants";
import { Link, NavLink } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { AccountContext } from "../contexts/AccountContext";

const Accounts = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {account,getAccount,deleteAccountById} = useContext(AccountContext);

  const handleRowClick = (acc) => {
    setAlertData(acc);
    setIsAlertOpen(true);
  };

  useEffect(()=>{
    const fetchAccount= async()=>{
      await getAccount()
    }
    fetchAccount()  
  },[])

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Accounts Controls</h1>

      <AccountInfo />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Mobile Number</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Website</th>
              <th className="px-6 py-3 border-b">Number of Employees</th>
              <th className="px-6 py-3 border-b">GST Number</th>
              <th className="px-6 py-3 border-b">Address</th>
              <th className="px-6 py-3 border-b">Industry</th>
              <th className="px-6 py-3 border-b">Sector</th>
              <th className="px-6 py-3 border-b">Actions</th>
             
            </tr>
          </thead>

          <tbody>
            {account.map((acc) => (
              <tr
                key={acc?.id}
                onClick={() => handleRowClick(acc)}
                className="hover:bg-gray-100 transition duration-150 cursor-pointer"
              >
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.name}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.mobile_number}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.email}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.website}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.number_of_employees}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.gst_number}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.address}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.industry}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc?.sector}</td>
                 <td className="px-6 py-3 border-b border-e-blue-950">
                  <div className="space-x-0.5 py-1 flex">
                     
                    <NavLink to={`/update-account/${acc.id}`}>
                          <button  className="bg-blue-950 cursor-pointer px-2 py-2 rounded-lg">
                          <img src="/icons/edit.svg" width={15 } height={15} alt="edit" />
                        </button>
                    </NavLink>
                    <button onClick={()=>deleteAccountById(acc?.id)}  className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg">
                        <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
                      </button>
                  </div> 
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔔 Alert Dialog for Account Details */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Account Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertData && (
              <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm mt-3">
                    
                    <span className="font-semibold text-gray-500">Name:</span>
                    <span className="text-gray-800">{alertData.name}</span>

                  
                    <span className="font-semibold text-gray-500">Mobile Number:</span>
                    <span className="text-gray-800">{alertData.mobile_number}</span>

                    
                    <span className="font-semibold text-gray-500">Email:</span>
                    <span className="text-gray-800">{alertData.email}</span>

                  
                    <span className="font-semibold text-gray-500">Website:</span>
                    <span className="text-gray-800">{alertData.website}</span>

                    
                    <span className="font-semibold text-gray-500">Employees:</span>
                    <span className="text-gray-800">{alertData.number_of_employees}</span>

                  
                    <span className="font-semibold text-gray-500">GST Number:</span>
                    <span className="text-gray-800">{alertData.gst_number}</span>
                    <span className="font-semibold text-gray-500">Address:</span>
                    <span className="text-gray-800">{alertData.address}</span>

                    
                    <span className="font-semibold text-gray-500">Industry:</span>
                    <span className="text-gray-800">{alertData.industry}</span>

                
                    <span className="font-semibold text-gray-500">Sector:</span>
                    <span className="text-gray-800">{alertData.sector}</span>

                    <span className="font-semibold text-gray-500">Primary Contact:</span>
                    <span className="text-gray-800">{alertData.primary_contact}</span>
                  </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            <AlertDialogAction >
                <Link to={`/contact/${alertData ? alertData.id : ""}`}>
                View Contact
                </Link>
            </AlertDialogAction>
            <AlertDialogAction >
                <Link to={`/orders/${alertData ? alertData.id : ""}`}>
                View orders
                </Link>
            </AlertDialogAction>
            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Accounts;
