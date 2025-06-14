import { create } from 'zustand'
// Import icons for rendering, but don't use JSX in the store data
import { MdWbSunny, MdNightlight, MdHome, MdDirectionsCar, MdMovie, MdFreeBreakfast } from 'react-icons/md'

export const useRoutineStore = create((set, get) => ({
  routines: [
    {
      id: '1',
      name: 'Good Morning',
      schedule: 'Weekdays, 7:00 AM',
      deviceCount: 5,
      timesExecuted: 42,
      isFavorite: true,
      iconName: 'MdWbSunny', // Store icon name as string instead of JSX
      color: 'bg-warning-100 text-warning-600',
      created: '2 months ago',
      lastRun: 'Today, 7:00 AM',
      actions: [
        {
          description: 'Turn on Living Room Lights at 50% brightness',
          deviceIds: ['1'],
          delay: 0
        },
        {
          description: 'Turn on Kitchen Lights',
          deviceIds: ['2'],
          delay: 5
        },
        {
          description: 'Set Thermostat to 72°F',
          deviceIds: ['3'],
          delay: 0
        },
        {
          description: 'Play morning news on Kitchen Speaker',
          deviceIds: ['6'],
          delay: 10
        }
      ],
      aliases: ['morning', 'wake up']
    },
    {
      id: '2',
      name: 'Good Night',
      schedule: 'Daily, 11:00 PM',
      deviceCount: 6,
      timesExecuted: 38,
      isFavorite: true,
      iconName: 'MdNightlight', // Store icon name as string
      color: 'bg-primary-100 text-primary-600',
      created: '2 months ago',
      lastRun: 'Yesterday, 11:00 PM',
      actions: [
        {
          description: 'Turn off all lights',
          deviceIds: ['1', '2', '7', '8'],
          delay: 0
        },
        {
          description: 'Set Thermostat to 68°F',
          deviceIds: ['3'],
          delay: 0
        },
        {
          description: 'Lock all doors',
          deviceIds: ['4', '10'],
          delay: 5
        }
      ],
      aliases: ['night', 'sleep']
    },
    {
      id: '3',
      name: 'I\'m Home',
      schedule: null,
      deviceCount: 4,
      timesExecuted: 27,
      isFavorite: false,
      iconName: 'MdHome', // Store icon name as string
      color: 'bg-success-100 text-success-600',
      created: '1 month ago',
      lastRun: 'Yesterday, 6:15 PM',
      actions: [
        {
          description: 'Turn on Living Room Lights',
          deviceIds: ['1'],
          delay: 0
        },
        {
          description: 'Set Thermostat to 72°F',
          deviceIds: ['3'],
          delay: 0
        },
        {
          description: 'Turn on Kitchen Lights if after sunset',
          deviceIds: ['2'],
          delay: 0
        }
      ],
      aliases: ['arrived', 'home']
    },
    {
      id: '4',
      name: 'Leaving Home',
      schedule: null,
      deviceCount: 7,
      timesExecuted: 25,
      isFavorite: false,
      iconName: 'MdDirectionsCar', // Store icon name as string
      color: 'bg-secondary-100 text-secondary-600',
      created: '1 month ago',
      lastRun: 'Yesterday, 8:30 AM',
      actions: [
        {
          description: 'Turn off all lights',
          deviceIds: ['1', '2', '7', '8'],
          delay: 0
        },
        {
          description: 'Set Thermostat to eco mode',
          deviceIds: ['3'],
          delay: 0
        },
        {
          description: 'Lock all doors',
          deviceIds: ['4', '10'],
          delay: 5
        },
        {
          description: 'Turn on security cameras',
          deviceIds: ['5'],
          delay: 10
        }
      ],
      aliases: ['leaving', 'away']
    },
    {
      id: '5',
      name: 'Movie Night',
      schedule: null,
      deviceCount: 3,
      timesExecuted: 12,
      isFavorite: true,
      iconName: 'MdMovie', // Store icon name as string
      color: 'bg-danger-100 text-danger-600',
      created: '3 weeks ago',
      lastRun: '3 days ago',
      actions: [
        {
          description: 'Dim Living Room Lights to 20%',
          deviceIds: ['1'],
          delay: 0
        },
        {
          description: 'Turn off Kitchen Lights',
          deviceIds: ['2'],
          delay: 0
        },
        {
          description: 'Set Thermostat to 70°F',
          deviceIds: ['3'],
          delay: 0
        }
      ],
      aliases: ['movie', 'cinema']
    },
    {
      id: '6',
      name: 'Weekend Morning',
      schedule: 'Weekends, 8:30 AM',
      deviceCount: 4,
      timesExecuted: 8,
      isFavorite: false,
      iconName: 'MdFreeBreakfast', // Store icon name as string
      color: 'bg-warning-100 text-warning-600',
      created: '2 weeks ago',
      lastRun: 'Last Sunday',
      actions: [
        {
          description: 'Turn on Living Room Lights at 60% brightness',
          deviceIds: ['1'],
          delay: 0
        },
        {
          description: 'Turn on Kitchen Lights',
          deviceIds: ['2'],
          delay: 5
        },
        {
          description: 'Set Thermostat to 72°F',
          deviceIds: ['3'],
          delay: 0
        },
        {
          description: 'Play weekend playlist on Kitchen Speaker',
          deviceIds: ['6'],
          delay: 10
        }
      ],
      aliases: ['weekend', 'saturday morning']
    }
  ],
  
  // Helper function to get the icon component based on name
  getIconComponent: (iconName) => {
    const iconMap = {
      MdWbSunny,
      MdNightlight,
      MdHome,
      MdDirectionsCar,
      MdMovie,
      MdFreeBreakfast
    };
    
    return iconMap[iconName] || MdWbSunny;
  },
  
  // Fetch routines
  fetchRoutines: async () => {
    try {
      // In a real app, this would make an API call to fetch routines
      // For demo purposes, we're using the mock data above
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return the routines (already in state)
      return get().routines
    } catch (error) {
      console.error('Failed to fetch routines:', error)
      return []
    }
  },
  
  // Execute routine
  executeRoutine: async (id) => {
    try {
      // In a real app, this would make an API call to execute the routine
      // For demo purposes, we'll just update the lastRun and timesExecuted
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      set(state => ({
        routines: state.routines.map(routine => 
          routine.id === id 
            ? { 
                ...routine, 
                lastRun: 'Just now', 
                timesExecuted: routine.timesExecuted + 1 
              } 
            : routine
        )
      }))
      
      return true
    } catch (error) {
      console.error('Failed to execute routine:', error)
      return false
    }
  },
  
  // Toggle routine favorite status
  favoriteRoutine: (id, isFavorite) => {
    set(state => ({
      routines: state.routines.map(routine => 
        routine.id === id 
          ? { ...routine, isFavorite } 
          : routine
      )
    }))
  },
  
  // Add routine
  addRoutine: (routine) => {
    set(state => ({
      routines: [...state.routines, { 
        ...routine, 
        id: Date.now().toString(),
        timesExecuted: 0,
        created: 'Just now',
        lastRun: 'Never'
      }]
    }))
  },
  
  // Update routine
  updateRoutine: (id, updates) => {
    set(state => ({
      routines: state.routines.map(routine => 
        routine.id === id 
          ? { ...routine, ...updates } 
          : routine
      )
    }))
  },
  
  // Remove routine
  removeRoutine: (id) => {
    set(state => ({
      routines: state.routines.filter(routine => routine.id !== id)
    }))
  }
}))
