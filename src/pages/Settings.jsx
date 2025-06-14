import { useState } from 'react'
import GeneralSettings from '../components/settings/GeneralSettings'
import AccountSettings from '../components/settings/AccountSettings'
import IntegrationsSettings from '../components/settings/IntegrationsSettings'
import SecuritySettings from '../components/settings/SecuritySettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-secondary-900">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-secondary-200">
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'general' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'account' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'integrations' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
            onClick={() => setActiveTab('integrations')}
          >
            Integrations
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'security' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'integrations' && <IntegrationsSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  )
}

export default Settings
