import { useState } from 'react'
import { MdInfo, MdCheck, MdClose } from 'react-icons/md'

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    deviceHistory: true,
    sessionTimeout: '30m',
    autoLock: true,
    biometricAuth: true,
    guestAccess: false
  })
  
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'iPhone 13',
      browser: 'Safari',
      location: 'San Francisco, CA',
      ip: '192.168.1.1',
      lastActive: 'Active now',
      current: true
    },
    {
      id: 2,
      device: 'MacBook Pro',
      browser: 'Chrome',
      location: 'San Francisco, CA',
      ip: '192.168.1.2',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: 3,
      device: 'iPad Air',
      browser: 'Safari',
      location: 'New York, NY',
      ip: '192.168.1.3',
      lastActive: '3 days ago',
      current: false
    }
  ])
  
  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    })
  }
  
  const handleChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    })
  }
  
  const terminateSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id))
  }
  
  const terminateAllSessions = () => {
    setSessions(sessions.filter(session => session.current))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Account Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-secondary-500">Add an extra layer of security to your account</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          {settings.twoFactorAuth && (
            <div className="ml-6 mt-2 p-4 bg-secondary-50 rounded-lg">
              <h4 className="font-medium text-secondary-900 mb-2">Setup Two-Factor Authentication</h4>
              <p className="text-sm text-secondary-600 mb-3">
                Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
              </p>
              <button className="btn btn-primary">
                Set Up Two-Factor Authentication
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login Notifications</p>
              <p className="text-sm text-secondary-500">Receive alerts when someone logs into your account</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.loginNotifications}
                onChange={() => handleToggle('loginNotifications')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Device History</p>
              <p className="text-sm text-secondary-500">Keep track of devices that have logged into your account</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.deviceHistory}
                onChange={() => handleToggle('deviceHistory')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Session Timeout
            </label>
            <select
              className="input"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', e.target.value)}
            >
              <option value="15m">15 minutes</option>
              <option value="30m">30 minutes</option>
              <option value="1h">1 hour</option>
              <option value="4h">4 hours</option>
              <option value="1d">1 day</option>
              <option value="never">Never</option>
            </select>
            <p className="mt-1 text-xs text-secondary-500">
              Your account will be logged out after this period of inactivity
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Device Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-Lock Devices</p>
              <p className="text-sm text-secondary-500">Automatically lock devices after a period of inactivity</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.autoLock}
                onChange={() => handleToggle('autoLock')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Biometric Authentication</p>
              <p className="text-sm text-secondary-500">Use fingerprint or face recognition to access the app</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.biometricAuth}
                onChange={() => handleToggle('biometricAuth')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Guest Access</p>
              <p className="text-sm text-secondary-500">Allow temporary access to guests without sharing your password</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="switch-input"
                checked={settings.guestAccess}
                onChange={() => handleToggle('guestAccess')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>
          
          {settings.guestAccess && (
            <div className="ml-6 mt-2 p-4 bg-secondary-50 rounded-lg">
              <h4 className="font-medium text-secondary-900 mb-2">Guest Access Settings</h4>
              <p className="text-sm text-secondary-600 mb-3">
                Create temporary access codes for guests that expire after a set period.
              </p>
              <button className="btn btn-primary">
                Manage Guest Access
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-secondary-900">Active Sessions</h3>
          
          <button
            onClick={terminateAllSessions}
            className="text-sm text-danger-600 hover:text-danger-800 font-medium"
            disabled={sessions.length <= 1}
          >
            Sign Out All Other Devices
          </button>
        </div>
        
        <div className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="font-medium text-secondary-900">{session.device}</p>
                    {session.current && (
                      <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex text-xs text-secondary-500 mt-1">
                    <p>{session.browser}</p>
                    <span className="mx-1">•</span>
                    <p>{session.location}</p>
                    <span className="mx-1">•</span>
                    <p>{session.lastActive}</p>
                  </div>
                </div>
              </div>
              
              {!session.current && (
                <button
                  onClick={() => terminateSession(session.id)}
                  className="text-sm text-secondary-600 hover:text-secondary-900"
                >
                  Sign Out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Security Recommendations</h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex">
              <MdCheck className="text-success-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-success-800">Strong Password</h4>
                <p className="mt-1 text-xs text-success-700">
                  Your password is strong and unique. Keep it up!
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex">
              <MdInfo className="text-warning-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-warning-800">Enable Two-Factor Authentication</h4>
                <p className="mt-1 text-xs text-warning-700">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button 
                  className="mt-2 text-xs font-medium text-warning-800 hover:text-warning-900"
                  onClick={() => handleToggle('twoFactorAuth')}
                >
                  Enable Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <div className="flex">
              <MdClose className="text-danger-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-danger-800">Unusual Login Detected</h4>
                <p className="mt-1 text-xs text-danger-700">
                  We detected a login from an unusual location. If this wasn't you, please secure your account.
                </p>
                <button className="mt-2 text-xs font-medium text-danger-800 hover:text-danger-900">
                  Review Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings
