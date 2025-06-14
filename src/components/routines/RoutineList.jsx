import { useState } from 'react'
import { MdFilterList, MdSearch, MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import RoutineCard from './RoutineCard'
import { useRoutineStore } from '../../stores/routineStore'

const RoutineList = () => {
  const { routines, executeRoutine } = useRoutineStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter routines based on search query and filters
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = routine.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || 
                        (filterType === 'scheduled' && routine.schedule) ||
                        (filterType === 'manual' && !routine.schedule)
    
    return matchesSearch && matchesType
  })

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search routines..."
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
            
            <Link to="/routines/add" className="btn btn-primary">
              <MdAdd size={20} className="mr-1" />
              Add Routine
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Routine Type
              </label>
              <select
                className="input"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Routines</option>
                <option value="scheduled">Scheduled</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {filteredRoutines.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredRoutines.map(routine => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onExecute={() => executeRoutine(routine.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
            <MdSearch size={24} className="text-secondary-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-secondary-900">No routines found</h3>
          <p className="mt-2 text-secondary-500">
            {searchQuery || filterType !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first routine to get started'}
          </p>
          <Link to="/routines/add" className="mt-4 inline-block btn btn-primary">
            Add Routine
          </Link>
        </div>
      )}
    </div>
  )
}

export default RoutineList
