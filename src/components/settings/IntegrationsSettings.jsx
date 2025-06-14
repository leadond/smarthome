import { useState } from 'react'
import { MdCheck, MdClose, MdRefresh, MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const IntegrationsSettings = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'philips-hue',
      name: 'Philips Hue',
      description: 'Control your Philips Hue smart lights',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'connected',
      devices: 8,
      lastSync: '2023-10-15T14:32:00Z'
    },
    {
      id: 'nest',
      name: 'Google Nest',
      description: 'Manage your Nest thermostats and cameras',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'connected',
      devices: 3,
      lastSync: '2023-10-14T09:15:00Z'
    },
    {
      id: 'sonos',
      name: 'Sonos',
      description: 'Control your Sonos speakers and audio system',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'disconnected',
      devices: 0,
      lastSync: null
    },
    {
      id: 'ring',
      name: 'Ring',
      description: 'Manage your Ring doorbells and cameras',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'connected',
      devices: 2,
      lastSync: '2023-10-12T18:45:00Z'
    },
    {
      id: 'ecobee',
      name: 'ecobee',
      description: 'Control your ecobee thermostats and sensors',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'disconnected',
      devices: 0,
      lastSync: null
    },
    {
      id: 'smartthings',
      name: 'Samsung SmartThings',
      description: 'Connect with your SmartThings ecosystem',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'connected',
      devices: 5,
      lastSync: '2023-10-13T11:20:00Z'
    },
    {
      id: 'wemo',
      name: 'Belkin WeMo',
      description: 'Control your WeMo smart plugs and switches',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'disconnected',
      devices: 0,
      lastSync: null
    },
    {
      id: 'lutron',
      name: 'Lutron Caséta',
      description: 'Manage your Lutron lighting and shades',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'connected',
      devices: 6,
      lastSync: '2023-10-10T15:30:00Z'
    }
  ])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // 'all', 'connected', 'disconnected'
  
  // Format date
  const formatLastSync = (dateString) => {
    if (!dateString) return 'Never'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }
  
  // Filter integrations based on search query and filter
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || integration.status === filter
    
    return matchesSearch && matchesFilter
  })
  
  // Toggle integration connection status
  const toggleConnection = (id) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newStatus = integration.status === 'connected' ? 'disconnected' : 'connected'
        const newDevices = newStatus === 'connected' ? (integration.status === 'connected' ? integration.devices : Math.floor(Math.random() * 5) + 1) : 0
        const newLastSync = newStatus === 'connected' ? new Date().toISOString() : null
        
        return {
          ...integration,
          status: newStatus,
          devices: newDevices,
          lastSync: newLastSync
        }
      }
      return integration
    }))
  }
  
  // Refresh integration
  const refreshIntegration = (id) => {
    // In a real app, this would trigger a re-sync with the integration's API
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        return {
          ...integration,
          lastSync: new Date().toISOString()
        }
      }
      return integration
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search integrations..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex">
          <button
            className={`px-3 py-1 text-sm rounded-l-lg ${filter === 'all' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm ${filter === 'connected' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setFilter('connected')}
          >
            Connected
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-r-lg ${filter === 'disconnected' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setFilter('disconnected')}
          >
            Disconnected
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-secondary-900">Your Integrations</h3>
        <Link 
          to="/account-setup"
          className="flex items-center px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <MdAdd size={18} className="mr-1" />
          Add Integration
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map(integration => (
          <div 
            key={integration.id}
            className="border border-secondary-200 rounded-lg p-4 hover:border-primary-200 hover:shadow-sm transition-all"
          >
            <div className="flex">
              <img 
                src={integration.icon} 
                alt={integration.name} 
                className="w-12 h-12 rounded-lg object-cover"
              />
              
              <div className="ml-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-secondary-900">{integration.name}</h3>
                    <p className="text-sm text-secondary-500">{integration.description}</p>
                  </div>
                  
                  <div className="flex items-center">
                    {integration.status === 'connected' && (
                      <span className="flex items-center text-xs text-success-700 bg-success-50 px-2 py-1 rounded-full mr-2">
                        <MdCheck size={14} className="mr-1" />
                        Connected
                      </span>
                    )}
                    
                    {integration.status === 'disconnected' && (
                      <span className="flex items-center text-xs text-secondary-700 bg-secondary-100 px-2 py-1 rounded-full mr-2">
                        <MdClose size={14} className="mr-1" />
                        Disconnected
                      </span>
                    )}
                  </div>
                </div>
                
                {integration.status === 'connected' && (
                  <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-secondary-500">
                    <p>{integration.devices} device{integration.devices !== 1 ? 's' : ''} connected</p>
                    <p>Last sync: {formatLastSync(integration.lastSync)}</p>
                  </div>
                )}
                
                <div className="mt-3 flex space-x-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Link
                        to={`/account-setup?platform=${integration.id}`}
                        className="px-3 py-1 text-xs rounded-full bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50 flex items-center"
                      >
                        Manage
                      </Link>
                      <button
                        onClick={() => refreshIntegration(integration.id)}
                        className="px-3 py-1 text-xs rounded-full bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50 flex items-center"
                      >
                        <MdRefresh size={14} className="mr-1" />
                        Refresh
                      </button>
                      <button
                        onClick={() => toggleConnection(integration.id)}
                        className="px-3 py-1 text-xs rounded-full bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <Link
                      to={`/account-setup?platform=${integration.id}`}
                      className="px-3 py-1 text-xs rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200"
                    >
                      Connect
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-secondary-900">No integrations found</h3>
          <p className="mt-2 text-secondary-500">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Add your first integration to get started'}
          </p>
          <Link 
            to="/account-setup"
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <MdAdd size={18} className="mr-1" />
            Add Integration
          </Link>
        </div>
      )}
      
      <div className="bg-secondary-50 rounded-lg p-4 mt-6">
        <h3 className="font-medium text-secondary-900 mb-2">Can't find your device?</h3>
        <p className="text-sm text-secondary-600 mb-3">
          We're constantly adding support for new smart home devices and platforms.
          If you don't see your device listed, let us know and we'll work on adding support.
        </p>
        <button className="btn btn-primary">
          Request Integration
        </button>
      </div>
    </div>
  )
}

export default IntegrationsSettings
