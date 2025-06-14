import { create } from 'zustand'

export const useRoomStore = create((set, get) => ({
  rooms: [
    {
      id: '1',
      name: 'Living Room',
      type: 'living',
      deviceCount: 3,
      activeDevices: 2,
      temperature: 72,
      humidity: 45,
      isFavorite: true,
      floor: '1'
    },
    {
      id: '2',
      name: 'Kitchen',
      type: 'kitchen',
      deviceCount: 2,
      activeDevices: 0,
      temperature: 74,
      humidity: 50,
      isFavorite: false,
      floor: '1'
    },
    {
      id: '3',
      name: 'Bedroom',
      type: 'bedroom',
      deviceCount: 2,
      activeDevices: 1,
      temperature: 70,
      humidity: 40,
      isFavorite: true,
      floor: '2'
    },
    {
      id: '4',
      name: 'Bathroom',
      type: 'bathroom',
      deviceCount: 1,
      activeDevices: 0,
      temperature: 73,
      humidity: 60,
      isFavorite: false,
      floor: '2'
    },
    {
      id: '5',
      name: 'Office',
      type: 'office',
      deviceCount: 1,
      activeDevices: 0,
      temperature: 71,
      humidity: 45,
      isFavorite: false,
      floor: '1'
    },
    {
      id: '6',
      name: 'Garage',
      type: 'other',
      deviceCount: 1,
      activeDevices: 1,
      temperature: 68,
      humidity: 55,
      isFavorite: false,
      floor: '1'
    }
  ],
  
  // Fetch rooms
  fetchRooms: async () => {
    try {
      // In a real app, this would make an API call to fetch rooms
      // For demo purposes, we're using the mock data above
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return the rooms (already in state)
      return get().rooms
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
      return []
    }
  },
  
  // Toggle room favorite status
  favoriteRoom: (id, isFavorite) => {
    set(state => ({
      rooms: state.rooms.map(room => 
        room.id === id 
          ? { ...room, isFavorite } 
          : room
      )
    }))
  },
  
  // Add room
  addRoom: (room) => {
    set(state => ({
      rooms: [...state.rooms, { ...room, id: Date.now().toString() }]
    }))
  },
  
  // Update room
  updateRoom: (id, updates) => {
    set(state => ({
      rooms: state.rooms.map(room => 
        room.id === id 
          ? { ...room, ...updates } 
          : room
      )
    }))
  },
  
  // Remove room
  removeRoom: (id) => {
    set(state => ({
      rooms: state.rooms.filter(room => room.id !== id)
    }))
  }
}))
