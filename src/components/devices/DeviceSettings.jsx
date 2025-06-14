import { useState } from 'react'
import { MdInfo } from 'react-icons/md'

const DeviceSettings = ({ device }) => {
  const [advancedMode, setAdvancedMode] = useState(false)
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondary-700">Device Settings</h3>
        
        <label className="flex items-center">
          <span className="text-sm text-secondary-600 mr-2">Advanced Mode</span>
          <input
            type="checkbox"
            className="switch-input"
            checked={advancedMode}
            onChange={() => setAdvancedMode(!advancedMode)}
          />
          <span className="switch-slider"></span>
        </label>
      </div>
      
      {/* Basic settings */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Device Name
          </label>
          <input
            type="text"
            className="input"
            defaultValue={device.name}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Room
          </label>
          <select className="input">
            <option value={device.room}>{device.room}</option>
            <option value="Living Room">Living Room</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Office">Office</option>
            <option value="Garage">Garage</option>
          </select>
        </div>
        
        {device.type === 'light' && (
          <>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Default Brightness
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue={device.defaultBrightness || 100}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-secondary-500">0%</span>
                <span className="text-xs text-secondary-500">100%</span>
              </div>
            </div>
            
            {device.features?.colorTemperature && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Default Color Temperature
                </label>
                <input
                  type="range"
                  min="2700"
                  max="6500"
                  defaultValue={device.defaultColorTemperature || 4000}
                  className="w-full h-2 bg-gradient-to-r from-warning-300 to-primary-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-secondary-500">Warm (2700K)</span>
                  <span className="text-xs text-secondary-500">Cool (6500K)</span>
                </div>
              </div>
            )}
          </>
        )}
        
        {device.type === 'thermostat' && (
          <>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Default Temperature
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="input"
                  defaultValue={device.defaultTemperature || 72}
                  min="60"
                  max="90"
                />
                <span className="ml-2">°F</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Default Mode
              </label>
              <select className="input" defaultValue={device.defaultMode || 'auto'}>
                <option value="heat">Heat</option>
                <option value="cool">Cool</option>
                <option value="auto">Auto</option>
                <option value="off">Off</option>
              </select>
            </div>
          </>
        )}
        
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Auto-Off Timer
          </label>
          <select className="input" defaultValue={device.autoOffTimer || 'never'}>
            <option value="never">Never</option>
            <option value="30m">30 minutes</option>
            <option value="1h">1 hour</option>
            <option value="2h">2 hours</option>
            <option value="4h">4 hours</option>
            <option value="8h">8 hours</option>
          </select>
        </div>
      </div>
      
      {/* Advanced settings */}
      {advancedMode && (
        <div className="mt-8 pt-6 border-t border-secondary-200">
          <h3 className="text-sm font-medium text-secondary-700 mb-4">Advanced Settings</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Device ID
              </label>
              <input
                type="text"
                className="input bg-secondary-50"
                value={device.id}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                IP Address
              </label>
              <input
                type="text"
                className="input"
                defaultValue={device.ipAddress || '192.168.1.100'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                MAC Address
              </label>
              <input
                type="text"
                className="input bg-secondary-50"
                value={device.macAddress || 'AA:BB:CC:DD:EE:FF'}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Connection Type
              </label>
              <select className="input" defaultValue={device.connectionType || 'wifi'}>
                <option value="wifi">Wi-Fi</option>
                <option value="zigbee">Zigbee</option>
                <option value="zwave">Z-Wave</option>
                <option value="bluetooth">Bluetooth</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Polling Interval
              </label>
              <select className="input" defaultValue={device.pollingInterval || '60s'}>
                <option value="10s">10 seconds</option>
                <option value="30s">30 seconds</option>
                <option value="60s">1 minute</option>
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
              </select>
            </div>
            
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <div className="flex">
                <MdInfo className="text-warning-500 flex-shrink-0 mt-0.5" size={20} />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-warning-800">Caution</h4>
                  <p className="mt-1 text-sm text-warning-700">
                    Changing advanced settings may affect device performance or connectivity. 
                    Only modify these settings if you understand the implications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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

export default DeviceSettings
