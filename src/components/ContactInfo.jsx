import React from 'react'
import { contacts } from '../constants'
import { Link } from 'react-router-dom'

const ContactInfo = () => {
  return (
    <div className='flex justify-between items-center mb-6'>
         <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Contacts</h2>
            <p className="text-3xl font-bold" >{contacts.length}</p>
        </div>

       <Link to={'/add-contact'}>
       <button
          className="bg-blue-950 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
          // onClick={() => alert("Add new product clicked!")} 
        >
          + Add New Contact
        </button>
       </Link>
    </div>
  )
}

export default ContactInfo
