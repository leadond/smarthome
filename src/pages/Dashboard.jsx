import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdDevicesOther, MdMeetingRoom, MdAutoAwesome, MdBolt } from 'react-icons/md'
import { Link } from 'react-router-dom'

// Mock data for dashboard
const mockData = {
  quickStats: [
    { id: 'devices', label: 'Active Devices', value: 12, icon: <MdDevicesOther size={24} />, color: 'bg-primary-500', link: '/devices' },
    { id: 'rooms', label: 'Rooms', value: 5, icon: <MdMeetingRoom size={24} />, color: 'bg-secondary-500', link: '/rooms' },
    { id: 'routines', label: 'Routines', value: 8, icon: <MdAutoAwesome size={24} />, color: 'bg-warning-500', link: '/routines' },
    { id: 'energy', label: 'Energy Saved', value: '15%', icon: <MdBolt size={24} />, color: 'bg-success-500', link: '/energy' }
  ],
  recentActivity: [
    { id: 1, device: 'Living Room Lights', action: 'Turned On', time: '2 minutes ago', icon: '💡' },
    { id: 2, device: 'Thermostat', action: 'Temperature set to 72°F', time: '15 minutes ago', icon: '🌡️' },
    { id: 3, device: 'Front Door', action: 'Locked', time: '1 hour ago', icon: '🔒' },
    { id: 4, device: 'Kitchen TV', action: 'Turned Off', time: '3 hours ago', icon: '📺' }
  ],
  favoriteDevices: [
    { id: 'device-1', name: 'Living Room Lights', type: 'Light', status: 'On', icon: '💡' },
    { id: 'device-2', name: 'Thermostat', type: 'Climate', status: 'On', icon: '🌡️' },
    { id: 'device-3', name: 'Front Door Lock', type: 'Security', status: 'Locked', icon: '🔒' },
    { id: 'device-4', name: 'Kitchen TV', type: 'Entertainment', status: 'Off', icon: '📺' }
  ]
}

const Dashboard = () => {
  const [data, setData] = useState(mockData)
  const [greeting, setGreeting] = useState('')
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
    
    // In a real app, we would fetch real data here
  }, [])
  
  const toggleDeviceStatus = (deviceId) => {
    setData(prevData => {
      const updatedDevices = prevData.favoriteDevices.map(device => {
        if (device.id === deviceId) {
          const newStatus = device.status === 'On' ? 'Off' : 'On'
          return { ...device, status: newStatus }
        }
        return device
      })
      
      return {
        ...prevData,
        favoriteDevices: updatedDevices
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">{greeting}, Demo User</h1>
        <p className="text-secondary-600 mt-1">Here's what's happening in your smart home today.</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {data.quickStats.map(stat => (
          <Link 
            key={stat.id}
            to={stat.link}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className={`${stat.color} text-white p-2 rounded-lg inline-flex mb-3`}>
              {stat.icon}
            </div>
            <p className="text-secondary-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Favorite Devices */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-secondary-900">Favorite Devices</h2>
            <Link to="/devices" className="text-primary-600 text-sm font-medium hover:text-primary-700">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {data.favoriteDevices.map(device => (
              <div key={device.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{device.icon}</span>
                  <div>
                    <h3 className="font-medium text-secondary-900">{device.name}</h3>
                    <p className="text-sm text-secondary-500">{device.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleDeviceStatus(device.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    device.status === 'On' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-secondary-100 text-secondary-600'
                  }`}
                >
                  {device.status}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-secondary-900">Recent Activity</h2>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
              Clear All
            </button>
          </div>
          
          <div className="space-y-4">
            {data.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start p-3 border-b border-secondary-100 last:border-0">
                <span className="text-2xl mr-3 mt-1">{activity.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{activity.device}</h3>
                  <p className="text-sm text-secondary-600">{activity.action}</p>
                  <p className="text-xs text-secondary-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard
