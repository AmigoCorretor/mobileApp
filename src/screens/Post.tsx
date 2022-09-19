import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostImages } from '../components/post/PostImage'
import { PostInfos } from '../components/post/PostInfos'

// type PostScreenNavigationProp = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabParamList, 'Post'>,
//   NativeStackScreenProps<StackParamList>
// >
// type PostScreenNavigationProp = CompositeScreenProps<
//   NativeStackScreenProps<FeedStackParamList, 'Post'>,
//   BottomTabScreenProps<BottomTabParamList>
// >

type Props = BottomTabScreenProps<StackParamList, 'Post'>

export const Post: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()

  const post = route.params.post
  const user = route.params.user

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 24,
      color: colors.text,
    },
    imageBackground: {
      width: '100%',
      height: 400
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: `${colors.background}7`,
      borderRadius: 40,
      padding: 10,
      width: 150
    },
    name: {
      fontSize: 20,
      color: colors.text,
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    verifiedIcon: {
      color: colors.primary,
      position: 'absolute',
      right: 0
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <PostImages user={user} post={post} />
        <PostInfos post={post} />
      </ScrollView>
    </SafeAreaView>
  )
}
