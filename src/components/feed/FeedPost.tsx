import { useContext, useEffect, useRef, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext, Post, User } from '../../contexts/AuthContext'
import { InfosFooter } from './InfosFooter'
import { UserBadge } from './UserBadge'


interface Props {
    post: Post
    navigation: any
}

export const FeedPost: React.FC<Props> = ({ post, navigation }) => {
    const { colors } = useTheme()
    const { user } = useContext(AuthContext)
    const { width, height } = Dimensions.get('screen')

    const imageWidth = width * .5
    const imageHeight = imageWidth * 1

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            marginVertical: 10,
            borderRadius: 16,
            padding: 7,
        },
        images: {
            width: 200,
            height: 200
        },
        listHeader: {

        },
        viewHeader: {
            height: 80,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        footerContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        title: {
            color: colors.text,
            fontSize: 25,
            maxWidth: '60%'
        },
        infosTextContainer: {
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '100%',
            marginVertical: 10,
        },
        infosText: {
            color: colors.text,
            fontSize: 25,
        },
        imagesContainer: {

        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <UserBadge
                    name={user.name}
                    photo={user.photo}
                    badgeStyle={{
                        position: 'relative'
                    }}
                />
                <Text style={styles.title}>{post.title} </Text>
            </View>
            <FlatList
                contentContainerStyle={styles.imagesContainer}
                style={{ borderRadius: 16 }}
                data={post.images}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('Post', { user, post })}
                        >
                            <Image
                                source={{ uri: item.link }}
                                style={{
                                    width: imageWidth,
                                    height: imageHeight,
                                    resizeMode: 'cover',
                                    borderRadius: 16,
                                    marginHorizontal: 5
                                }} />
                        </TouchableWithoutFeedback>
                    )
                }}
            />
            <View style={styles.infosTextContainer}>
                <Text style={styles.infosText}>{post.price}</Text>
                <Text style={styles.infosText}>{post.type}</Text>
            </View>

            <View style={styles.footerContainer}>
                <InfosFooter
                    infos={post.bedrooms.toString()}
                    icon='airline-seat-individual-suite'
                />
                <InfosFooter
                    infos={post.suites.toString()}
                    icon='king-bed'
                />
                <InfosFooter
                    infos={post.bathrooms.toString()}
                    icon='bathtub'
                />
                <InfosFooter
                    infos={post.totalArea.toString()}
                    icon='crop-din'
                />
                <InfosFooter
                    infos={post.usefulArea.toString()}
                    icon='aspect-ratio'
                />
            </View>
        </View>
    )
}
