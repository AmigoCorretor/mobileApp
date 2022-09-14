import { View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard, Modal, SafeAreaView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'

type Props = {
  // icon: keyof typeof MaterialIcons.glyphMap
  isVisible: boolean
  onCancel: any,
  logout: any
}

export const EditRealtorProfile = (props: Props) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 200,
      backgroundColor: colors.background,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      color: '#333',
      marginLeft: 20,
    },
    input: {
      marginLeft: 20,
      width: '70%',
    },
    buttonsContainer: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    button: {
      width: 100,
      backgroundColor: colors.text,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 10,
      borderRadius: 8
    },
    cancelButtonIcon: {
      color: '#333',
    },
  })
  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={props.onCancel}>
            <MaterialIcons
              name='cancel'
              size={20}
              style={styles.cancelButtonIcon}
              solid
            />
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={props.logout}>
            <MaterialIcons
              name='logout'
              size={20}
              style={styles.cancelButtonIcon}
              solid
            />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  )
}
