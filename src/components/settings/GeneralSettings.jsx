import { useState } from 'react'
import { MdInfo } from 'react-icons/md'

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    temperatureUnit: 'fahrenheit',
    timeFormat: '12h',
    notifications: true,
    soundEffects: true,
    autoUpdates: true,
    dataCollection: true,
    locationServices: true
  })
  
  const handleChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    })
  }
  
  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Appearance</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`border rounded-lg p-3 flex flex-col items-center ${
                  settings.theme === 'light' 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-secondary-200 hover:border-secondary-300'
                }`}
                onClick={() => handleChange('theme', 'light')}
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-secondary-200 mb-2"></div>
                <span className="text-sm">Light</span>
              </button>
              
              <button
                className={`border rounded-lg p-3 flex flex-col items-center ${
                  settings.theme === 'dark' 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-secondary-200 hover:border-secondary-300'
                }`}
                onClick={() => handleChange('theme', 'dark')}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary-800 border border-secondary-700 mb-2"></div>
                <span className="text-sm">Dark</span>
              </button>
              
              <button
                className={`border rounded-lg p-3 flex flex-col items-center ${
                  settings.theme === 'system' 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-secondary-200 hover:border-secondary-300'
                }`}
                onClick={() => handleChange('theme', 'system')}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-white to-secondary-800 border border-secondary-200 mb-2"></div>
                <span className="text-sm">System</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Language
            </label>
            <select
              className="input"
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Units & Format</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Temperature Unit
            </label>
            <div className="flex">
              <button
                className={`flex-1 px-3 py-2 text-sm rounded-l-lg ${
                  settings.temperatureUnit === 'celsius' 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'bg-white text-secondary-600 border border-secondary-300'
                }`}
                onClick={() => handleChange('temperatureUnit', 'celsius')}
              >
                Celsius (°C)
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm rounded-r-lg ${
                  settings.temperatureUnit === 'fahrenheit' 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'bg-white text-secondary-600 border border-secondary-300'
                }`}
                onClick={() => handleChange('temperatureUnit', 'fahrenheit')}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Time Format
            </label>
            <div className="flex">
              <button
                className={`flex-1 px-3 py-2 text-sm rounded-l-lg ${
                  settings.timeFormat === '12h' 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'bg-white text-secondary-600 border border-secondary-300'
                }`}
                onClick={() => handleChange('timeFormat', '12h')}
              >
                12-hour (1:30 PM)
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm rounded-r-lg ${
                  settings.timeFormat === '24h' 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'bg-white text-secondary-600 border border-secondary-300'
                }`}
                onClick={() => handleChange('timeFormat', '24h')}
              >
                24-hour (13:30)
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Notifications & Sounds</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-secondary-500">Receive alerts about device status and events</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound Effects</p>
              <p className="text-sm text-secondary-500">Play sounds when interacting with the app</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.soundEffects}
                onChange={() => handleToggle('soundEffects')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Privacy & Data</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Updates</p>
              <p className="text-sm text-secondary-500">Keep the app updated with the latest features</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.autoUpdates}
                onChange={() => handleToggle('autoUpdates')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Usage Data Collection</p>
              <p className="text-sm text-secondary-500">Help improve the app by sharing anonymous usage data</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.dataCollection}
                onChange={() => handleToggle('dataCollection')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Location Services</p>
              <p className="text-sm text-secondary-500">Enable location-based features and automations</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.locationServices}
                onChange={() => handleToggle('locationServices')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-4">
            <div className="flex">
              <MdInfo className="text-secondary-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-secondary-800">Privacy Information</h4>
                <p className="mt-1 text-sm text-secondary-600">
                  Your privacy is important to us. We only collect data that helps improve your experience.
                  You can review our full privacy policy to learn more about how we handle your data.
                </p>
                <a href="#" className="mt-2 inline-block text-sm text-primary-600 hover:text-primary-800">
                  View Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-secondary-200 flex justify-end space-x-3">
        <button className="btn btn-secondary">
          Reset to Defaults
        </button>
        <button className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default GeneralSettings
