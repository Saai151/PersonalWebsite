import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PortfolioShell from './components/home/PortfolioShell'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioShell />} />
        <Route path="/spotify/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

