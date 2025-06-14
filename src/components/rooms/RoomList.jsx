import { useState } from 'react'
import { MdFilterList, MdSearch, MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import RoomCard from './RoomCard'
import { useRoomStore } from '../../stores/roomStore'

const RoomList = () => {
  const { rooms } = useRoomStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Get unique room types for filters
  const roomTypes = ['all', ...new Set(rooms.map(room => room.type))]
  
  // Filter rooms based on search query and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || room.type === filterType
    
    return matchesSearch && matchesType
  })

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search rooms..."
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
            
            <Link to="/rooms/add" className="btn btn-primary">
              <MdAdd size={20} className="mr-1" />
              Add Room
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Room Type
              </label>
              <select
                className="input"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredRooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
            <MdSearch size={24} className="text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-secondary-900">No rooms found</h3>
          <p className="mt-2 text-secondary-500">
            {searchQuery || filterType !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first room to get started'}
          </p>
          <Link to="/rooms/add" className="mt-4 inline-block btn btn-primary">
            Add Room
          </Link>
        </div>
      )}
    </div>
  )
}

export default RoomList
