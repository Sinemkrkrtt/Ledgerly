import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/Navigator';

export default function App() {
  return (
    <SafeAreaProvider>
 
      <Navigator />
    </SafeAreaProvider>
  );
}
