import { Platform } from 'react-native';

// 1. BASE URL HANDLING
// Android Emulator uses 10.0.2.2 to access the host machine's localhost.
// iOS Simulator uses localhost.
// If using a physical device, replace this with your computer's LAN IP (e.g., http://192.168.1.5:3000)
export const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
  default: 'http://localhost:3000',
});

// 2. SIMULATED LATENCY (The "Crucial" Requirement)
// This function returns a promise that resolves after 'ms' milliseconds
export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), ms));
