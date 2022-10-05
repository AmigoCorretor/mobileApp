import { View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, KeyboardType } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { TextInputMask } from 'react-native-masked-text'

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap
  style: object
  textInputStyle?: object
  placeholder: string
  value: string | undefined
  onChangeText: any
  secureTextEntry?: boolean
  placeholderTextColor?: string
  showCancelButton?: boolean
  autoFocus?: boolean
  closeKeyboardOnCancel?: boolean
  multiline?: boolean
  inputMask?: string
  keyboardType?: KeyboardType
}

export const AuthInput = (props: Props) => {
  const [showCancelButton, setShowCancelButton] = useState(false)
  const localInputRef = useRef<TextInput>()

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
    innerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#333',
      marginLeft: 20,
    },
    input: {
      paddingLeft: 5,
      width: '70%',
    },
    cancelButton: {
      display: 'none',
      position: 'absolute',
      right: 10
    },
    cancelButtonIcon: {
      color: '#333',
    },
  })
  return (

    <TouchableWithoutFeedback onPress={() => { localInputRef.current!.focus() }}>
      <View style={[styles.container, props.style]}>
        <MaterialIcons
          name={props.icon}
          size={20}
          style={styles.icon}
          onPress={() => { localInputRef.current!.focus() }}
        />
        {/* <TextInput
          {...props}
          style={[styles.input, props.textInputStyle]}
          onFocus={() => setShowCancelButton(true)}
          onBlur={() => setShowCancelButton(false)}
          ref={(ref) => {
            localInputRef && (localInputRef.current = ref as any)
          }}
        /> */}
        <TextInputMask
          {...props}
          type={props.inputMask ? props.inputMask : 'custom'}
          options={{
            /**
             * mask: (String | required | default '')
             * the mask pattern
             * 9 - accept digit.
             * A - accept alpha.
             * S - accept alphanumeric.
             * * - accept all, EXCEPT white space.
            */
            mask: '******************************'
          }}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          style={[styles.input, props.textInputStyle]}
          onFocus={() => setShowCancelButton(true)}
          onBlur={() => setShowCancelButton(false)}
          ref={(ref) => {
            localInputRef && (localInputRef.current = ref as any)
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
    </TouchableWithoutFeedback>
  )
}
