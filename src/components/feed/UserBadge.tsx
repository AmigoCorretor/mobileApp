import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

interface Props {
    name: string
    photo: string
}

export const UserBadge: React.FC<Props> = ({ name, photo }) => {

    const { colors } = useTheme()

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 10
        },
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
            justifyContent: 'space-between',
            backgroundColor: `${colors.background}7`,
            borderRadius: 40,
            padding: 10,
            width: 150,
            // top: Platform.OS === 'android' ? 56 : 0
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
        <View style={styles.userContainer}>
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
            <Text style={styles.name}>{name}</Text>
        </View>
    )
}


