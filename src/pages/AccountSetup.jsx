import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack, MdCheck, MdInfo } from 'react-icons/md'

const AccountSetup = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const platforms = [
    {
      id: 'philips-hue',
      name: 'Philips Hue',
      description: 'Control your Philips Hue smart lights',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#01a9e7',
      popular: true
    },
    {
      id: 'google-home',
      name: 'Google Home',
      description: 'Manage your Google Home devices',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#4285F4',
      popular: true
    },
    {
      id: 'amazon-alexa',
      name: 'Amazon Alexa',
      description: 'Connect with your Alexa-enabled devices',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#00CAFF',
      popular: true
    },
    {
      id: 'apple-homekit',
      name: 'Apple HomeKit',
      description: 'Integrate with your Apple HomeKit accessories',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#000000',
      popular: true
    },
    {
      id: 'samsung-smartthings',
      name: 'Samsung SmartThings',
      description: 'Connect with your SmartThings ecosystem',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#15bfff',
      popular: false
    },
    {
      id: 'nest',
      name: 'Google Nest',
      description: 'Manage your Nest thermostats and cameras',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#00afd8',
      popular: false
    },
    {
      id: 'sonos',
      name: 'Sonos',
      description: 'Control your Sonos speakers and audio system',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#000000',
      popular: false
    },
    {
      id: 'ring',
      name: 'Ring',
      description: 'Manage your Ring doorbells and cameras',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#1e88e5',
      popular: false
    },
    {
      id: 'ecobee',
      name: 'ecobee',
      description: 'Control your ecobee thermostats and sensors',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#faaf19',
      popular: false
    },
    {
      id: 'lutron',
      name: 'Lutron Caséta',
      description: 'Manage your Lutron lighting and shades',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#000000',
      popular: false
    },
    {
      id: 'wemo',
      name: 'Belkin WeMo',
      description: 'Control your WeMo smart plugs and switches',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#4CAF50',
      popular: false
    },
    {
      id: 'tplink',
      name: 'TP-Link Kasa',
      description: 'Manage your Kasa smart home devices',
      icon: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=150',
      color: '#4acbd6',
      popular: false
    }
  ]
  
  const popularPlatforms = platforms.filter(platform => platform.popular)
  const otherPlatforms = platforms.filter(platform => !platform.popular)
  
  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform)
    setStep(2)
  }
  
  const handleAuthenticate = (e) => {
    e.preventDefault()
    setIsAuthenticating(true)
    
    // Simulate authentication process
    setTimeout(() => {
      setIsAuthenticating(false)
      setIsSuccess(true)
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        setStep(3)
      }, 1000)
    }, 2000)
  }
  
  const handleFinish = () => {
    navigate('/settings/integrations')
  }
  
  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}
              className="p-2 rounded-full text-secondary-500 hover:bg-secondary-100"
            >
              <MdArrowBack size={24} />
            </button>
            <h1 className="text-xl font-semibold text-secondary-900">
              {step === 1 && 'Connect Smart Home Platform'}
              {step === 2 && `Connect to ${selectedPlatform?.name}`}
              {step === 3 && 'Connection Successful'}
            </h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${
            step >= 2 ? 'bg-primary-600' : 'bg-secondary-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'
          }`}>
            2
          </div>
          <div className={`w-16 h-1 ${
            step >= 3 ? 'bg-primary-600' : 'bg-secondary-200'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'
          }`}>
            3
          </div>
        </div>
        
        {/* Step 1: Select platform */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-lg font-medium text-secondary-900 mb-4">Select a smart home platform to connect</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary-500 uppercase tracking-wider mb-3">Popular platforms</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularPlatforms.map(platform => (
                  <button
                    key={platform.id}
                    className="flex items-center p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
                    onClick={() => handleSelectPlatform(platform)}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: platform.color + '20' }}
                    >
                      <img 
                        src={platform.icon} 
                        alt={platform.name} 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="ml-4 text-left">
                      <h4 className="font-medium text-secondary-900">{platform.name}</h4>
                      <p className="text-sm text-secondary-500">{platform.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-secondary-500 uppercase tracking-wider mb-3">Other platforms</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherPlatforms.map(platform => (
                  <button
                    key={platform.id}
                    className="flex items-center p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
                    onClick={() => handleSelectPlatform(platform)}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: platform.color + '20' }}
                    >
                      <img 
                        src={platform.icon} 
                        alt={platform.name} 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="ml-4 text-left">
                      <h4 className="font-medium text-secondary-900">{platform.name}</h4>
                      <p className="text-sm text-secondary-500">{platform.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Authentication */}
        {step === 2 && selectedPlatform && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="flex items-center mb-6">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: selectedPlatform.color + '20' }}
              >
                <img 
                  src={selectedPlatform.icon} 
                  alt={selectedPlatform.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-medium text-secondary-900">{selectedPlatform.name}</h2>
                <p className="text-secondary-500">{selectedPlatform.description}</p>
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-4 mb-6">
              <div className="flex">
                <MdInfo className="text-secondary-500 flex-shrink-0 mt-0.5" size={20} />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-secondary-800">Authentication Required</h4>
                  <p className="mt-1 text-sm text-secondary-600">
                    You'll need to sign in to your {selectedPlatform.name} account to connect your devices.
                    Your login credentials are securely handled and we only store the necessary access tokens.
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleAuthenticate}>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                    Email or Username
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    placeholder={`Your ${selectedPlatform.name} account email`}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={isAuthenticating || isSuccess}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isSuccess 
                      ? 'bg-success-600' 
                      : 'bg-primary-600 hover:bg-primary-700'
                  } transition-colors disabled:opacity-70`}
                >
                  {isAuthenticating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center">
                      <MdCheck className="mr-1" size={18} />
                      Connected
                    </span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <h4 className="text-sm font-medium text-secondary-800 mb-2">Alternative connection methods</h4>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 text-sm">
                  Use OAuth
                </button>
                <button className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 text-sm">
                  Use API Key
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Success */}
        {step === 3 && selectedPlatform && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto">
              <MdCheck className="text-success-600" size={40} />
            </div>
            
            <h2 className="text-xl font-medium text-secondary-900 mt-6">
              Successfully Connected to {selectedPlatform.name}
            </h2>
            
            <p className="text-secondary-600 mt-2 mb-8">
              Your {selectedPlatform.name} account has been successfully connected to SmartHome Hub.
              You can now control and monitor your devices.
            </p>
            
            <div className="bg-secondary-50 rounded-lg p-4 mb-8 text-left">
              <h4 className="text-sm font-medium text-secondary-800 mb-2">What's next?</h4>
              <ul className="text-sm text-secondary-600 space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-100 text-primary-700 rounded-full mr-2 flex-shrink-0 text-xs">1</span>
                  <span>Your devices will be automatically discovered and added to your dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-100 text-primary-700 rounded-full mr-2 flex-shrink-0 text-xs">2</span>
                  <span>You can organize your devices into rooms for easier management</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-100 text-primary-700 rounded-full mr-2 flex-shrink-0 text-xs">3</span>
                  <span>Create routines to automate your smart home experience</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  setSelectedPlatform(null)
                  setStep(1)
                }}
                className="w-full sm:w-auto px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50"
              >
                Connect Another Platform
              </button>
              
              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Go to Integrations
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AccountSetup
