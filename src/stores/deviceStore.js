import { create } from 'zustand'
import { MdLightbulb, MdThermostat, MdLock, MdVideocam, MdSpeaker, MdPower } from 'react-icons/md'
import { integrationService } from '../services/integrationService'
import { useAuthStore } from './authStore'

export const useDeviceStore = create((set, get) => ({
  devices: [],
  isLoading: false,
  error: null,
  
  // Fetch real devices from connected platforms
  fetchDevices: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const userId = useAuthStore.getState().user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      // Fetch devices from integration service
      const devices = await integrationService.fetchDevices(userId);
      
      set({ 
        devices,
        isLoading: false 
      });
      
      return devices;
    } catch (error) {
      console.error('Failed to fetch devices:', error);
      set({ 
        error: error.message,
        isLoading: false 
      });
      return [];
    }
  },
  
  // Toggle device on/off
  toggleDevice: async (id, isOn) => {
    try {
      const device = get().devices.find(d => d.id === id);
      if (!device) {
        throw new Error('Device not found');
      }
      
      // Update device state optimistically
      set(state => ({
        devices: state.devices.map(device => 
          device.id === id 
            ? { 
                ...device, 
                isOn, 
                lastUsed: new Date().toISOString() 
              } 
            : device
        )
      }));
      
      // Send command to the device
      const success = await integrationService.controlDevice(device, { isOn });
      
      if (!success) {
        // Revert state if command failed
        set(state => ({
          devices: state.devices.map(device => 
            device.id === id 
              ? { ...device, isOn: !isOn } 
              : device
          )
        }));
        throw new Error('Failed to control device');
      }
      
      return success;
    } catch (error) {
      console.error(`Failed to toggle device ${id}:`, error);
      return false;
    }
  },
  
  // Set device brightness
  setBrightness: async (id, brightness) => {
    try {
      const device = get().devices.find(d => d.id === id);
      if (!device) {
        throw new Error('Device not found');
      }
      
      // Update device state optimistically
      set(state => ({
        devices: state.devices.map(device => 
          device.id === id 
            ? { 
                ...device, 
                brightness, 
                lastUsed: new Date().toISOString() 
              } 
            : device
        )
      }));
      
      // Send command to the device
      const success = await integrationService.controlDevice(device, { brightness });
      
      if (!success) {
        // Revert state if command failed
        set(state => ({
          devices: state.devices.map(device => 
            device.id === id 
              ? { ...device, brightness: device.brightness } 
              : device
          )
        }));
        throw new Error('Failed to set brightness');
      }
      
      return success;
    } catch (error) {
      console.error(`Failed to set brightness for device ${id}:`, error);
      return false;
    }
  },
  
  // Set device color temperature
  setColorTemperature: async (id, colorTemperature) => {
    try {
      const device = get().devices.find(d => d.id === id);
      if (!device) {
        throw new Error('Device not found');
      }
      
      // Update device state optimistically
      set(state => ({
        devices: state.devices.map(device => 
          device.id === id 
            ? { 
                ...device, 
                colorTemperature, 
                lastUsed: new Date().toISOString() 
              } 
            : device
        )
      }));
      
      // Send command to the device
      const success = await integrationService.controlDevice(device, { colorTemperature });
      
      if (!success) {
        // Revert state if command failed
        set(state => ({
          devices: state.devices.map(device => 
            device.id === id 
              ? { ...device, colorTemperature: device.colorTemperature } 
              : device
          )
        }));
        throw new Error('Failed to set color temperature');
      }
      
      return success;
    } catch (error) {
      console.error(`Failed to set color temperature for device ${id}:`, error);
      return false;
    }
  },
  
  // Toggle device favorite status
  favoriteDevice: (id, isFavorite) => {
    set(state => ({
      devices: state.devices.map(device => 
        device.id === id 
          ? { ...device, isFavorite } 
          : device
      )
    }));
    
    // In a real app, this would also update the user's preferences in the database
  },
  
  // Get device icon component
  getDeviceIcon: (type) => {
    switch (type) {
      case 'light': return MdLightbulb;
      case 'thermostat': return MdThermostat;
      case 'lock': return MdLock;
      case 'camera': return MdVideocam;
      case 'speaker': return MdSpeaker;
      case 'outlet': return MdPower;
      default: return MdPower;
    }
  }
}))
