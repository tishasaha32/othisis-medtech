import Index from './pages/Index'
import { Sidebar } from './components/app/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  )
}

export default App
