import { account } from "../constants"



const AccountInfo = () => {
  return (
    <div className='flex justify-between items-center mb-6'>
         <div className="bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Accounts</h2>
            <p className="text-3xl font-bold" >{account.length}</p>
        </div>

       <button
          className="bg-blue-950 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-200"
          onClick={() => alert("Add new product clicked!")} 
        >
          + Add New Account
        </button>
    </div>
  )
}

export default AccountInfo
