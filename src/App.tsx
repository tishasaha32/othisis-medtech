import Index from './pages/Index'
import { DndProvider } from 'react-dnd'
import { Sidebar } from './components/app/Sidebar';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <div className="hidden md:flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen md:hidden">
          <p className="text-2xl text-center font-bold">Please use a desktop device to access this application</p>
        </div>
      </BrowserRouter>
    </DndProvider>
  )
}

export default App
