import { useState } from 'react'
import { MdInfo, MdEdit } from 'react-icons/md'
import { useAuthStore } from '../../stores/authStore'

const AccountSettings = () => {
  const { user, updateUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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
    
    // Validate form
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    // Update user info
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    })
    
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-secondary-900">Account Information</h3>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-full ${isEditing ? 'bg-primary-100 text-primary-700' : 'hover:bg-secondary-100 text-secondary-500'}`}
          >
            <MdEdit size={20} />
          </button>
        </div>
        
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
            
            {isEditing && (
              <div className="pt-4 border-t border-secondary-200">
                <h4 className="text-md font-medium text-secondary-900 mb-3">Change Password</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      className="input"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      className="input"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {isEditing && (
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
            )}
          </div>
        </form>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Connected Accounts</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Google</p>
                <p className="text-sm text-secondary-500">Connected</p>
              </div>
            </div>
            <button className="btn btn-secondary">Disconnect</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Facebook</p>
                <p className="text-sm text-secondary-500">Not connected</p>
              </div>
            </div>
            <button className="btn btn-primary">Connect</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Twitter</p>
                <p className="text-sm text-secondary-500">Not connected</p>
              </div>
            </div>
            <button className="btn btn-primary">Connect</button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-4">Danger Zone</h3>
        
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
          <div className="flex">
            <MdInfo className="text-danger-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-danger-800">Delete Account</h4>
              <p className="mt-1 text-sm text-danger-700">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="mt-3 px-4 py-2 bg-white border border-danger-300 text-danger-700 rounded-lg hover:bg-danger-50 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
