import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Post } from '../contexts/AuthContext'
import { FeedPost } from '../components/feed/FeedPost'
import axios from 'axios'
import { server } from '../common'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FilterModal } from '../components/feed/FilterModal'

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
  const [posts, setPosts] = useState<Post[]>()
  const [showFilterModal, setShowFilterModal] = useState(false)

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

  useEffect(() => {
    const getData = async () => {
      const postsArray = await (await axios.get(`${server}/posts`)).data as Post[]
      const availablePosts = postsArray.filter(post => post.available)
      setPosts(availablePosts)
    }
    getData()
  }, [])

  const handleFilter = (house: boolean, apartment: boolean, land: boolean, farm: boolean, kitnet: boolean, room: boolean, shed: boolean, mall: boolean, studio: boolean) => {
    console.log(house, apartment, land, farm, kitnet, room, shed, mall, studio)
    const filteredPosts = posts?.filter(post => post.type === 'house')
    setPosts(filteredPosts)
  }

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
    headerContainer: {
      flexDirection: 'row',
      height: 50,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: colors.text,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingsButton: {
      position: 'absolute',
      right: 10,
    },
    settingsIcon: {
      color: colors.primary,
      fontSize: 30,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <FilterModal
        isVisible={showFilterModal}
        onCancel={() => setShowFilterModal(false)}
        handleFilter={handleFilter}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Feed</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => { setShowFilterModal(true) }}>
          <MaterialCommunityIcons
            name='filter-outline'
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
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
