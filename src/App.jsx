import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import Rooms from './pages/Rooms'
import Routines from './pages/Routines'
import Energy from './pages/Energy'
import Settings from './pages/Settings'
import AccountSetup from './pages/AccountSetup'
import './index.css'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/account-setup" element={
          <ProtectedRoute>
            <AccountSetup />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="routines" element={<Routines />} />
          <Route path="energy" element={<Energy />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
