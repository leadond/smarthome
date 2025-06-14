import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MdDashboard, 
  MdDevices, 
  MdMeetingRoom, 
  MdAutoAwesome, 
  MdBolt, 
  MdSettings, 
  MdClose,
  MdPerson
} from 'react-icons/md'
import { useAuthStore } from '../../stores/authStore'

const navItems = [
  { path: '/', label: 'Dashboard', icon: <MdDashboard size={24} /> },
  { path: '/devices', label: 'Devices', icon: <MdDevices size={24} /> },
  { path: '/rooms', label: 'Rooms', icon: <MdMeetingRoom size={24} /> },
  { path: '/routines', label: 'Routines', icon: <MdAutoAwesome size={24} /> },
  { path: '/energy', label: 'Energy', icon: <MdBolt size={24} /> },
  { path: '/profile', label: 'Profile', icon: <MdPerson size={24} /> },
  { path: '/settings', label: 'Settings', icon: <MdSettings size={24} /> },
]

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore()

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25 }}
        className={`fixed md:static top-0 left-0 z-30 h-full w-64 bg-white shadow-lg md:shadow-none transform md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-secondary-900">SmartHome</h1>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden p-1 rounded-full hover:bg-secondary-100"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700 font-medium' 
                          : 'text-secondary-600 hover:bg-secondary-100'
                      }`
                    }
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
              <button 
                onClick={logout}
                className="p-1 rounded-full hover:bg-secondary-100 text-secondary-500 hover:text-secondary-700"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
