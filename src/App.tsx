import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LovePage from '@/components/love-page'
import Portfolio from '@/components/portfolio'

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/amor" element={<LovePage />} />
      </Routes>
    </Router>
  )
}

export default App
