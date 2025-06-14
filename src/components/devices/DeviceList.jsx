import { useState } from 'react'
import { MdFilterList, MdSearch, MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DeviceCard from './DeviceCard'
import { useDeviceStore } from '../../stores/deviceStore'

const DeviceList = () => {
  const { devices, toggleDevice, favoriteDevice } = useDeviceStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterRoom, setFilterRoom] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Get unique device types and rooms for filters
  const deviceTypes = ['all', ...new Set(devices.map(device => device.type))]
  const rooms = ['all', ...new Set(devices.map(device => device.room))]
  
  // Filter devices based on search query and filters
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          device.room.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || device.type === filterType
    const matchesRoom = filterRoom === 'all' || device.room === filterRoom
    
    return matchesSearch && matchesType && matchesRoom
  })

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search devices..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MdSearch 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            >
              <MdFilterList size={20} className="mr-1" />
              Filters
            </button>
            
            <Link to="/devices/add" className="btn btn-primary">
              <MdAdd size={20} className="mr-1" />
              Add Device
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Device Type
                </label>
                <select
                  className="input"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {deviceTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Room
                </label>
                <select
                  className="input"
                  value={filterRoom}
                  onChange={(e) => setFilterRoom(e.target.value)}
                >
                  {rooms.map(room => (
                    <option key={room} value={room}>
                      {room === 'all' ? 'All Rooms' : room}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {filteredDevices.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDevices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={() => toggleDevice(device.id, !device.isOn)}
              onFavorite={() => favoriteDevice(device.id, !device.isFavorite)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
            <MdSearch size={24} className="text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-secondary-900">No devices found</h3>
          <p className="mt-2 text-secondary-500">
            {searchQuery || filterType !== 'all' || filterRoom !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first device to get started'}
          </p>
          <Link to="/devices/add" className="mt-4 inline-block btn btn-primary">
            Add Device
          </Link>
        </div>
      )}
    </div>
  )
}

export default DeviceList
