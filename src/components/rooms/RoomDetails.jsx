import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MdArrowBack, 
  MdEdit, 
  MdDelete, 
  MdStar, 
  MdStarOutline,
  MdDevices,
  MdSettings,
  MdLightbulb,
  MdThermostat,
  MdLock,
  MdPower
} from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRoomStore } from '../../stores/roomStore'
import { useDeviceStore } from '../../stores/deviceStore'
import DeviceCard from '../devices/DeviceCard'

const RoomDetails = ({ roomId }) => {
  const navigate = useNavigate()
  const { rooms, favoriteRoom, removeRoom } = useRoomStore()
  const { devices, toggleDevice, favoriteDevice } = useDeviceStore()
  const [activeTab, setActiveTab] = useState('devices')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const room = rooms.find(r => r.id === roomId)
  
  if (!room) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-secondary-900">Room not found</h3>
        <button
          onClick={() => navigate('/rooms')}
          className="mt-4 btn btn-primary"
        >
          Back to Rooms
        </button>
      </div>
    )
  }
  
  // Get devices in this room
  const roomDevices = devices.filter(device => device.room === room.name)
  
  // Count active devices
  const activeDevices = roomDevices.filter(device => device.isOn).length
  
  // Get room icon
  const getRoomIcon = () => {
    switch (room.type) {
      case 'living':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'bedroom':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'kitchen':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'bathroom':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'office':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
    }
  }
  
  const handleDelete = () => {
    removeRoom(room.id)
    navigate('/rooms')
  }
  
  // Group devices by type
  const devicesByType = roomDevices.reduce((acc, device) => {
    if (!acc[device.type]) {
      acc[device.type] = []
    }
    acc[device.type].push(device)
    return acc
  }, {})
  
  // Turn all devices on/off
  const toggleAllDevices = (on) => {
    roomDevices.forEach(device => {
      toggleDevice(device.id, on)
    })
  }
  
  // Turn devices of a specific type on/off
  const toggleDevicesByType = (type, on) => {
    roomDevices
      .filter(device => device.type === type)
      .forEach(device => {
        toggleDevice(device.id, on)
      })
  }
  
  const renderDeviceControls = () => {
    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => toggleAllDevices(true)}
            className="btn btn-primary"
          >
            <MdPower size={18} className="mr-1" />
            Turn All On
          </button>
          
          <button
            onClick={() => toggleAllDevices(false)}
            className="btn btn-secondary"
          >
            <MdPower size={18} className="mr-1" />
            Turn All Off
          </button>
          
          {devicesByType.light && devicesByType.light.length > 0 && (
            <>
              <button
                onClick={() => toggleDevicesByType('light', true)}
                className="btn btn-secondary"
              >
                <MdLightbulb size={18} className="mr-1" />
                Lights On
              </button>
              
              <button
                onClick={() => toggleDevicesByType('light', false)}
                className="btn btn-secondary"
              >
                <MdLightbulb size={18} className="mr-1" />
                Lights Off
              </button>
            </>
          )}
        </div>
        
        {roomDevices.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roomDevices.map(device => (
              <DeviceCard
                key={device.id}
                device={device}
                onToggle={() => toggleDevice(device.id, !device.isOn)}
                onFavorite={() => favoriteDevice(device.id, !device.isFavorite)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
              <MdDevices size={24} className="text-secondary-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-secondary-900">No devices in this room</h3>
            <p className="mt-2 text-secondary-500">
              Add devices to this room to control them from here
            </p>
            <Link to="/devices/add" className="mt-4 inline-block btn btn-primary">
              Add Device
            </Link>
          </div>
        )}
      </div>
    )
  }
  
  const renderSettings = () => {
    return (
      <div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Room Name
            </label>
            <input
              type="text"
              className="input"
              defaultValue={room.name}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Room Type
            </label>
            <select className="input" defaultValue={room.type}>
              <option value="living">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Floor
            </label>
            <select className="input" defaultValue={room.floor || '1'}>
              <option value="basement">Basement</option>
              <option value="1">First Floor</option>
              <option value="2">Second Floor</option>
              <option value="3">Third Floor</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button className="p-3 rounded-lg bg-primary-50 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <button className="p-3 rounded-lg bg-secondary-100 text-secondary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </button>
              <button className="p-3 rounded-lg bg-secondary-100 text-secondary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-3 rounded-lg bg-secondary-100 text-secondary-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button className="btn btn-secondary">
            Cancel
          </button>
          <button className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/rooms')}
          className="p-2 rounded-full hover:bg-secondary-100 mr-2"
        >
          <MdArrowBack size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-secondary-900">{room.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Room info */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                {getRoomIcon()}
              </div>
              
              <h2 className="text-xl font-semibold text-secondary-900 mb-1">{room.name}</h2>
              <p className="text-secondary-500 mb-4">{room.type.charAt(0).toUpperCase() + room.type.slice(1)}</p>
              
              <div className="flex space-x-2 mb-4">
                <div className="px-3 py-1 bg-secondary-100 rounded-full text-sm">
                  {roomDevices.length} devices
                </div>
                
                {activeDevices > 0 && (
                  <div className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm">
                    {activeDevices} active
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => favoriteRoom(room.id, !room.isFavorite)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title={room.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {room.isFavorite ? (
                    <MdStar className="text-warning-500" size={20} />
                  ) : (
                    <MdStarOutline className="text-secondary-400" size={20} />
                  )}
                </button>
                
                <button
                  onClick={() => navigate(`/rooms/edit/${room.id}`)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title="Edit room"
                >
                  <MdEdit className="text-secondary-500" size={20} />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title="Delete room"
                >
                  <MdDelete className="text-secondary-500" size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-secondary-100">
              <h3 className="text-sm font-medium text-secondary-700 mb-3">Room Stats</h3>
              
              <div className="space-y-3">
                {room.temperature && (
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-500">Temperature</span>
                    <span className="text-sm font-medium">{room.temperature}°</span>
                  </div>
                )}
                
                {room.humidity && (
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-500">Humidity</span>
                    <span className="text-sm font-medium">{room.humidity}%</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Lights</span>
                  <span className="text-sm font-medium">
                    {devicesByType.light ? devicesByType.light.filter(d => d.isOn).length : 0}/
                    {devicesByType.light ? devicesByType.light.length : 0}
                  </span>
                </div>
                
                {devicesByType.thermostat && (
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-500">Thermostat</span>
                    <span className="text-sm font-medium">
                      {devicesByType.thermostat[0].isOn ? 'On' : 'Off'}
                    </span>
                  </div>
                )}
                
                {devicesByType.lock && (
                  <div className="flex justify-between">
                    <span className="text-sm text-secondary-500">Locks</span>
                    <span className="text-sm font-medium">
                      {devicesByType.lock.filter(d => d.isOn).length}/
                      {devicesByType.lock.length} Locked
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Floor</span>
                  <span className="text-sm font-medium">{room.floor || 'First Floor'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Controls and tabs */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex border-b border-secondary-200 mb-4">
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'devices' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                onClick={() => setActiveTab('devices')}
              >
                <MdDevices className="inline mr-1" size={18} />
                Devices
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'settings' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                onClick={() => setActiveTab('settings')}
              >
                <MdSettings className="inline mr-1" size={18} />
                Settings
              </button>
            </div>
            
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'devices' && renderDeviceControls()}
              {activeTab === 'settings' && renderSettings()}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-secondary-900 mb-3">Delete Room</h3>
            <p className="text-secondary-600 mb-6">
              Are you sure you want to delete "{room.name}"? This will not delete the devices in this room, but they will no longer be associated with this room.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomDetails
