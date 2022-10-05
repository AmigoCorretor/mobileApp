import { useRef } from 'react'
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Post, User } from '../../contexts/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import { UserBadge } from '../feed/UserBadge'

type Props = {
  user: User,
  post: Post,
  showEditModal: (show: boolean) => void,
  deletePost: (id: number) => void
}

export const PostImages: React.FC<Props> = ({ user, post, deletePost, showEditModal }) => {
  const { colors } = useTheme()
  const { width, height } = Dimensions.get('screen')

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
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: `${colors.background}7`,
      borderRadius: 40,
      padding: 10,
      width: 150,
      top: Platform.OS === 'android' ? 56 : 0
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
  const imageWidth = width * 1
  const imageHeight = imageWidth * 1.54

  const scrollX = useRef(new Animated.Value(0)).current
  return (
    <View>
      <View style={{ width: '100%', height: 100, position: 'absolute', zIndex: 1 }}>
        {/* <View style={styles.userContainer}>
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
        </View> */}
        <UserBadge
          name={user.name.split(' ')[0]}
          photo={user.photo}
          badgeStyle={{
            top: Platform.OS === 'android' ? 56 : 0
          }}
        />
        <TouchableOpacity style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: `${colors.background}7`,
          borderRadius: 40,
          padding: 10,
          right: 0,
          top: Platform.OS === 'android' ? 56 : 0
        }}
          onPress={() => showEditModal(true)}
        >
          <MaterialIcons
            name='more-horiz'
            size={20}
            style={{ color: colors.text }}
          />
        </TouchableOpacity>
      </View>

      <View style={[StyleSheet.absoluteFillObject]}>
        {post.images.map((img, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })
          return <Animated.Image
            key={img.id.toString()}
            source={{ uri: img.link }}
            style={[StyleSheet.absoluteFillObject,
            {
              opacity
            }]}
            blurRadius={50}
          />
        })}
      </View>
      <Animated.FlatList
        data={post.images}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        style={{ paddingVertical: Platform.OS === 'ios' ? 70 : 56 }}
        renderItem={({ item }) => {
          return (
            <View style={{
              width, justifyContent: 'center', alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: .5,
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowRadius: 20
            }}>
              <Image
                source={{ uri: item.link }}
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  resizeMode: 'cover',
                  borderRadius: 16
                }} />
            </View>
          )
        }}
      />
    </View >
    // <ImageBackground
    //   source={{ uri: post.images[0].link }}
    //   style={styles.imageBackground}>
    //   <View style={styles.userContainer}>
    //     <View>
    //       <Image
    //         style={styles.profilePicture}
    //         source={{ uri: user.photo }} />
    //       <MaterialIcons
    //         name='verified'
    //         size={20}
    //         style={styles.verifiedIcon}
    //       />
    //     </View>
    //     <Text style={styles.name}>{user.name}</Text>
    //   </View>
    // </ImageBackground>
  )
}
