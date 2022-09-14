import { View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap
  style: object
  placeholder: string
  value: string
  onChangeText: any
  secureTextEntry?: boolean
  placeholderTextColor?: string
  showCancelButton?: boolean
  autoFocus?: boolean
  closeKeyboardOnCancel?: boolean,
  multiline?: boolean
}

export const AuthInput = (props: Props) => {
  const [showCancelButton, setShowCancelButton] = useState(false)
  const localInputRef = useRef<TextInput>();

  const keyboardDidHideCallback = () => {
    localInputRef.current!.blur?.()
    setShowCancelButton(false)
  }
  const handleCancel = () => {
    props.onChangeText('')
    if (props.closeKeyboardOnCancel) {
      Keyboard.dismiss()
    }
  }
  const handleInputFocus = () => {
    setShowCancelButton(true)
  }

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallback)

    return () => {
      keyboardDidHideSubscription?.remove()
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 40,
      backgroundColor: '#EEE',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#333',
      marginLeft: 20,
    },
    input: {
      marginLeft: 20,
      width: '70%',
    },
    cancelButton: {
      display: 'none'
    },
    cancelButtonIcon: {
      color: '#333',
    },
  })
  return (
    <View style={[styles.container, props.style]}>
      <MaterialIcons
        name={props.icon}
        size={20}
        style={styles.icon}
        solid
      />
      <TextInput
        {...props}
        style={styles.input}
        onFocus={handleInputFocus}
        ref={(ref) => {
          localInputRef && (localInputRef.current = ref as any);
        }}
      />
      <TouchableOpacity onPress={handleCancel}
        style={[styles.cancelButton, showCancelButton ? { display: 'flex' } : {}]}>
        <MaterialIcons
          name='cancel'
          size={20}
          style={styles.cancelButtonIcon}
          solid
        />
      </TouchableOpacity>
    </View>
  )
}
