import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuthenticated: true, // Set to true for demo purposes
  user: {
    id: '1',
    name: 'Demo User',
    email: 'demo@smarthomehub.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  
  // Login function
  login: async (email, password) => {
    try {
      // In a real app, this would make an API call to authenticate
      // For demo purposes, we'll just set isAuthenticated to true
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Set authentication state
      set({ 
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'Demo User',
          email: email || 'demo@smarthomehub.com',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
        }
      })
      
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  },
  
  // Logout function
  logout: () => {
    set({ isAuthenticated: false, user: null })
  },
  
  // Check authentication status
  checkAuth: async () => {
    try {
      // In a real app, this would verify the token with the server
      // For demo purposes, we'll just return the current state
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      set({ isAuthenticated: false, user: null })
      return false
    }
  }
}))
