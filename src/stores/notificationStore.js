import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  notifications: [
    {
      id: '1',
      message: 'Front Door Lock was unlocked',
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      read: false,
      type: 'security'
    },
    {
      id: '2',
      message: 'Living Room Lights turned on',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false,
      type: 'device'
    },
    {
      id: '3',
      message: 'Bedroom Thermostat set to 72°F',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      read: true,
      type: 'device'
    },
    {
      id: '4',
      message: 'Good Morning routine executed',
      timestamp: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
      read: true,
      type: 'routine'
    },
    {
      id: '5',
      message: 'Kitchen Lights battery is low (15%)',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: false,
      type: 'alert'
    },
    {
      id: '6',
      message: 'New device detected: Office Speaker',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: true,
      type: 'system'
    },
    {
      id: '7',
      message: 'Bathroom Outlet is offline',
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      read: true,
      type: 'alert'
    }
  ],
  
  // Get unread count
  get unreadCount() {
    return get().notifications.filter(notification => !notification.read).length
  },
  
  // Add notification
  addNotification: (notification) => {
    set(state => ({
      notifications: [
        {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification
        },
        ...state.notifications
      ]
    }))
  },
  
  // Mark notification as read
  markAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    }))
  },
  
  // Mark all notifications as read
  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notification => ({ ...notification, read: true }))
    }))
  },
  
  // Delete notification
  deleteNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(notification => notification.id !== id)
    }))
  },
  
  // Clear all notifications
  clearAll: () => {
    set({ notifications: [] })
  }
}))
