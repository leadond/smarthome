import { create } from 'zustand'

export const useVoiceStore = create((set) => ({
  isListening: false,
  transcript: '',
  
  // Toggle listening state
  toggleListening: () => {
    set(state => {
      // If turning off, reset transcript
      if (state.isListening) {
        return { isListening: false, transcript: '' }
      }
      
      // If turning on, just update the state
      return { isListening: true }
    })
  },
  
  // Update transcript
  updateTranscript: (text) => {
    set({ transcript: text })
  },
  
  // Reset transcript
  resetTranscript: () => {
    set({ transcript: '' })
  }
}))
