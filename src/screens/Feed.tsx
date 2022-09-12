import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type FeedScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Feed'>,
  NativeStackScreenProps<StackParamList>
>
// type Props = BottomTabScreenProps<BottomTabParamList, 'Feed'>

// Profile do artigo
export const Feed: React.FC<FeedScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Feed</Text>
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
