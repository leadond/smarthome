import { create } from 'zustand'

export const useEnergyStore = create((set, get) => ({
  currentUsage: 2.4,
  dailyUsage: 18.7,
  
  // Hourly usage data (for day view)
  hourlyUsage: [
    { hour: '12 AM', usage: 1.2 },
    { hour: '1 AM', usage: 1.0 },
    { hour: '2 AM', usage: 0.9 },
    { hour: '3 AM', usage: 0.8 },
    { hour: '4 AM', usage: 0.8 },
    { hour: '5 AM', usage: 0.9 },
    { hour: '6 AM', usage: 1.5 },
    { hour: '7 AM', usage: 2.3 },
    { hour: '8 AM', usage: 2.8 },
    { hour: '9 AM', usage: 2.5 },
    { hour: '10 AM', usage: 2.2 },
    { hour: '11 AM', usage: 2.0 },
    { hour: '12 PM', usage: 2.1 },
    { hour: '1 PM', usage: 2.0 },
    { hour: '2 PM', usage: 1.8 },
    { hour: '3 PM', usage: 1.9 },
    { hour: '4 PM', usage: 2.0 },
    { hour: '5 PM', usage: 2.4 },
    { hour: '6 PM', usage: 2.8 },
    { hour: '7 PM', usage: 3.0 },
    { hour: '8 PM', usage: 2.7 },
    { hour: '9 PM', usage: 2.3 },
    { hour: '10 PM', usage: 1.8 },
    { hour: '11 PM', usage: 1.4 }
  ],
  
  // Daily usage data (for week view)
  dailyUsage: [
    { day: 'Mon', usage: 18.2 },
    { day: 'Tue', usage: 17.8 },
    { day: 'Wed', usage: 19.1 },
    { day: 'Thu', usage: 18.7 },
    { day: 'Fri', usage: 20.3 },
    { day: 'Sat', usage: 22.5 },
    { day: 'Sun', usage: 21.8 }
  ],
  
  // Weekly usage data (for month view)
  weeklyUsage: [
    { week: 'Week 1', usage: 125.4 },
    { week: 'Week 2', usage: 132.7 },
    { week: 'Week 3', usage: 128.9 },
    { week: 'Week 4', usage: 138.2 }
  ],
  
  // Monthly usage data (for year view)
  monthlyUsage: [
    { month: 'Jan', usage: 520.3 },
    { month: 'Feb', usage: 480.7 },
    { month: 'Mar', usage: 450.2 },
    { month: 'Apr', usage: 420.5 },
    { month: 'May', usage: 410.8 },
    { month: 'Jun', usage: 430.1 },
    { month: 'Jul', usage: 470.6 },
    { month: 'Aug', usage: 490.3 },
    { month: 'Sep', usage: 460.7 },
    { month: 'Oct', usage: 480.2 },
    { month: 'Nov', usage: 510.5 },
    { month: 'Dec', usage: 540.9 }
  ],
  
  // Device energy usage data
  deviceEnergy: [
    { deviceId: '1', usage: 3.2, cost: 0.48 },
    { deviceId: '2', usage: 2.8, cost: 0.42 },
    { deviceId: '3', usage: 5.6, cost: 0.84 },
    { deviceId: '4', usage: 0.5, cost: 0.08 },
    { deviceId: '5', usage: 2.1, cost: 0.32 },
    { deviceId: '6', usage: 1.8, cost: 0.27 },
    { deviceId: '7', usage: 2.5, cost: 0.38 },
    { deviceId: '8', usage: 2.2, cost: 0.33 },
    { deviceId: '9', usage: 1.2, cost: 0.18 },
    { deviceId: '10', usage: 0.8, cost: 0.12 }
  ],
  
  // Fetch energy data
  fetchEnergyData: async () => {
    try {
      // In a real app, this would make an API call to fetch energy data
      // For demo purposes, we're using the mock data above
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return the energy data (already in state)
      return {
        currentUsage: get().currentUsage,
        dailyUsage: get().dailyUsage,
        hourlyUsage: get().hourlyUsage,
        dailyUsage: get().dailyUsage,
        weeklyUsage: get().weeklyUsage,
        monthlyUsage: get().monthlyUsage,
        deviceEnergy: get().deviceEnergy
      }
    } catch (error) {
      console.error('Failed to fetch energy data:', error)
      return null
    }
  }
}))
