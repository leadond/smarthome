import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MdDashboard, 
  MdDevicesOther, 
  MdMeetingRoom, 
  MdAutoAwesome, 
  MdBolt, 
  MdSettings,
  MdMenu,
  MdClose,
  MdNotifications,
  MdMic,
  MdPerson
} from 'react-icons/md'
import { useAuthStore } from '../stores/authStore'

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  const closeSidebar = () => {
    setSidebarOpen(false)
  }
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <MdDashboard size={24} /> },
    { path: '/devices', label: 'Devices', icon: <MdDevicesOther size={24} /> },
    { path: '/rooms', label: 'Rooms', icon: <MdMeetingRoom size={24} /> },
    { path: '/routines', label: 'Routines', icon: <MdAutoAwesome size={24} /> },
    { path: '/energy', label: 'Energy', icon: <MdBolt size={24} /> },
    { path: '/settings', label: 'Settings', icon: <MdSettings size={24} /> }
  ]
  
  return (
    <div className="flex h-screen bg-secondary-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                SH
              </div>
              <h1 className="ml-2 text-xl font-bold text-secondary-900">SmartHome</h1>
            </div>
            <button 
              className="p-1 rounded-md text-secondary-500 hover:bg-secondary-100 lg:hidden"
              onClick={closeSidebar}
            >
              <MdClose size={24} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-secondary-600 hover:bg-secondary-100'
                      }
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-secondary-100">
            <div className="flex items-center">
              <img 
                src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="font-medium text-secondary-900">{user?.name || 'Demo User'}</p>
                <p className="text-sm text-secondary-500">{user?.email || 'demo@smarthomehub.com'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 w-full px-4 py-2 text-sm font-medium text-secondary-600 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              className="p-1 rounded-md text-secondary-500 hover:bg-secondary-100 lg:hidden"
              onClick={toggleSidebar}
            >
              <MdMenu size={24} />
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full text-secondary-500 hover:bg-secondary-100">
                <MdMic size={20} />
              </button>
              <button className="p-2 rounded-full text-secondary-500 hover:bg-secondary-100 relative">
                <MdNotifications size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
              </button>
              <NavLink to="/profile" className="p-2 rounded-full text-secondary-500 hover:bg-secondary-100">
                <MdPerson size={20} />
              </NavLink>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-secondary-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
