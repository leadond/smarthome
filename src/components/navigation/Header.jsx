import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MdMenu, MdMic, MdMicOff, MdNotifications, MdSearch } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useNotificationStore } from '../../stores/notificationStore'
import NotificationPanel from '../notifications/NotificationPanel'

const Header = ({ onMenuClick, isListening, onVoiceClick }) => {
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { notifications, unreadCount } = useNotificationStore()

  // Set page title based on current route
  useEffect(() => {
    const path = location.pathname
    
    if (path === '/') setTitle('Dashboard')
    else if (path.startsWith('/devices')) {
      if (path === '/devices') setTitle('Devices')
      else setTitle('Device Details')
    }
    else if (path.startsWith('/rooms')) {
      if (path === '/rooms') setTitle('Rooms')
      else setTitle('Room Details')
    }
    else if (path.startsWith('/routines')) {
      if (path === '/routines') setTitle('Routines')
      else setTitle('Routine Details')
    }
    else if (path === '/energy') setTitle('Energy Monitoring')
    else if (path === '/settings') setTitle('Settings')
    else if (path === '/profile') setTitle('Profile')
    else setTitle('SmartHome Hub')
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-full hover:bg-secondary-100 text-secondary-500"
          >
            <MdMenu size={24} />
          </button>
          
          <h1 className="text-xl font-semibold text-secondary-900 hidden md:block">
            {title}
          </h1>
        </div>

        {/* Mobile title */}
        <h1 className="text-lg font-semibold text-secondary-900 absolute left-1/2 transform -translate-x-1/2 md:hidden">
          {title}
        </h1>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          {showSearch ? (
            <motion.form 
              initial={{ width: 40, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 40, opacity: 0 }}
              className="relative"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-4 py-1 rounded-full border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                onBlur={() => {
                  if (!searchQuery) setShowSearch(false)
                }}
              />
              <MdSearch 
                size={18} 
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-secondary-400" 
              />
            </motion.form>
          ) : (
            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-secondary-100 text-secondary-500"
            >
              <MdSearch size={20} />
            </button>
          )}

          {/* Voice control */}
          <button 
            onClick={onVoiceClick}
            className={`p-2 rounded-full ${
              isListening 
                ? 'bg-primary-100 text-primary-700' 
                : 'hover:bg-secondary-100 text-secondary-500'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice control'}
          >
            {isListening ? <MdMic size={20} /> : <MdMicOff size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-secondary-100 text-secondary-500 relative"
            >
              <MdNotifications size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-danger-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification panel */}
            {showNotifications && (
              <NotificationPanel 
                notifications={notifications} 
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
