import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MdArrowBack, 
  MdEdit, 
  MdDelete, 
  MdStar, 
  MdStarOutline,
  MdHistory,
  MdSettings,
  MdNotifications,
  MdPower
} from 'react-icons/md'
import { motion } from 'framer-motion'
import { useDeviceStore } from '../../stores/deviceStore'
import DeviceHistory from './DeviceHistory'
import DeviceSettings from './DeviceSettings'

const DeviceDetails = ({ deviceId }) => {
  const navigate = useNavigate()
  const { devices, toggleDevice, favoriteDevice, removeDevice } = useDeviceStore()
  const [activeTab, setActiveTab] = useState('controls')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const device = devices.find(d => d.id === deviceId)
  
  if (!device) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-secondary-900">Device not found</h3>
        <button
          onClick={() => navigate('/devices')}
          className="mt-4 btn btn-primary"
        >
          Back to Devices
        </button>
      </div>
    )
  }
  
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'thermostat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        )
      case 'lock':
        return device.isOn ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
    }
  }
  
  const getStatusColor = () => {
    if (device.status === 'error') return 'bg-danger-500'
    if (device.status === 'warning') return 'bg-warning-500'
    if (device.isOn) return 'bg-success-500'
    return 'bg-secondary-300'
  }
  
  const getIconColor = () => {
    if (device.status === 'error') return 'text-danger-500'
    if (device.status === 'warning') return 'text-warning-500'
    if (device.isOn) return 'text-primary-600'
    return 'text-secondary-400'
  }
  
  const getBackgroundColor = () => {
    if (device.status === 'error') return 'bg-danger-50'
    if (device.status === 'warning') return 'bg-warning-50'
    if (device.isOn) return 'bg-primary-50'
    return 'bg-secondary-50'
  }
  
  const handleDelete = () => {
    removeDevice(device.id)
    navigate('/devices')
  }
  
  const renderControls = () => {
    switch (device.type) {
      case 'light':
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Power</h3>
              <label className="switch">
                <input
                  type="checkbox"
                  className="switch-input"
                  checked={device.isOn}
                  onChange={() => toggleDevice(device.id, !device.isOn)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
            
            {device.features?.brightness && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Brightness</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={device.brightness || 100}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                  disabled={!device.isOn}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-secondary-500">0%</span>
                  <span className="text-xs text-secondary-500">100%</span>
                </div>
              </div>
            )}
            
            {device.features?.colorTemperature && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">Color Temperature</h3>
                <input
                  type="range"
                  min="2700"
                  max="6500"
                  value={device.colorTemperature || 4000}
                  className="w-full h-2 bg-gradient-to-r from-warning-300 to-primary-300 rounded-lg appearance-none cursor-pointer"
                  disabled={!device.isOn}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-secondary-500">Warm</span>
                  <span className="text-xs text-secondary-500">Cool</span>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'thermostat':
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Power</h3>
              <label className="switch">
                <input
                  type="checkbox"
                  className="switch-input"
                  checked={device.isOn}
                  onChange={() => toggleDevice(device.id, !device.isOn)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Temperature</h3>
              <div className="flex items-center justify-center">
                <button
                  className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center"
                  disabled={!device.isOn}
                >
                  -
                </button>
                <div className="mx-6 text-4xl font-semibold text-secondary-900">
                  {device.currentValue || 72}°
                </div>
                <button
                  className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center"
                  disabled={!device.isOn}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Mode</h3>
              <div className="flex space-x-2">
                <button
                  className={`flex-1 py-2 rounded-lg ${device.mode === 'heat' ? 'bg-warning-100 text-warning-700' : 'bg-secondary-100 text-secondary-600'}`}
                  disabled={!device.isOn}
                >
                  Heat
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg ${device.mode === 'cool' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'}`}
                  disabled={!device.isOn}
                >
                  Cool
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg ${device.mode === 'auto' ? 'bg-success-100 text-success-700' : 'bg-secondary-100 text-secondary-600'}`}
                  disabled={!device.isOn}
                >
                  Auto
                </button>
              </div>
            </div>
          </div>
        )
      
      case 'lock':
        return (
          <div>
            <div className="flex flex-col items-center justify-center py-6">
              <button
                onClick={() => toggleDevice(device.id, !device.isOn)}
                className={`w-24 h-24 rounded-full ${device.isOn ? 'bg-success-100 text-success-600' : 'bg-danger-100 text-danger-600'} flex items-center justify-center mb-4`}
              >
                {device.isOn ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <p className="text-lg font-medium text-secondary-900">
                {device.isOn ? 'Locked' : 'Unlocked'}
              </p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Access History</h3>
              <div className="bg-secondary-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Locked</p>
                      <p className="text-xs text-secondary-500">By: You</p>
                    </div>
                    <p className="text-xs text-secondary-500">Today, 3:45 PM</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Unlocked</p>
                      <p className="text-xs text-secondary-500">By: You</p>
                    </div>
                    <p className="text-xs text-secondary-500">Today, 8:30 AM</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Locked</p>
                      <p className="text-xs text-secondary-500">By: Auto Schedule</p>
                    </div>
                    <p className="text-xs text-secondary-500">Yesterday, 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary-700 mb-2">Power</h3>
              <label className="switch">
                <input
                  type="checkbox"
                  className="switch-input"
                  checked={device.isOn}
                  onChange={() => toggleDevice(device.id, !device.isOn)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-4">
              <p className="text-sm text-secondary-600">
                Basic controls available. Additional features may be available in the device's native app.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/devices')}
          className="p-2 rounded-full hover:bg-secondary-100 mr-2"
        >
          <MdArrowBack size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-secondary-900">{device.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Device info */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full ${getBackgroundColor()} flex items-center justify-center mb-4 ${getIconColor()}`}>
                {getDeviceIcon()}
              </div>
              
              <h2 className="text-xl font-semibold text-secondary-900 mb-1">{device.name}</h2>
              <p className="text-secondary-500 mb-4">{device.room}</p>
              
              <div className="flex items-center mb-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor()} mr-2`}></div>
                <span className="text-sm">
                  {device.status === 'error' ? 'Error' : 
                   device.status === 'warning' ? 'Warning' : 
                   device.isOn ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => favoriteDevice(device.id, !device.isFavorite)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title={device.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {device.isFavorite ? (
                    <MdStar className="text-warning-500" size={20} />
                  ) : (
                    <MdStarOutline className="text-secondary-400" size={20} />
                  )}
                </button>
                
                <button
                  onClick={() => navigate(`/devices/edit/${device.id}`)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title="Edit device"
                >
                  <MdEdit className="text-secondary-500" size={20} />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-full hover:bg-secondary-100"
                  title="Delete device"
                >
                  <MdDelete className="text-secondary-500" size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-secondary-100">
              <h3 className="text-sm font-medium text-secondary-700 mb-3">Device Info</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Type</span>
                  <span className="text-sm font-medium">{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Model</span>
                  <span className="text-sm font-medium">{device.model || 'Unknown'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Manufacturer</span>
                  <span className="text-sm font-medium">{device.manufacturer || 'Unknown'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Firmware</span>
                  <span className="text-sm font-medium">{device.firmware || 'Unknown'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Last Updated</span>
                  <span className="text-sm font-medium">{device.lastUpdated || 'Unknown'}</span>
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
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'controls' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                onClick={() => setActiveTab('controls')}
              >
                <MdPower className="inline mr-1" size={18} />
                Controls
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
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'notifications' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <MdNotifications className="inline mr-1" size={18} />
                Notifications
              </button>
            </div>
            
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'controls' && renderControls()}
              {activeTab === 'history' && <DeviceHistory device={device} />}
              {activeTab === 'settings' && <DeviceSettings device={device} />}
              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-sm font-medium text-secondary-700 mb-3">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Status Change Alerts</p>
                        <p className="text-sm text-secondary-500">Get notified when device goes online or offline</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" className="switch-input" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Power Usage Alerts</p>
                        <p className="text-sm text-secondary-500">Get notified about unusual power consumption</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" className="switch-input" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Firmware Updates</p>
                        <p className="text-sm text-secondary-500">Get notified when firmware updates are available</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" className="switch-input" defaultChecked />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                    
                    {device.type === 'lock' && (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Access Alerts</p>
                          <p className="text-sm text-secondary-500">Get notified when lock is accessed</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" className="switch-input" defaultChecked />
                          <span className="switch-slider"></span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-secondary-900 mb-3">Delete Device</h3>
            <p className="text-secondary-600 mb-6">
              Are you sure you want to delete "{device.name}"? This action cannot be undone.
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

export default DeviceDetails
