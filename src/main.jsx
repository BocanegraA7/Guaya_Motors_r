import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Information from './pages/Information'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Information/>
  </StrictMode>,
)
