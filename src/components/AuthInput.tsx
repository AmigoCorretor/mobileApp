import { View, TextInput, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  icon:  keyof typeof MaterialIcons.glyphMap
  style: object
  placeholder: string
  value: string
  onChangeText: any
  secureTextEntry?: boolean
  placeholderTextColor?: string
}

export const AuthInput = (props: Props) => {
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
      />
    </View>
  )
}

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
})
