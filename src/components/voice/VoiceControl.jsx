import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useVoiceStore } from '../../stores/voiceStore'
import { useDeviceStore } from '../../stores/deviceStore'
import { useRoomStore } from '../../stores/roomStore'
import { useRoutineStore } from '../../stores/routineStore'
import { toast } from 'react-toastify'

const VoiceControl = () => {
  const navigate = useNavigate()
  const { isListening, toggleListening, transcript, resetTranscript } = useVoiceStore()
  const { devices, toggleDevice } = useDeviceStore()
  const { rooms } = useRoomStore()
  const { routines, executeRoutine } = useRoutineStore()
  const [processing, setProcessing] = useState(false)
  const [response, setResponse] = useState('')

  // Process voice commands
  useEffect(() => {
    if (!transcript || transcript.length < 3 || processing) return

    const processCommand = async () => {
      setProcessing(true)
      const command = transcript.toLowerCase().trim()
      
      // Navigation commands
      if (command.includes('go to') || command.includes('show me') || command.includes('open')) {
        if (command.includes('dashboard') || command.includes('home')) {
          navigate('/')
          setResponse('Opening dashboard')
        } else if (command.includes('devices')) {
          navigate('/devices')
          setResponse('Opening devices')
        } else if (command.includes('rooms')) {
          navigate('/rooms')
          setResponse('Opening rooms')
        } else if (command.includes('routines')) {
          navigate('/routines')
          setResponse('Opening routines')
        } else if (command.includes('energy')) {
          navigate('/energy')
          setResponse('Opening energy monitoring')
        } else if (command.includes('settings')) {
          navigate('/settings')
          setResponse('Opening settings')
        } else {
          setResponse("I didn't understand where to navigate to")
        }
      }
      
      // Device control commands
      else if (command.includes('turn on') || command.includes('turn off')) {
        const isOn = command.includes('turn on')
        const deviceKeywords = devices.map(d => ({
          device: d,
          keywords: [d.name.toLowerCase(), ...d.aliases?.map(a => a.toLowerCase()) || []]
        }))
        
        const matchedDevice = deviceKeywords.find(dk => 
          dk.keywords.some(keyword => command.includes(keyword))
        )
        
        if (matchedDevice) {
          await toggleDevice(matchedDevice.device.id, isOn)
          setResponse(`${isOn ? 'Turned on' : 'Turned off'} ${matchedDevice.device.name}`)
        } else {
          setResponse("I couldn't find that device")
        }
      }
      
      // Routine execution commands
      else if (command.includes('run') || command.includes('execute') || command.includes('start routine')) {
        const routineKeywords = routines.map(r => ({
          routine: r,
          keywords: [r.name.toLowerCase(), ...r.aliases?.map(a => a.toLowerCase()) || []]
        }))
        
        const matchedRoutine = routineKeywords.find(rk => 
          rk.keywords.some(keyword => command.includes(keyword))
        )
        
        if (matchedRoutine) {
          await executeRoutine(matchedRoutine.routine.id)
          setResponse(`Executing routine: ${matchedRoutine.routine.name}`)
        } else {
          setResponse("I couldn't find that routine")
        }
      }
      
      // Help command
      else if (command.includes('help') || command.includes('what can you do')) {
        setResponse("You can ask me to navigate to different sections, turn devices on or off, or run routines")
      }
      
      // Unknown command
      else {
        setResponse("I didn't understand that command")
      }
      
      // Reset after processing
      setTimeout(() => {
        resetTranscript()
        setProcessing(false)
        
        // Auto-close after response
        setTimeout(() => {
          if (isListening) {
            toggleListening()
          }
          setResponse('')
        }, 3000)
      }, 1000)
    }
    
    processCommand()
  }, [transcript, processing, devices, routines, navigate, toggleDevice, executeRoutine, resetTranscript, isListening, toggleListening])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => {
        if (isListening) toggleListening()
      }}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${isListening ? 'bg-primary-100 animate-pulse' : 'bg-secondary-100'}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-10 w-10 ${isListening ? 'text-primary-600' : 'text-secondary-400'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          
          <h3 className="mt-4 text-lg font-medium text-secondary-900">
            {isListening ? 'Listening...' : 'Voice Control'}
          </h3>
          
          <div className="mt-2 min-h-[60px] flex items-center justify-center">
            {transcript ? (
              <p className="text-secondary-700">{transcript}</p>
            ) : response ? (
              <p className="text-primary-600 font-medium">{response}</p>
            ) : (
              <p className="text-secondary-500 text-sm">
                {isListening 
                  ? "Try saying: 'Turn on living room lights' or 'Go to devices'" 
                  : "Click the microphone to start speaking"}
              </p>
            )}
          </div>
          
          <div className="mt-6 flex justify-center space-x-3">
            <button
              onClick={toggleListening}
              className={`btn ${isListening ? 'btn-danger' : 'btn-primary'}`}
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            
            <button
              onClick={() => {
                if (isListening) toggleListening()
              }}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VoiceControl
