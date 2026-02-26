import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'http://localhost:3030',
  ios: 'http://localhost:3030',
  default: 'http://localhost:3030',
}) as string;

export default BASE_URL;
