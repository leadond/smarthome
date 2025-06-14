import { create } from 'zustand'
import { MdLightbulb, MdThermostat, MdLock, MdVideocam, MdSpeaker, MdPower } from 'react-icons/md'

export const useDeviceStore = create((set, get) => ({
  devices: [
    {
      id: '1',
      name: 'Living Room Lights',
      type: 'light',
      room: 'Living Room',
      isOn: true,
      isFavorite: true,
      brightness: 80,
      colorTemperature: 4000,
      features: {
        brightness: true,
        colorTemperature: true
      },
      status: 'online',
      lastUsed: new Date().toISOString(),
      manufacturer: 'Philips Hue',
      model: 'White and Color Ambiance',
      firmware: '1.53.2',
      lastUpdated: '2 days ago',
      aliases: ['main lights', 'living room']
    },
    {
      id: '2',
      name: 'Kitchen Lights',
      type: 'light',
      room: 'Kitchen',
      isOn: false,
      isFavorite: false,
      brightness: 100,
      features: {
        brightness: true
      },
      status: 'online',
      lastUsed: new Date(Date.now() - 3600000).toISOString(),
      manufacturer: 'LIFX',
      model: 'Mini White',
      firmware: '3.70',
      lastUpdated: '1 week ago',
      aliases: ['kitchen']
    },
    {
      id: '3',
      name: 'Bedroom Thermostat',
      type: 'thermostat',
      room: 'Bedroom',
      isOn: true,
      isFavorite: true,
      currentValue: 72,
      mode: 'cool',
      status: 'online',
      lastUsed: new Date(Date.now() - 7200000).toISOString(),
      manufacturer: 'Nest',
      model: 'Learning Thermostat',
      firmware: '6.1.2',
      lastUpdated: '3 days ago',
      aliases: ['thermostat', 'temperature']
    },
    {
      id: '4',
      name: 'Front Door Lock',
      type: 'lock',
      room: 'Entrance',
      isOn: true,
      isFavorite: true,
      status: 'online',
      lastUsed: new Date(Date.now() - 86400000).toISOString(),
      manufacturer: 'August',
      model: 'Smart Lock Pro',
      firmware: '2.4.0',
      lastUpdated: '5 days ago',
      aliases: ['front door', 'main door']
    },
    {
      id: '5',
      name: 'Living Room Camera',
      type: 'camera',
      room: 'Living Room',
      isOn: true,
      isFavorite: false,
      status: 'warning',
      lastUsed: new Date(Date.now() - 43200000).toISOString(),
      manufacturer: 'Ring',
      model: 'Indoor Cam',
      firmware: '1.9.8',
      lastUpdated: '1 day ago',
      aliases: ['living room cam', 'security camera']
    },
    {
      id: '6',
      name: 'Kitchen Speaker',
      type: 'speaker',
      room: 'Kitchen',
      isOn: false,
      isFavorite: false,
      volume: 60,
      status: 'online',
      lastUsed: new Date(Date.now() - 172800000).toISOString(),
      manufacturer: 'Sonos',
      model: 'One',
      firmware: '64.3',
      lastUpdated: '1 week ago',
      aliases: ['kitchen speaker', 'sonos']
    },
    {
      id: '7',
      name: 'Office Lights',
      type: 'light',
      room: 'Office',
      isOn: false,
      isFavorite: false,
      brightness: 90,
      colorTemperature: 5000,
      features: {
        brightness: true,
        colorTemperature: true
      },
      status: 'online',
      lastUsed: new Date(Date.now() - 259200000).toISOString(),
      manufacturer: 'Philips Hue',
      model: 'White and Color Ambiance',
      firmware: '1.53.2',
      lastUpdated: '4 days ago',
      aliases: ['office', 'work lights']
    },
    {
      id: '8',
      name: 'Bedroom Lights',
      type: 'light',
      room: 'Bedroom',
      isOn: false,
      isFavorite: false,
      brightness: 50,
      features: {
        brightness: true
      },
      status: 'online',
      lastUsed: new Date(Date.now() - 345600000).toISOString(),
      manufacturer: 'IKEA',
      model: 'TRÅDFRI',
      firmware: '2.3.86',
      lastUpdated: '2 weeks ago',
      aliases: ['bedroom', 'sleep lights']
    },
    {
      id: '9',
      name: 'Bathroom Outlet',
      type: 'outlet',
      room: 'Bathroom',
      isOn: false,
      isFavorite: false,
      status: 'error',
      lastUsed: new Date(Date.now() - 432000000).toISOString(),
      manufacturer: 'TP-Link',
      model: 'Kasa Smart Plug',
      firmware: '1.5.4',
      lastUpdated: '3 weeks ago',
      aliases: ['bathroom plug', 'smart plug']
    },
    {
      id: '10',
      name: 'Garage Door',
      type: 'lock',
      room: 'Garage',
      isOn: true,
      isFavorite: false,
      status: 'online',
      lastUsed: new Date(Date.now() - 518400000).toISOString(),
      manufacturer: 'Chamberlain',
      model: 'MyQ',
      firmware: '4.2.1',
      lastUpdated: '1 month ago',
      aliases: ['garage', 'car door']
    }
  ],
  
  // Fetch devices
  fetchDevices: async () => {
    try {
      // In a real app, this would make an API call to fetch devices
      // For demo purposes, we're using the mock data above
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return the devices (already in state)
      return get().devices
    } catch (error) {
      console.error('Failed to fetch devices:', error)
      return []
    }
  },
  
  // Toggle device on/off
  toggleDevice: (id, isOn) => {
    set(state => ({
      devices: state.devices.map(device => 
        device.id === id 
          ? { 
              ...device, 
              isOn, 
              lastUsed: new Date().toISOString() 
            } 
          : device
      )
    }))
  },
  
  // Toggle device favorite status
  favoriteDevice: (id, isFavorite) => {
    set(state => ({
      devices: state.devices.map(device => 
        device.id === id 
          ? { ...device, isFavorite } 
          : device
      )
    }))
  },
  
  // Add device
  addDevice: (device) => {
    set(state => ({
      devices: [...state.devices, { ...device, id: Date.now().toString() }]
    }))
  },
  
  // Update device
  updateDevice: (id, updates) => {
    set(state => ({
      devices: state.devices.map(device => 
        device.id === id 
          ? { ...device, ...updates } 
          : device
      )
    }))
  },
  
  // Remove device
  removeDevice: (id) => {
    set(state => ({
      devices: state.devices.filter(device => device.id !== id)
    }))
  }
}))
