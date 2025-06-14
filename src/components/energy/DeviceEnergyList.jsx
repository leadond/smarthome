import { useState } from 'react'
import { MdFilterList, MdSearch, MdPower, MdSort } from 'react-icons/md'
import { useDeviceStore } from '../../stores/deviceStore'
import { useEnergyStore } from '../../stores/energyStore'

const DeviceEnergyList = () => {
  const { devices } = useDeviceStore()
  const { deviceEnergy } = useEnergyStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('usage') // 'usage', 'name'
  const [sortOrder, setSortOrder] = useState('desc') // 'asc', 'desc'
  const [showFilters, setShowFilters] = useState(false)
  const [filterType, setFilterType] = useState('all')
  
  // Get unique device types for filters
  const deviceTypes = ['all', ...new Set(devices.map(device => device.type))]
  
  // Combine devices with energy data
  const devicesWithEnergy = devices.map(device => {
    const energyData = deviceEnergy.find(d => d.deviceId === device.id) || { usage: 0, cost: 0 }
    return {
      ...device,
      energy: energyData.usage,
      cost: energyData.cost
    }
  })
  
  // Filter and sort devices
  const filteredDevices = devicesWithEnergy
    .filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            device.room.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === 'all' || device.type === filterType
      
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'usage') {
        return sortOrder === 'desc' ? b.energy - a.energy : a.energy - b.energy
      } else if (sortBy === 'name') {
        return sortOrder === 'desc' 
          ? b.name.localeCompare(a.name) 
          : a.name.localeCompare(b.name)
      }
      return 0
    })
  
  // Calculate total energy usage and cost
  const totalEnergy = filteredDevices.reduce((sum, device) => sum + device.energy, 0)
  const totalCost = filteredDevices.reduce((sum, device) => sum + device.cost, 0)
  
  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-secondary-900">Device Energy Usage</h2>
        
        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search devices..."
              className="input pl-10 w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MdSearch 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          >
            <MdFilterList size={20} className="mr-1" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="mb-4 p-4 bg-secondary-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Device Type
              </label>
              <select
                className="input"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {deviceTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Sort By
              </label>
              <div className="flex">
                <button
                  className={`flex-1 px-3 py-2 text-sm rounded-l-lg ${sortBy === 'usage' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-white text-secondary-600 border border-secondary-300'}`}
                  onClick={() => toggleSort('usage')}
                >
                  Energy Usage {sortBy === 'usage' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  className={`flex-1 px-3 py-2 text-sm rounded-r-lg ${sortBy === 'name' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-white text-secondary-600 border border-secondary-300'}`}
                  onClick={() => toggleSort('name')}
                >
                  Device Name {sortBy === 'name' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Total Energy Usage</p>
          <p className="text-2xl font-semibold text-secondary-900">{totalEnergy.toFixed(1)} kWh</p>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <p className="text-sm text-secondary-500">Total Estimated Cost</p>
          <p className="text-2xl font-semibold text-secondary-900">${totalCost.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Device list */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Device
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Room
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                <button 
                  className="flex items-center"
                  onClick={() => toggleSort('usage')}
                >
                  Energy Usage
                  <MdSort size={16} className="ml-1" />
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-100">
            {filteredDevices.map((device) => (
              <tr key={device.id} className="hover:bg-secondary-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${device.isOn ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-400'}`}>
                      <MdPower size={16} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-secondary-900">{device.name}</div>
                      <div className="text-xs text-secondary-500">{device.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-secondary-500">{device.room}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    device.isOn 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-secondary-100 text-secondary-800'
                  }`}>
                    {device.isOn ? 'On' : 'Off'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-secondary-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (device.energy / (Math.max(...filteredDevices.map(d => d.energy)) || 1)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-secondary-900">{device.energy.toFixed(1)} kWh</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-secondary-900">${device.cost.toFixed(2)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeviceEnergyList
