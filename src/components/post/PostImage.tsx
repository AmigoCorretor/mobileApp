import { useContext } from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Post, User } from '../../contexts/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  user: User,
  post: Post
}

export const PostImages: React.FC<Props> = ({ user, post }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
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
    <ImageBackground
      source={{ uri: post.images[0].link }}
      style={styles.imageBackground}>
      <View style={styles.userContainer}>
        <View>
          <Image
            style={styles.profilePicture}
            source={{ uri: user.photo }} />
          <MaterialIcons
            name='verified'
            size={20}
            style={styles.verifiedIcon}
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>
    </ImageBackground>
  )
}
