import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from '@/store'
import { setupAxiosInterceptors } from '@/services'

// Initialize Axios interceptors with Redux store dispatch
setupAxiosInterceptors(store.dispatch)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
