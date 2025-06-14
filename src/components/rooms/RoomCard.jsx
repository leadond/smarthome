import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdStar, MdStarOutline, MdMoreVert } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRoomStore } from '../../stores/roomStore'

const RoomCard = ({ room, isEditing }) => {
  const [showMenu, setShowMenu] = useState(false)
  const { favoriteRoom } = useRoomStore()
  
  const getRoomIcon = () => {
    switch (room.type) {
      case 'living':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'bedroom':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'kitchen':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'bathroom':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'office':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`card card-hover relative ${isEditing ? 'border-2 border-dashed border-primary-300' : ''}`}
    >
      {/* Favorite button */}
      {isEditing && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            favoriteRoom(room.id, !room.isFavorite)
          }}
          className="absolute top-2 left-2 p-1 rounded-full hover:bg-secondary-100"
        >
          {room.isFavorite ? (
            <MdStar className="text-warning-500" size={18} />
          ) : (
            <MdStarOutline className="text-secondary-400" size={18} />
          )}
        </button>
      )}
      
      <Link to={`/rooms/${room.id}`} className="block">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
            {getRoomIcon()}
          </div>
          
          <h3 className="font-medium text-secondary-900 text-center mb-1">{room.name}</h3>
          
          <p className="text-xs text-secondary-500 mb-3">{room.deviceCount} devices</p>
          
          <div className="flex space-x-1">
            {room.activeDevices > 0 && (
              <span className="px-2 py-1 bg-success-50 text-success-700 rounded-full text-xs font-medium">
                {room.activeDevices} active
              </span>
            )}
            
            {room.temperature && (
              <span className="px-2 py-1 bg-secondary-50 text-secondary-700 rounded-full text-xs font-medium">
                {room.temperature}°
              </span>
            )}
          </div>
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
                to={`/rooms/${room.id}`}
                className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                View Details
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  favoriteRoom(room.id, !room.isFavorite)
                  setShowMenu(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                {room.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default RoomCard
