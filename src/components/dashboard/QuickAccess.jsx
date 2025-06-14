import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdAdd, MdEdit } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useDeviceStore } from '../../stores/deviceStore'
import { useRoomStore } from '../../stores/roomStore'
import { useRoutineStore } from '../../stores/routineStore'
import DeviceCard from '../devices/DeviceCard'
import RoomCard from '../rooms/RoomCard'
import RoutineCard from '../routines/RoutineCard'

const QuickAccess = () => {
  const { devices, toggleDevice, favoriteDevice } = useDeviceStore()
  const { rooms } = useRoomStore()
  const { routines, executeRoutine } = useRoutineStore()
  const [activeTab, setActiveTab] = useState('favorites')
  const [isEditing, setIsEditing] = useState(false)

  // Get favorite devices
  const favoriteDevices = devices.filter(device => device.isFavorite)
  
  // Get recently used devices
  const recentDevices = [...devices]
    .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed))
    .slice(0, 4)
  
  // Get favorite rooms
  const favoriteRooms = rooms.filter(room => room.isFavorite).slice(0, 4)
  
  // Get favorite routines
  const favoriteRoutines = routines.filter(routine => routine.isFavorite).slice(0, 4)

  const getActiveItems = () => {
    switch (activeTab) {
      case 'favorites':
        return favoriteDevices.length > 0 ? favoriteDevices : []
      case 'recent':
        return recentDevices
      case 'rooms':
        return favoriteRooms
      case 'routines':
        return favoriteRoutines
      default:
        return []
    }
  }

  const renderContent = () => {
    const items = getActiveItems()
    
    if (items.length === 0) {
      return (
        <div className="py-10 text-center">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
            <MdAdd size={24} className="text-secondary-400" />
          </div>
          <p className="mt-4 text-secondary-500">
            {activeTab === 'favorites' && 'No favorite devices yet. Mark devices as favorites to see them here.'}
            {activeTab === 'recent' && 'No recently used devices yet.'}
            {activeTab === 'rooms' && 'No favorite rooms yet.'}
            {activeTab === 'routines' && 'No favorite routines yet.'}
          </p>
          <Link 
            to={activeTab === 'routines' ? '/routines' : activeTab === 'rooms' ? '/rooms' : '/devices'} 
            className="mt-3 inline-block text-primary-600 hover:text-primary-800 font-medium"
          >
            {activeTab === 'routines' && 'Go to Routines'}
            {activeTab === 'rooms' && 'Go to Rooms'}
            {(activeTab === 'favorites' || activeTab === 'recent') && 'Go to Devices'}
          </Link>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activeTab === 'favorites' && items.map(device => (
          <DeviceCard 
            key={device.id}
            device={device}
            onToggle={() => toggleDevice(device.id, !device.isOn)}
            onFavorite={() => favoriteDevice(device.id, !device.isFavorite)}
            isEditing={isEditing}
          />
        ))}
        
        {activeTab === 'recent' && items.map(device => (
          <DeviceCard 
            key={device.id}
            device={device}
            onToggle={() => toggleDevice(device.id, !device.isOn)}
            onFavorite={() => favoriteDevice(device.id, !device.isFavorite)}
            isEditing={isEditing}
          />
        ))}
        
        {activeTab === 'rooms' && items.map(room => (
          <RoomCard 
            key={room.id}
            room={room}
            isEditing={isEditing}
          />
        ))}
        
        {activeTab === 'routines' && items.map(routine => (
          <RoutineCard 
            key={routine.id}
            routine={routine}
            onExecute={() => executeRoutine(routine.id)}
            isEditing={isEditing}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary-900">Quick Access</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 rounded-full ${isEditing ? 'bg-primary-100 text-primary-700' : 'hover:bg-secondary-100 text-secondary-500'}`}
        >
          <MdEdit size={20} />
        </button>
      </div>
      
      <div className="flex border-b border-secondary-200 mb-4 overflow-x-auto scrollbar-hide">
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'favorites' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'recent' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'rooms' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setActiveTab('rooms')}
        >
          Rooms
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'routines' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setActiveTab('routines')}
        >
          Routines
        </button>
      </div>
      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}

export default QuickAccess
