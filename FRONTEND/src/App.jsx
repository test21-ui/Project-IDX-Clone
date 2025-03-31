import { Routes, Route } from 'react-router-dom'
import { CreateProject } from './pages/createProject.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
    </Routes>
  )
  
}

export default App
