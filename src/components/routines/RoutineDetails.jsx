import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MdArrowBack, 
  MdEdit, 
  MdDelete, 
  MdStar, 
  MdStarOutline,
  MdPlayArrow,
  MdSettings,
  MdHistory,
  MdAccessTime,
  MdDevices
} from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRoutineStore } from '../../stores/routineStore'
import { useDeviceStore } from '../../stores/deviceStore'

const RoutineDetails = ({ routineId }) => {
  const navigate = useNavigate()
  const { routines, executeRoutine, favoriteRoutine, removeRoutine } = useRoutineStore()
  const { devices } = useDeviceStore()
  const [activeTab, setActiveTab] = useState('actions')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const routine = routines.find(r => r.id === routineId)
  
  if (!routine) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-secondary-900">Routine not found</h3>
        <button
          onClick={() => navigate('/routines')}
          className="mt-4 btn btn-primary"
        >
          Back to Routines
        </button>
      </div>
    )
  }
  
  const handleDelete = () => {
    removeRoutine(routine.id)
    navigate('/routines')
  }
  
  // Generate execution history
  const generateExecutionHistory = () => {
    const history = []
    
    // Generate random history entries
    for (let i = 0; i < 10; i++) {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 14))
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
      
      const entry = {
        id: i,
        timestamp: date.toLocaleString(),
        status: Math.random() > 0.2 ? 'success' : 'failed',
        trigger: Math.random() > 0.6 ? 'Manual' : Math.random() > 0.5 ? 'Schedule' : 'Voice Command'
      }
      
      history.push(entry)
    }
    
    // Sort by timestamp (newest first)
    return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }
  
  const executionHistory = generateExecutionHistory()
  
  const renderActions = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-secondary-900">Routine Actions</h3>
          
          <button
            onClick={() => executeRoutine(routine.id)}
            className="btn btn-primary"
          >
            <MdPlayArrow size={20} className="mr-1" />
            Run Now
          </button>
        </div>
        
        <div className="space-y-4">
          {routine.actions && routine.actions.map((action, index) => (
            <div key={index} className="p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-secondary-900">{action.description}</h4>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    {action.deviceIds && action.deviceIds.map(deviceId => {
                      const device = devices.find(d => d.id === deviceId)
                      return device ? (
                        <div key={deviceId} className="px-3 py-1 bg-white border border-secondary-200 rounded-full text-sm">
                          {device.name}
                        </div>
                      ) : null
                    })}
                  </div>
                  
                  {action.delay && (
                    <p className="mt-2 text-sm text-secondary-500 flex items-center">
                      <MdAccessTime size={16} className="mr-1" />
                      Wait {action.delay} seconds before next action
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {(!routine.actions || routine.actions.length === 0) && (
            <div className="text-center py-8">
              <p className="text-secondary-500">No actions defined for this routine</p>
              <button
                onClick={() => setActiveTab('settings')}
                className="mt-3 text-primary-600 hover:text-primary-800 font-medium"
              >
                Add Actions
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  const renderHistory = () => {
    return (
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Execution History</h3>
        
        <div className="bg-secondary-50 rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Trigger
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-100">
                {executionHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">{entry.timestamp}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.status === 'success' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-danger-100 text-danger-800'
                      }`}>
                        {entry.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-secondary-500">{entry.trigger}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  
  const renderSettings = () => {
    return (
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Routine Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Routine Name
            </label>
            <input
              type="text"
              className="input"
              defaultValue={routine.name}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Icon Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              <button className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-500"></button>
              <button className="w-10 h-10 rounded-full bg-success-100"></button>
              <button className="w-10 h-10 rounded-full bg-warning-100"></button>
              <button className="w-10 h-10 rounded-full bg-danger-100"></button>
              <button className="w-10 h-10 rounded-full bg-secondary-100"></button>
              <button className="w-10 h-10 rounded-full bg-secondary-300"></button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Schedule
            </label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="enableSchedule"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                defaultChecked={!!routine.schedule}
              />
              <label htmlFor="enableSchedule" className="ml-2 block text-sm text-secondary-900">
                Enable schedule
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-secondary-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="input"
                  defaultValue="08:00"
                  disabled={!routine.schedule}
                />
              </div>
              
              <div>
                <label className="block text-sm text-secondary-700 mb-1">
                  Repeat
                </label>
                <select 
                  className="input"
                  disabled={!routine.schedule}
                >
                  <option value="daily">Every day</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Actions
            </label>
            
            <div className="space-y-4">
              {routine.actions && routine.actions.map((action, index) => (
                <div key={index} className="p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-secondary-900">{action.description}</h4>
                        <button className="text-secondary-500 hover:text-secondary-700">
                          <MdEdit size={18} />
                        </button>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {action.deviceIds && action.deviceIds.map(deviceId => {
                          const device = devices.find(d => d.id === deviceId)
                          return device ? (
                            <div key={deviceId} className="px-3 py-1 bg-white border border-secondary-200 rounded-full text-sm">
                              {device.name}
                            </div>
                          ) : null
                        })}
                      </div>
                      
                      {action.delay && (
                        <p className="mt-2 text-sm text-secondary-500 flex items-center">
                          <MdAccessTime size={16} className="mr-1" />
                          Wait {action.delay} seconds before next action
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full p-3 border-2 border-dashed border-secondary-300 rounded-lg text-secondary-500 hover:text-secondary-700 hover:border-secondary-400">
                + Add Action
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
          onClick={() => navigate('/routines')}
          className="p-2 rounded-full hover:bg-secondary-100 mr-2"
        >
          <MdArrowBack size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-secondary-900">{routine.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Routine info */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${routine.color}`}>
                {routine.icon}
              </div>
              
              <h2 className="text-xl font-semibold text-secondary-900 mb-1">{routine.name}</h2>
              
              <p className="text-secondary-500 mb-4">
                {routine.schedule ? routine.schedule : 'Manual Routine'}
              </p>
              
              <div className="flex space-x-2 mb-4">
                <div className="px-3 py-1 bg-secondary-100 rounded-full text-sm flex items-center">
                  <MdDevices size={16} className="mr-1" />
                  {routine.deviceCount} devices
                </div>
                
                <div className="px-3 py-1 bg-secondary-100 rounded-full text-sm flex items-center">
                  <MdAccessTime size={16} className="mr-1" />
                  {routine.timesExecuted} runs
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => favoriteRoutine(routine.id, !routine.isFavorite)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title={routine.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {routine.isFavorite ? (
                    <MdStar className="text-warning-500" size={20} />
                  ) : (
                    <MdStarOutline className="text-secondary-400" size={20} />
                  )}
                </button>
                
                <button
                  onClick={() => navigate(`/routines/edit/${routine.id}`)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title="Edit routine"
                >
                  <MdEdit className="text-secondary-500" size={20} />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title="Delete routine"
                >
                  <MdDelete className="text-secondary-500" size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-secondary-100">
              <h3 className="text-sm font-medium text-secondary-700 mb-3">Routine Info</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Created</span>
                  <span className="text-sm font-medium">{routine.created || '2 weeks ago'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Last Run</span>
                  <span className="text-sm font-medium">{routine.lastRun || 'Yesterday, 8:30 PM'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Next Run</span>
                  <span className="text-sm font-medium">
                    {routine.schedule ? 'Today, 8:00 PM' : 'Manual only'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Voice Command</span>
                  <span className="text-sm font-medium">
                    "Run {routine.name}"
                  </span>
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
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'actions' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                onClick={() => setActiveTab('actions')}
              >
                <MdPlayArrow className="inline mr-1" size={18} />
                Actions
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'history' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                onClick={() => setActiveTab('history')}
              >
                <MdHistory className="inline mr-1" size={18} />
                History
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
              {activeTab === 'actions' && renderActions()}
              {activeTab === 'history' && renderHistory()}
              {activeTab === 'settings' && renderSettings()}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-secondary-900 mb-3">Delete Routine</h3>
            <p className="text-secondary-600 mb-6">
              Are you sure you want to delete "{routine.name}"? This action cannot be undone.
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

export default RoutineDetails
