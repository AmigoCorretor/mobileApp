import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { BottomTabParamList, FeedStackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// type FeedScreenNavigationProp = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabParamList, 'Feed'>,
//   NativeStackScreenProps<StackParamList>
// >
type FeedScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<FeedStackParamList, 'Feed'>,
  BottomTabScreenProps<BottomTabParamList>
>
// type Props = BottomTabScreenProps<FeedStackParamList, 'Feed'>

export const Feed: React.FC<FeedScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()
  const { user } = useContext(AuthContext)

  const post = user.posts[0]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      color: colors.text,
    },
    text: {
      fontSize: 18,
      color: colors.text,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      {/* <Text style={styles.text}>{route.params?.payload.name}</Text> */}
      <Text>{user.id}</Text>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Post', { post, user })}>
        <Text style={styles.title}>Abrir POST</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
