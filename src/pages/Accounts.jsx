import AccountInfo from "../components/AccountInfo"
import { account } from "../constants"
import{ Link }from "react-router-dom"
const Accounts = () => {
  return (
    <div className='w-[90%] ml-[12%] p-6  min-h-screen'>
      <h1 className='text-2xl font-semibold mb-6 text-blue-900'>Accounts Page</h1>
      <AccountInfo/>
      <div className='overflow-x-auto  bg-white shadow-md rounded-lg'>
        <table className='min-w-full text-left border border-gray-200'>
        <thead className='bg-blue-950 text-white'>
            <tr>
              <th className="px-6 py-3 border-b" >Name</th>
              <th className="px-6 py-3 border-b">Mobile Number</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Website</th>
              <th className="px-6 py-3 border-b">Number of employes</th>
              <th className="px-6 py-3 border-b">Gst number</th>
              <th className="px-6 py-3 border-b">Addres</th>
              <th className="px-6 py-3 border-b">Industry</th>
              <th className="px-6 py-3 border-b">Sector</th>
              <th className="px-6 py-3 border-b">Contact Person</th>
            </tr>
        </thead>

        <tbody>
          {
            account.map((acc)=>(
              <tr key={acc.id} className="hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.name}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.mobile_number}</td>
                <td  className="px-6 py-3 border-b border-e-blue-950">{acc.email}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.website}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.number_of_employees}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.gst_number}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.address}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.industry}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{acc.sector}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">
                  <Link to={'/contact'} >{acc.primary_contact}</Link>
                  </td>
              </tr>
            ))
          }
        </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Accounts
