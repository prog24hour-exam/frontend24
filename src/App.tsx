import './styles/App.css'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Logout from './security/Logout'
import Login from './security/Login'
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Layout>
  )
}

export default App
