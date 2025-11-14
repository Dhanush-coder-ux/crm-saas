import React from 'react'
import { contacts } from '../constants'
import { Link, useParams } from 'react-router-dom'

const ContactInfo = ({accountId}) => {
  // const { accountId } = useParams();

  return (
    <div className='flex justify-between items-center mb-6'>
         <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Contacts</h2>
            <p className="text-3xl font-bold" >{contacts.length}</p>
        </div>

       <Link to={`/add-contact/${accountId}`}>
       <button
          className="bg-blue-950 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
        >
          + Add New Contact
        </button>
       </Link>
    </div>
  )
}

export default ContactInfo
