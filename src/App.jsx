import {Route, Routes} from 'react-router-dom'
import Dashboard from './pages/DashBoard'
import Accounts from './pages/Accounts'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Orders from './pages/Orders'
import SideBar from './sections/SideBar'


const App = () => {
  return (
    <div className='min-h-screen'> 
    <dir className="w-full flex">
      <SideBar/>
      <div className='w-[80%] mx-auto max-sm:w-full my-8 ' >
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/accounts' element={<Accounts/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/order' element={<Orders/>} />
        </Routes>
      </div>
    </dir>
    </div>
  )
}

export default App
