import { SafeAreaView, StyleSheet, Text, BackHandler, FlatList } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { FeedPost } from '../components/feed/FeedPost'

type FeedScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Feed'>,
  NativeStackScreenProps<StackParamList>
>
// type FeedScreenNavigationProp = CompositeScreenProps<
//   NativeStackScreenProps<FeedStackParamList, 'Feed'>,
//   BottomTabScreenProps<BottomTabParamList>
// >
// type Props = BottomTabScreenProps<FeedStackParamList, 'Feed'>

export const Feed: React.FC<FeedScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()
  const { user, loggedUser } = useContext(AuthContext)

  // useEffect(() => {
  //   navigation.addListener('beforeRemove', (e) => {
  //     if (loggedUser) {
  //       navigation.dispatch(e.data.action)
  //       return
  //     } else {
  //       e.preventDefault()
  //     }
  //   })
  // }, [loggedUser])

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

      <FlatList
        data={user.posts.reverse()}
        style={{ width: '100%' }}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => {
          return (
            <FeedPost
              post={item}
              navigation={navigation}
            />
          )
        }}
      />
    </SafeAreaView>
  )
}
