import ContactInfo from "../components/ContactInfo"
import { contacts } from "../constants"

const Contact = () => {
  return (
    
    <div className='w-[90%] ml-[12%] p-6  min-h-screen'>
       <h1 className="text-3xl font-bold text-blue-900 mb-8">Contacts Controls</h1>
       <ContactInfo/>
       <div className='overflow-x-auto  bg-white shadow-md rounded-lg'>
         <table className='min-w-full text-left border border-gray-200'>
              <thead className='bg-blue-950 text-white'>
                <tr>
                <th className="px-6 py-3 border-b" >Name</th>
                <th className="px-6 py-3 border-b">Mobile Number</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Fax</th>
                </tr>
              </thead>
                   <tbody>
          {
            contacts.map((contact)=>(
              <tr key={contact.id} className="hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.name}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.mobile_number}</td>
                <td  className="px-6 py-3 border-b border-e-blue-950">{contact.email}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.fax}</td>
              </tr>
            ))
          }
        </tbody>
         </table>
       </div>
    
    </div>
  )
}

export default Contact
