import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import StagePage from './pages/StagePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/stage/:stageId" element={<StagePage />} />
    </Routes>
  )
}

export default App
