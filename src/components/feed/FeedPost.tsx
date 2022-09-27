import { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext, Post, User } from '../../contexts/AuthContext'

interface Props {
    post: Post
}

export const FeedPost: React.FC<Props> = ({post}) => {
    const { colors } = useTheme()
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const { user, setUser } = useContext(AuthContext)

    //   const handleOpenPost = (post: Post) => {
    //     navigation.navigate('Post', { user, post })
    //   }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
        },
        images: {
            width: 200,
            height: 200
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.images}
                    source={{uri:post.images[0].link}}
                />
                <Image style={styles.images}
                    source={{uri:post.images[1].link}}
                />
                <Image style={styles.images}
                    source={{uri:post.images[2].link}}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}
