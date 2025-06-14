import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRoutineStore } from '../stores/routineStore'
import { MdAdd, MdPlayArrow, MdStar, MdStarBorder } from 'react-icons/md'

const Routines = () => {
  const { routines, fetchRoutines, executeRoutine, favoriteRoutine, getIconComponent } = useRoutineStore()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  
  useEffect(() => {
    const loadRoutines = async () => {
      setIsLoading(true)
      await fetchRoutines()
      setIsLoading(false)
    }
    
    loadRoutines()
  }, [fetchRoutines])
  
  const handleExecuteRoutine = async (id) => {
    await executeRoutine(id)
  }
  
  const handleToggleFavorite = (id, currentStatus) => {
    favoriteRoutine(id, !currentStatus)
  }
  
  const filteredRoutines = routines.filter(routine => {
    if (activeTab === 'all') return true
    if (activeTab === 'favorites') return routine.isFavorite
    if (activeTab === 'scheduled') return routine.schedule !== null
    return true
  })
  
  // Render the icon component based on the iconName string
  const renderIcon = (iconName) => {
    const IconComponent = getIconComponent(iconName)
    return <IconComponent size={24} />
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">Routines</h1>
          <p className="text-secondary-600 mt-1">Automate your smart home with custom routines</p>
        </div>
        
        <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <MdAdd size={20} className="mr-1" />
          <span>Create Routine</span>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-secondary-200 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'all'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-secondary-600 hover:text-secondary-900'
          }`}
        >
          All Routines
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'favorites'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-secondary-600 hover:text-secondary-900'
          }`}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'scheduled'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-secondary-600 hover:text-secondary-900'
          }`}
        >
          Scheduled
        </button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary-200"></div>
                <div className="ml-3 flex-1">
                  <div className="h-5 bg-secondary-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-4 bg-secondary-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-secondary-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutines.map(routine => (
            <div key={routine.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className={`${routine.color} p-2 rounded-lg`}>
                  {renderIcon(routine.iconName)}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-secondary-900">{routine.name}</h3>
                    <button 
                      onClick={() => handleToggleFavorite(routine.id, routine.isFavorite)}
                      className="text-warning-500 hover:text-warning-600"
                    >
                      {routine.isFavorite ? <MdStar size={20} /> : <MdStarBorder size={20} />}
                    </button>
                  </div>
                  
                  {routine.schedule && (
                    <p className="text-sm text-secondary-600 mt-1">{routine.schedule}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-secondary-100">
                <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
                  <div>{routine.deviceCount} devices</div>
                  <div>Run {routine.timesExecuted} times</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-secondary-500">
                    Last run: {routine.lastRun}
                  </div>
                  <button
                    onClick={() => handleExecuteRoutine(routine.id)}
                    className="flex items-center justify-center px-3 py-1 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    <MdPlayArrow size={16} className="mr-1" />
                    <span>Run</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Routines
