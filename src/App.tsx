import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Logout from './security/Logout'
import Login from './security/Login'
import ParticipantPage from './pages/ParticipantPage'
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<HomePage />} />
        <Route path="/participants" element={<ParticipantPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Layout>
  )
}

export default App
