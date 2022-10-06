import React from 'react'
import { Text, View, StyleSheet, Image, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

interface Props {
    name: string
    photo: string
    badgeStyle?: StyleProp<ViewStyle>
    nameStyle?: StyleProp<TextStyle>
}

export const UserBadge: React.FC<Props> = ({ name, photo, badgeStyle, nameStyle }) => {

    const { colors } = useTheme()

    const styles = StyleSheet.create({
        icon: {
            color: colors.text,
            fontSize: 25,
            marginRight: 15
        },
        text: {
            color: colors.text
        },
        userContainer: {
            position: 'absolute',
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: `${colors.background}7`,
            borderRadius: 40,
            padding: 10,
            minWidth: 100,
            // top: Platform.OS === 'android' ? 56 : 0
        },
        name: {
            color: colors.text,
            paddingHorizontal: 5
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
        <View style={[styles.userContainer, badgeStyle]}>
            <View>
                <Image
                    style={styles.profilePicture}
                    source={{ uri: photo }} />
                <MaterialIcons
                    name='verified'
                    size={20}
                    style={styles.verifiedIcon}
                />
            </View>
            <Text style={[styles.name, nameStyle ]}>{name}</Text>
        </View>
    )
}


