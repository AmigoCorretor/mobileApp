import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { RootStackParamList } from '../common'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const Home = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HOME</Text>
      <Text>{route.params?.payload.name}</Text>
    </SafeAreaView>
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
