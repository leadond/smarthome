import { useState } from 'react'
import { MdLightbulb, MdThermostat, MdLock, MdPower, MdWifi, MdWarning } from 'react-icons/md'
import { useDeviceStore } from '../../stores/deviceStore'
import { useEnergyStore } from '../../stores/energyStore'

const StatusOverview = () => {
  const { devices } = useDeviceStore()
  const { currentUsage, dailyUsage } = useEnergyStore()
  
  // Count active devices by type
  const lightsOn = devices.filter(d => d.type === 'light' && d.isOn).length
  const totalLights = devices.filter(d => d.type === 'light').length
  
  const locksLocked = devices.filter(d => d.type === 'lock' && d.isOn).length
  const totalLocks = devices.filter(d => d.type === 'lock').length
  
  const thermostatsOn = devices.filter(d => d.type === 'thermostat' && d.isOn).length
  const totalThermostats = devices.filter(d => d.type === 'thermostat').length
  
  // Count devices with issues
  const devicesWithIssues = devices.filter(d => d.status === 'warning' || d.status === 'error').length
  
  // Calculate average temperature from thermostats
  const thermostats = devices.filter(d => d.type === 'thermostat')
  const avgTemp = thermostats.length > 0 
    ? Math.round(thermostats.reduce((sum, t) => sum + (t.currentValue || 0), 0) / thermostats.length) 
    : null

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* Lights status */}
      <div className="card">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lightsOn > 0 ? 'bg-warning-100 text-warning-600' : 'bg-secondary-100 text-secondary-400'}`}>
            <MdLightbulb size={20} />
          </div>
          <div className="ml-3">
            <p className="text-xs text-secondary-500">Lights</p>
            <p className="text-lg font-semibold text-secondary-900">
              {lightsOn} / {totalLights}
            </p>
          </div>
        </div>
      </div>
      
      {/* Locks status */}
      <div className="card">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${locksLocked === totalLocks ? 'bg-success-100 text-success-600' : 'bg-warning-100 text-warning-600'}`}>
            <MdLock size={20} />
          </div>
          <div className="ml-3">
            <p className="text-xs text-secondary-500">Locks</p>
            <p className="text-lg font-semibold text-secondary-900">
              {locksLocked} / {totalLocks}
            </p>
          </div>
        </div>
      </div>
      
      {/* Temperature */}
      <div className="card">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
            <MdThermostat size={20} />
          </div>
          <div className="ml-3">
            <p className="text-xs text-secondary-500">Temperature</p>
            <p className="text-lg font-semibold text-secondary-900">
              {avgTemp !== null ? `${avgTemp}°` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Energy usage */}
      <div className="card">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center">
            <MdPower size={20} />
          </div>
          <div className="ml-3">
            <p className="text-xs text-secondary-500">Energy</p>
            <p className="text-lg font-semibold text-secondary-900">
              {currentUsage} kWh
            </p>
          </div>
        </div>
      </div>
      
      {/* Network status */}
      <div className="card">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-success-100 text-success-600 flex items-center justify-center">
            <MdWifi size={20} />
          </div>
          <div className="ml-3">
            <p className="text-xs text-secondary-500">Network</p>
            <p className="text-lg font-semibold text-secondary-900">
              Online
            </p>
          </div>
        </div>
      </div>
      
      {/* Issues */}
      <div className="card">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${devicesWithIssues > 0 ? 'bg-danger-100 text-danger-600' : 'bg-success-100 text-success-600'}`}>
            <MdWarning size={20} />
          </div>
          <div className="ml-3">
            <p className="text-xs text-secondary-500">Issues</p>
            <p className="text-lg font-semibold text-secondary-900">
              {devicesWithIssues}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusOverview
