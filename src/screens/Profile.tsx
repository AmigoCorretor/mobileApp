import { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RealtorProfile } from '../components/RealtorProfile'
import { EditRealtorProfile } from '../components/EditRealtorProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<StackParamList>
>
// type Props = BottomTabScreenProps<BottomTabParamList, 'Profile'>

export interface UserInfo {
  id: number;
  email: string;
  photo: string;
  name: string;
  isRealtor: true;
  creci: string;
  stars: number;
  comletedSells: number;
  completedRents: number;
  phone: string;
  posts: any[];
}

const userInfo: UserInfo = {
  id: 11,
  email: 'gustavo@gmail.com',
  photo: 'https://picsum.photos/seed/picsum/300',
  name: 'Gustavo',
  isRealtor: true,
  creci: '22394231',
  stars: 4.9,
  comletedSells: 12,
  completedRents: 10,
  phone: '479999-9999',
  posts: [
    {
      id: 1,
      title: 'casa no lago',
      description: 'Bela casa na beira do lago',
      totalArea: 800,
      usefulArea: 430,
      bathrooms: 5,
      bedrooms: 4,
      suites: 2,
      images: [
        {
          id: 2,
          link: 'https://picsum.photos/id/231/400',
        },
      ],
    },
    {
      id: 2,
      title: 'Casa na praia',
      description: 'Bela casa na praia',
      totalArea: 500,
      usefulArea: 330,
      bathrooms: 3,
      bedrooms: 4,
      suites: 2,
      images: [
        {
          id: 3,
          link: 'https://picsum.photos/id/22/400',
        },
      ],
    },
    {
      id: 3,
      title: 'Cobertura duplex',
      description: 'Bela cobertura duplex',
      totalArea: 450,
      usefulArea: 430,
      bathrooms: 4,
      bedrooms: 4,
      suites: 4,
      images: [
        {
          id: 4,
          link: 'https://picsum.photos/id/222/400',
        },
      ],
    },
    {
      id: 4,
      title: 'Apartamento',
      description: 'Bela apartamento com dois quartos',
      totalArea: 310,
      usefulArea: 300,
      bathrooms: 2,
      bedrooms: 2,
      suites: 1,
      images: [
        {
          id: 5,
          link: 'https://picsum.photos/id/234/400',
        },
      ],
    },
    {
      id: 5,
      title: 'Apartamento',
      description: 'Bela apartamento com dois quartos',
      totalArea: 310,
      usefulArea: 300,
      bathrooms: 2,
      bedrooms: 2,
      suites: 1,
      images: [
        {
          id: 6,
          link: 'https://picsum.photos/id/237/400',
        },
      ],
    },
  ],
}

export const Profile: React.FC<ProfileScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    const logOut = navigation.addListener('tabLongPress', e => {
      setShowLogoutModal(true)
    })
  }, [navigation])

  const handleLogout = () => {
    AsyncStorage.setItem('userData', '')
    navigation.navigate('Auth')
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
      />
      <FlatList
        data={userInfo.posts}
        keyExtractor={post => `${post.id}`}
        numColumns={2}
        ListHeaderComponent={() => <RealtorProfile userInfo={userInfo} />}
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
