import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import StagePage from './pages/StagePage'
import AdvancedPage from './pages/AdvancedPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/stage/:stageId" element={<StagePage />} />
      <Route path="/advanced/:stageId" element={<AdvancedPage />} />
    </Routes>
  )
}

export default App
