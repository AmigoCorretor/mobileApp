import { useContext, useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RealtorProfile } from '../components/realtorProfile/RealtorProfile'
import { EditRealtorProfile } from '../components/realtorProfile/EditRealtorProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext, Post, User } from '../contexts/AuthContext'
import { server, showError, showSuccess } from '../common'
import axios from 'axios'

type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<StackParamList>
>
// type Props = BottomTabScreenProps<BottomTabParamList, 'Profile'>

export const Profile: React.FC<ProfileScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { user, loggedUser, setLoggedUser } = useContext(AuthContext)

  // useEffect(() => {
  //   if (!loggedUser) {
  //     console.warn("logout")
  //   }
  // }, [loggedUser])

  useEffect(() => {
    navigation.addListener('tabLongPress', e => {
      setShowLogoutModal(true)
    })
  }, [navigation])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData')
    setLoggedUser('')
    navigation.navigate('Auth')
    setShowLogoutModal(false)
  }
  const handleOpenPost = (post: Post) => {
    navigation.navigate('Post', { user, post })
  }

  const handleSaveEdit = async (name: string, email: string, phone: string, bio: string, photo?: string) => {
    const newUserInfo = {
      ...user,
      name,
      email,
      phone,
      bio
    }
    try {
      await axios.patch(`${server}/users/${user.id}`, newUserInfo)
      showSuccess('Perfil atualizado com sucesso!')
    } catch (e) {
      showError(e)
    }
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: colors.text,
    },
    postsList: {
      // justifyContent: 'space-around',
      width: '111%',

      alignItems: 'center',
    },
    post: {
      alignItems: 'center',
      padding: 15,
    },
    postText: {
      fontSize: 18,
      color: colors.text,
    },
    dummyPostImage: {
      // backgroundColor: colors.primary,
      height: 150,
      width: 150,
      borderRadius: 20,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <EditRealtorProfile
        onCancel={() => setShowLogoutModal(false)}
        isVisible={showLogoutModal}
        logout={handleLogout}
        userInfo={user}
        handleSaveEdit={handleSaveEdit}
      />
      <FlatList
        data={user.posts}
        keyExtractor={post => `${post.id}`}
        numColumns={2}
        ListHeaderComponent={() => <RealtorProfile userInfo={user} setShowLogoutModal={setShowLogoutModal} />}
        contentContainerStyle={styles.postsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpenPost(item)}
            style={styles.post}>
            {/* <View style={styles.dummyPostImage} /> */}
            <Image
              style={styles.dummyPostImage}
              source={{ uri: item.images[0].link }}
            />
            <Text style={styles.postText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
