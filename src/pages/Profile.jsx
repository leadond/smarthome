import { useState } from 'react'
import { MdEdit, MdPerson, MdHome, MdDevices, MdAutoAwesome } from 'react-icons/md'
import { useAuthStore } from '../stores/authStore'
import { useDeviceStore } from '../stores/deviceStore'
import { useRoomStore } from '../stores/roomStore'
import { useRoutineStore } from '../stores/routineStore'

const Profile = () => {
  const { user, updateUser } = useAuthStore()
  const { devices } = useDeviceStore()
  const { rooms } = useRoomStore()
  const { routines } = useRoutineStore()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Update user info
    updateUser({
      ...formData
    })
    
    setIsEditing(false)
  }
  
  // Calculate stats
  const totalDevices = devices.length
  const activeDevices = devices.filter(device => device.isOn).length
  const totalRooms = rooms.length
  const totalRoutines = routines.length
  const routineExecutions = routines.reduce((sum, routine) => sum + (routine.timesExecuted || 0), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-secondary-900">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile info */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4 text-3xl font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              
              <h2 className="text-xl font-semibold text-secondary-900 mb-1">{user?.name || 'User'}</h2>
              <p className="text-secondary-500 mb-4">{user?.email || 'user@example.com'}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  <MdEdit size={18} className="mr-1" />
                  Edit Profile
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-secondary-100">
              <h3 className="text-sm font-medium text-secondary-700 mb-3">Account Info</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Member Since</span>
                  <span className="text-sm font-medium">January 2023</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Last Login</span>
                  <span className="text-sm font-medium">Today, 10:30 AM</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Account Type</span>
                  <span className="text-sm font-medium">Premium</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-secondary-500">Location</span>
                  <span className="text-sm font-medium">{user?.location || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <h3 className="text-sm font-medium text-secondary-700 mb-3">Your Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                  <MdDevices size={20} />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Devices</p>
                  <p className="text-lg font-semibold">{totalDevices} total, {activeDevices} active</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-success-100 text-success-600 flex items-center justify-center mr-3">
                  <MdHome size={20} />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Rooms</p>
                  <p className="text-lg font-semibold">{totalRooms} configured</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center mr-3">
                  <MdAutoAwesome size={20} />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Routines</p>
                  <p className="text-lg font-semibold">{totalRoutines} created, {routineExecutions} executions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Edit profile form or activity */}
        <div className="md:col-span-2">
          <div className="card">
            {isEditing ? (
              <div>
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Edit Profile</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="input"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        className="input"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows="4"
                        className="input"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us a bit about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Activity</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-secondary-800 mb-3">Recent Activity</h3>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                          <MdDevices size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Turned on Living Room Lights</p>
                          <p className="text-sm text-secondary-500">Today, 3:45 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center mr-3 flex-shrink-0">
                          <MdAutoAwesome size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Executed "Good Morning" Routine</p>
                          <p className="text-sm text-secondary-500">Today, 7:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-success-100 text-success-600 flex items-center justify-center mr-3 flex-shrink-0">
                          <MdHome size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Added "Office" Room</p>
                          <p className="text-sm text-secondary-500">Yesterday, 2:15 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                          <MdDevices size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Added "Kitchen Lights" Device</p>
                          <p className="text-sm text-secondary-500">Yesterday, 11:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-secondary-800 mb-3">About</h3>
                    
                    {user?.bio ? (
                      <p className="text-secondary-600">{user.bio}</p>
                    ) : (
                      <p className="text-secondary-500 italic">No bio provided. Click "Edit Profile" to add information about yourself.</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-secondary-800 mb-3">Preferences</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <p className="font-medium">Temperature Unit</p>
                        <p className="text-sm text-secondary-500">Fahrenheit (°F)</p>
                      </div>
                      
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <p className="font-medium">Time Format</p>
                        <p className="text-sm text-secondary-500">12-hour</p>
                      </div>
                      
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-secondary-500">English</p>
                      </div>
                      
                      <div className="p-3 bg-secondary-50 rounded-lg">
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-secondary-500">Light</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
