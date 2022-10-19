import React, { useContext, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostImages } from '../components/post/PostImage'
import { PostInfos } from '../components/post/PostInfos'
import axios from 'axios'
import { server, showError, showSuccess } from '../common'
import { AuthContext } from '../contexts/AuthContext'
import { EditPost } from '../components/post/EditPost'

import { getStorage, ref, deleteObject } from "firebase/storage"
import { firebaseApp } from "../FirebaseConfig"
const firebaseStorage = getStorage(firebaseApp)

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
  const { updateUser } = useContext(AuthContext)
  const [showEditPost, setShowEditPost] = useState(false)

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


  const getFileNameFromURL = (url: string) => {
    const name = url.split('%2F')[2].split('?alt=')[0]
    return name
  }

  const deleteImageFromFirebase = async (url: string) => {
    const name = getFileNameFromURL(url)
    const imgRef = ref(firebaseStorage, `images/${user.id}/${name}`)

    await deleteObject(imgRef).then(() => {
      console.log('Imagem apagada do firebase')
    }).catch((error) => {
      console.log('Problema ao apagar imagem no firebase')
    })
  }

  const deletePost = async (id: number) => {
    post.images.forEach(img => {
      deleteImageFromFirebase(img.link)
    })
    await axios.delete(`${server}/posts/${id}`)
      .then(_ => showSuccess('Post apagado!'))
      .then(_ => updateUser())
      .then(_ => navigation.goBack())
      .catch(e => showError(e))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <EditPost
          onCancel={() => setShowEditPost(false)}
          isVisible={showEditPost}
          postInfo={post}
          deletePost={deletePost}
          navigation={navigation}
        />
        <PostImages user={user} post={post} showEditModal={setShowEditPost} />
        <PostInfos post={post} />
      </ScrollView>
    </SafeAreaView>
  )
}
