import { Platform } from 'react-native';

// Android-Emulator kennt "localhost" nicht — er nutzt 10.0.2.2 (erklärt im FAQ)
// Platform.select wählt automatisch die richtige URL je nach Gerät
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3030',
  ios: 'http://localhost:3030',
  default: 'http://localhost:3030',
}) as string;

export default BASE_URL;
