import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Information from './pages/Information'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Information/>
    </BrowserRouter>
  </StrictMode>,
)
