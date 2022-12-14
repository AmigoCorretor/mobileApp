import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, View, Image, Platform } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
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
  const theme = useTheme()
  const { colors } = useTheme()
  const [posts, setPosts] = useState<Post[]>()
  const [showPosts, setShowPosts] = useState<Post[]>()
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
      setShowPosts(availablePosts)
    }
    getData()
  }, [])

  const handleFilter = (house: boolean, apartment: boolean, land: boolean, farm: boolean, kitnet: boolean, room: boolean, shed: boolean, mall: boolean, studio: boolean) => {
    const filteredPosts = posts?.filter(post => {
      if (house) {
        return post.type === 'Casa'
      }
      if (apartment) {
        return post.type === 'Apartamento'
      }
      if (land) {
        return post.type === 'Terreno'
      }
      if (farm) {
        return post.type === 'S??tio'
      }
      if (kitnet) {
        return post.type === 'Kitnet'
      }
      if (room) {
        return post.type === 'Quarto'
      }
      if (shed) {
        return post.type === 'Galp??o'
      }
      if (mall) {
        return post.type === 'Sala comercial'
      }
      if (studio) {
        return post.type === 'Studio'
      }
      if (!house && !apartment && !land && !farm && !kitnet && !room && !shed && !mall && !studio) {
        return post.type === 'Casa'
          || post.type === 'Apartamento'
          || post.type === 'Terreno'
          || post.type === 'S??tio'
          || post.type === 'Kitnet'
          || post.type === 'Quarto'
          || post.type === 'Galp??o'
          || post.type === 'Sala comercial'
          || post.type === 'Studio'
      }
    })
    setShowPosts(filteredPosts)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      top: Platform.OS === 'ios' ? 5 : 14,
      width: 170,
      height: 65
    },
    text: {
      fontSize: 18,
      color: colors.text,
    },
    headerContainer: {
      flexDirection: 'row',
      height: 50,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
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
        <Image
          source={theme.dark ? require('../../assets/icons/logoTextDarkmode.png') : require('../../assets/icons/logoTextLightmode.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.settingsButton} onPress={() => { setShowFilterModal(true) }}>
          <MaterialCommunityIcons
            name='filter-outline'
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={showPosts}
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
