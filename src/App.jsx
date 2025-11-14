import {Route, Routes} from 'react-router-dom'
import Dashboard from './pages/DashBoard'
import Accounts from './pages/Accounts'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Orders from './pages/Orders'
import SideBar from './sections/SideBar'
import AddProductForm from './components/AddProductForm'
import AddAccountForm from './components/AddAccountFrom'
import AddContactForm from './components/AddContactForm'
import AddOrderForm from './components/AddOrderForm'


const App = () => {
  return (
    <div className='min-h-screen'> 
    <dir className="w-full flex">
      <SideBar/>
      <div className='w-[80%] mx-auto max-sm:w-full my-8 ' >
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/accounts' element={<Accounts/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/contact/:accountId' element={<Contact/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path="/orders/:accountId" element={<Orders />} />
          <Route path='/add-product' element={<AddProductForm/>} />
          <Route path='/update-product/:productId' element={<AddProductForm/>} />
          <Route path='/add-account' element={<AddAccountForm/>} />
          <Route path='/update-account/:accountId' element={<AddAccountForm/>} />
          <Route path='/add-contact/:accountId' element={<AddContactForm />} />
          <Route path='/update-contact/:accountId/:contactcId' element={<AddContactForm />} />

          <Route path='/add-order' element={<AddOrderForm/>} />
          <Route path='/update-order/:orderId' element={<AddOrderForm/>} />
        </Routes>
      </div>
    </dir>
    </div>
  )
}

export default App
