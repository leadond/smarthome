import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdStar, MdStarOutline, MdMoreVert } from 'react-icons/md'
import { motion } from 'framer-motion'

const DeviceCard = ({ device, onToggle, onFavorite, isEditing }) => {
  const [showMenu, setShowMenu] = useState(false)
  
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'thermostat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        )
      case 'lock':
        return device.isOn ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        )
      case 'camera':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      case 'speaker':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )
      case 'outlet':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
    }
  }
  
  const getStatusColor = () => {
    if (device.status === 'error') return 'bg-danger-500'
    if (device.status === 'warning') return 'bg-warning-500'
    if (device.isOn) return 'bg-success-500'
    return 'bg-secondary-300'
  }
  
  const getIconColor = () => {
    if (device.status === 'error') return 'text-danger-500'
    if (device.status === 'warning') return 'text-warning-500'
    if (device.isOn) return 'text-primary-600'
    return 'text-secondary-400'
  }
  
  const getBackgroundColor = () => {
    if (device.status === 'error') return 'bg-danger-50'
    if (device.status === 'warning') return 'bg-warning-50'
    if (device.isOn) return 'bg-primary-50'
    return 'bg-secondary-50'
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`card card-hover relative ${isEditing ? 'border-2 border-dashed border-primary-300' : ''}`}
    >
      {/* Status indicator */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${getStatusColor()}`}></div>
      
      {/* Favorite button */}
      {isEditing && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onFavorite()
          }}
          className="absolute top-2 left-2 p-1 rounded-full hover:bg-secondary-100"
        >
          {device.isFavorite ? (
            <MdStar className="text-warning-500" size={18} />
          ) : (
            <MdStarOutline className="text-secondary-400" size={18} />
          )}
        </button>
      )}
      
      <Link to={`/devices/${device.id}`} className="block">
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full ${getBackgroundColor()} flex items-center justify-center mb-3 ${getIconColor()}`}>
            {getDeviceIcon()}
          </div>
          
          <h3 className="font-medium text-secondary-900 text-center mb-1">{device.name}</h3>
          
          <p className="text-xs text-secondary-500 mb-3">{device.room}</p>
          
          <label className="switch">
            <input
              type="checkbox"
              className="switch-input"
              checked={device.isOn}
              onChange={(e) => {
                e.preventDefault()
                onToggle()
              }}
            />
            <span className="switch-slider"></span>
          </label>
        </div>
      </Link>
      
      {/* Menu (optional) */}
      {!isEditing && (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full hover:bg-secondary-100 text-secondary-500"
          >
            <MdMoreVert size={18} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
              <Link 
                to={`/devices/${device.id}`}
                className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                View Details
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onFavorite()
                  setShowMenu(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                {device.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default DeviceCard
