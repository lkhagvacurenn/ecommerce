import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {FavProvider} from './context/FavContext'
import { ProductProvider } from './context/ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
            <BrowserRouter>

    <FavProvider>
      <ProductProvider>
          <App />
    </ProductProvider>
    </FavProvider>
            </BrowserRouter>

  </StrictMode>,
)
