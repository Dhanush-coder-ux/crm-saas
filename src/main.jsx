import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import ProductContextProvider from './contexts/ProductContext'
import AccountContextProvider from './contexts/AccountContext'
import OrderContextProvider from './contexts/OrderContext'


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <OrderContextProvider>
      <AccountContextProvider>
       <ProductContextProvider>
          <App />
      </ProductContextProvider>
  </AccountContextProvider>
  </OrderContextProvider>     
  </BrowserRouter>

)
