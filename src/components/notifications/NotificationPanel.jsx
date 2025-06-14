import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { MdNotifications, MdCheck, MdDelete } from 'react-icons/md'
import { useNotificationStore } from '../../stores/notificationStore'

const NotificationPanel = ({ onClose }) => {
  const { notifications, markAsRead, deleteNotification, markAllAsRead, clearAll } = useNotificationStore()
  const [filter, setFilter] = useState('all') // 'all', 'unread', 'read'

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
      style={{ maxHeight: 'calc(100vh - 150px)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 bg-secondary-50">
        <h3 className="font-medium text-secondary-900 flex items-center">
          <MdNotifications className="mr-2" size={20} />
          Notifications
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={markAllAsRead}
            className="text-xs text-primary-600 hover:text-primary-800"
            title="Mark all as read"
          >
            Mark all read
          </button>
          <button 
            onClick={clearAll}
            className="text-xs text-secondary-600 hover:text-secondary-800"
            title="Clear all notifications"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex border-b border-secondary-200">
        <button
          className={`flex-1 py-2 text-sm font-medium ${filter === 'all' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${filter === 'unread' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${filter === 'read' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
      </div>

      {/* Notification list */}
      <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-3 border-b border-secondary-100 hover:bg-secondary-50 ${!notification.read ? 'bg-primary-50' : ''}`}
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-secondary-500 mt-1">
                      {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                  <div className="flex items-start space-x-1 ml-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-primary-600 hover:text-primary-800 rounded-full hover:bg-primary-100"
                        title="Mark as read"
                      >
                        <MdCheck size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-secondary-500 hover:text-secondary-700 rounded-full hover:bg-secondary-100"
                      title="Delete notification"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-8 text-center text-secondary-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="mt-2">No notifications</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-secondary-200 bg-secondary-50 text-center">
        <button 
          onClick={onClose}
          className="text-sm text-secondary-600 hover:text-secondary-900"
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

export default NotificationPanel
