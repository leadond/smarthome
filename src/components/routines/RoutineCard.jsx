import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdStar, MdStarOutline, MdMoreVert, MdPlayArrow } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRoutineStore } from '../../stores/routineStore'

const RoutineCard = ({ routine, onExecute, isEditing }) => {
  const [showMenu, setShowMenu] = useState(false)
  const { favoriteRoutine } = useRoutineStore()

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
            favoriteRoutine(routine.id, !routine.isFavorite)
          }}
          className="absolute top-2 left-2 p-1 rounded-full hover:bg-secondary-100"
        >
          {routine.isFavorite ? (
            <MdStar className="text-warning-500" size={18} />
          ) : (
            <MdStarOutline className="text-secondary-400" size={18} />
          )}
        </button>
      )}
      
      <Link to={`/routines/${routine.id}`} className="block">
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${routine.color}`}>
            {routine.icon}
          </div>
          
          <h3 className="font-medium text-secondary-900 text-center mb-1">{routine.name}</h3>
          
          <p className="text-xs text-secondary-500 mb-3">
            {routine.schedule ? routine.schedule : 'Manual'}
          </p>
          
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onExecute()
            }}
            className="px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center"
          >
            <MdPlayArrow size={16} className="mr-1" />
            Run
          </button>
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
                to={`/routines/${routine.id}`}
                className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                View Details
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  favoriteRoutine(routine.id, !routine.isFavorite)
                  setShowMenu(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                {routine.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onExecute()
                  setShowMenu(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
              >
                Run Routine
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default RoutineCard
