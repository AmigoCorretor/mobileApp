import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'


interface Props {
    icon: keyof typeof MaterialIcons.glyphMap
    infos: string
}

export const InfosFooter: React.FC<Props> = ({ icon, infos }) => {

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
        text:{
            color: colors.text
        }
    })

    return (
        <View style={styles.container}>
            <MaterialIcons
                style={styles.icon}
                name={icon}
            />
            <Text style={styles.text}>{infos}</Text>
        </View>
    )
}