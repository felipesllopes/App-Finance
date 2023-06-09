import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <AuthProvider>
        <StatusBar />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
