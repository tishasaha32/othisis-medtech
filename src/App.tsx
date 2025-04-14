import Index from './pages/Index'
import { Sidebar } from './components/app/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
