import { useContext, useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RealtorProfile } from '../components/RealtorProfile'
import { EditRealtorProfile } from '../components/EditRealtorProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../contexts/AuthContext'

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
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    const logOut = navigation.addListener('tabLongPress', e => {
      setShowLogoutModal(true)
    })
  }, [navigation])

  const handleLogout = () => {
    AsyncStorage.setItem('userData', '')
    navigation.navigate('Auth')
  }

  const handleSaveEdit = (name: string, email: string, phone: string, bio: string, photo?: string) => {
    const newUserInfo = {
      ...user,
      name,
      email,
      phone,
      bio
    }
    setUser(newUserInfo)
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
        ListHeaderComponent={() => <RealtorProfile userInfo={user} />}
        contentContainerStyle={styles.postsList}
        renderItem={({ item }) => (
          <View style={styles.post}>
            {/* <View style={styles.dummyPostImage} /> */}
            <Image
              style={styles.dummyPostImage}
              source={{ uri: item.images[0].link }}
            />
            <Text style={styles.postText}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
