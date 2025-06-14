import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const DeviceHistory = ({ device }) => {
  const [timeRange, setTimeRange] = useState('day') // 'day', 'week', 'month'
  
  // Mock data for device history
  const generateMockData = () => {
    const labels = []
    const data = []
    
    if (timeRange === 'day') {
      // Generate hourly data for the day
      for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`)
        
        if (device.type === 'light') {
          // For lights, show on/off status (1 or 0)
          data.push(Math.random() > 0.5 ? 1 : 0)
        } else if (device.type === 'thermostat') {
          // For thermostats, show temperature between 65-75
          data.push(Math.floor(Math.random() * 10) + 65)
        } else if (device.type === 'lock') {
          // For locks, show locked/unlocked status (1 or 0)
          data.push(Math.random() > 0.7 ? 1 : 0)
        } else {
          // For other devices, show generic usage data
          data.push(Math.floor(Math.random() * 100))
        }
      }
    } else if (timeRange === 'week') {
      // Generate daily data for the week
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      for (let i = 0; i < 7; i++) {
        labels.push(days[i])
        
        if (device.type === 'light') {
          // For lights, show average hours on per day (0-24)
          data.push(Math.floor(Math.random() * 12))
        } else if (device.type === 'thermostat') {
          // For thermostats, show average temperature
          data.push(Math.floor(Math.random() * 10) + 65)
        } else if (device.type === 'lock') {
          // For locks, show number of lock/unlock events
          data.push(Math.floor(Math.random() * 10))
        } else {
          // For other devices, show generic usage data
          data.push(Math.floor(Math.random() * 100))
        }
      }
    } else if (timeRange === 'month') {
      // Generate weekly data for the month
      for (let i = 1; i <= 4; i++) {
        labels.push(`Week ${i}`)
        
        if (device.type === 'light') {
          // For lights, show average hours on per week
          data.push(Math.floor(Math.random() * 80) + 20)
        } else if (device.type === 'thermostat') {
          // For thermostats, show average temperature
          data.push(Math.floor(Math.random() * 10) + 65)
        } else if (device.type === 'lock') {
          // For locks, show number of lock/unlock events
          data.push(Math.floor(Math.random() * 30) + 10)
        } else {
          // For other devices, show generic usage data
          data.push(Math.floor(Math.random() * 100))
        }
      }
    }
    
    return { labels, data }
  }
  
  const { labels, data } = generateMockData()
  
  const getChartLabel = () => {
    if (device.type === 'light') {
      return timeRange === 'day' ? 'On/Off Status' : 'Hours On'
    } else if (device.type === 'thermostat') {
      return 'Temperature (°F)'
    } else if (device.type === 'lock') {
      return timeRange === 'day' ? 'Lock Status' : 'Lock/Unlock Events'
    } else {
      return 'Usage'
    }
  }
  
  const chartData = {
    labels,
    datasets: [
      {
        label: getChartLabel(),
        data,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y
            
            if (device.type === 'light') {
              if (timeRange === 'day') {
                return value === 1 ? 'On' : 'Off'
              } else {
                return `${value} hours`
              }
            } else if (device.type === 'thermostat') {
              return `${value}°F`
            } else if (device.type === 'lock') {
              if (timeRange === 'day') {
                return value === 1 ? 'Locked' : 'Unlocked'
              } else {
                return `${value} events`
              }
            } else {
              return `${value}%`
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
          callback: function(value) {
            if (device.type === 'light' && timeRange === 'day') {
              return value === 1 ? 'On' : 'Off'
            } else if (device.type === 'thermostat') {
              return `${value}°F`
            } else if (device.type === 'lock' && timeRange === 'day') {
              return value === 1 ? 'Locked' : 'Unlocked'
            } else {
              return value
            }
          }
        }
      }
    }
  }
  
  // Generate event history
  const generateEventHistory = () => {
    const events = []
    const eventTypes = {
      light: ['Turned On', 'Turned Off', 'Brightness Changed'],
      thermostat: ['Temperature Changed', 'Mode Changed', 'Schedule Updated'],
      lock: ['Locked', 'Unlocked', 'Access Granted'],
      default: ['Status Changed', 'Settings Updated', 'Connected', 'Disconnected']
    }
    
    const deviceEvents = eventTypes[device.type] || eventTypes.default
    
    // Generate random events
    for (let i = 0; i < 10; i++) {
      const event = {
        id: i,
        type: deviceEvents[Math.floor(Math.random() * deviceEvents.length)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toLocaleString(),
        user: Math.random() > 0.7 ? 'System' : 'You'
      }
      events.push(event)
    }
    
    // Sort by timestamp (newest first)
    return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }
  
  const eventHistory = generateEventHistory()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondary-700">Usage History</h3>
        
        <div className="flex">
          <button
            className={`px-3 py-1 text-sm rounded-l-lg ${timeRange === 'day' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setTimeRange('day')}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 text-sm ${timeRange === 'week' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-r-lg ${timeRange === 'month' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="h-64 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      
      <h3 className="text-sm font-medium text-secondary-700 mb-3">Event History</h3>
      
      <div className="bg-secondary-50 rounded-lg overflow-hidden">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-100">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  User
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-100">
              {eventHistory.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">{event.type}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-secondary-500">{event.timestamp}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-secondary-500">{event.user}</div>
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

export default DeviceHistory
