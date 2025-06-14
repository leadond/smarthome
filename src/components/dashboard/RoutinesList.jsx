import { Link } from 'react-router-dom'
import { MdPlayArrow, MdAccessTime, MdDevices } from 'react-icons/md'
import { useRoutineStore } from '../../stores/routineStore'

const RoutinesList = () => {
  const { routines, executeRoutine } = useRoutineStore()
  
  // Get the most used routines
  const topRoutines = [...routines]
    .sort((a, b) => b.timesExecuted - a.timesExecuted)
    .slice(0, 5)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary-900">Routines</h2>
        <Link to="/routines" className="text-sm text-primary-600 hover:text-primary-800 font-medium">
          View All
        </Link>
      </div>
      
      <div className="space-y-3">
        {topRoutines.length > 0 ? (
          topRoutines.map(routine => (
            <div key={routine.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${routine.color}`}>
                  {routine.icon}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-secondary-900">{routine.name}</p>
                  <div className="flex items-center text-xs text-secondary-500 mt-1">
                    <MdDevices size={14} className="mr-1" />
                    <span>{routine.deviceCount} devices</span>
                    <span className="mx-2">•</span>
                    <MdAccessTime size={14} className="mr-1" />
                    <span>
                      {routine.schedule ? routine.schedule : 'Manual'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => executeRoutine(routine.id)}
                className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100"
                title="Run routine"
              >
                <MdPlayArrow size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="py-6 text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
              <MdAccessTime size={24} className="text-secondary-400" />
            </div>
            <p className="mt-3 text-secondary-500">No routines created yet</p>
            <Link to="/routines" className="mt-2 inline-block text-primary-600 hover:text-primary-800 font-medium">
              Create a Routine
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoutinesList
