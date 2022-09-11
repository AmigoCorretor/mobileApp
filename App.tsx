// import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Navigator } from './src/Navigator'
import { Auth } from './src/screens/Auth'

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    <Navigator />
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

