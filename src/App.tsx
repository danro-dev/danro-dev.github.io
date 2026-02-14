import './index.css'
import LovePage from '@/components/love-page'
import Portfolio from '@/components/portfolio'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/amor') {
    return <LovePage />
  }

  return <Portfolio />
}

export default App
