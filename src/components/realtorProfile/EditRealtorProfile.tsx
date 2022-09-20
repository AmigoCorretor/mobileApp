import { View, StyleSheet, TouchableOpacity, Text, Modal, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { AuthInput } from '../AuthInput'
import { User } from '../../contexts/AuthContext'

type Props = {
  // icon: keyof typeof MaterialIcons.glyphMap
  isVisible: boolean
  onCancel: any,
  logout: any,
  userInfo: User,
  handleSaveEdit: (name: string, email: string, phone: string, bio: string, photo?: string) => void
}

export const EditRealtorProfile = (props: Props) => {
  const { colors } = useTheme()

  const [name, setName] = useState(props.userInfo.name)
  const [email, setEmail] = useState(props.userInfo.email)
  const [phone, setPhone] = useState(props.userInfo.phone)
  const [bio, setBio] = useState(props.userInfo.bio)
  // const [password, setPassword] = useState('123456')
  // const [confirmPassword, setConfirmPassword] = useState('123456')

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
      // height: '100%',
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
      width: '85%',
      borderRadius: 5,
      marginVertical: 5
    },
    title: {
      color: colors.text,
      fontSize: 22,
      marginBottom: 20
    },
    subTitle: {
      color: colors.text,
      fontSize: 18
    },
    editInfosContainer: {
      alignItems: 'center',
      width: '100%',
      marginBottom: 20
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    buttonsContainer: {
      width: '85%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
      width: 100,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 10,
      borderRadius: 8
    },
    buttonIcon: {
      color: '#333',
    },
  })
  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>

        <Text style={styles.title}>Editar perfil</Text>
        <View style={styles.editInfosContainer}>
          <TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Image
                style={styles.profilePicture}
                source={{ uri: props.userInfo.photo }} />
              <Text style={styles.subTitle}>Troca foto de perfil</Text>
            </View>
          </TouchableOpacity>
          <AuthInput
            value={name}
            onChangeText={setName}
            icon='person'
            placeholder='Nome'
            style={styles.input} placeholderTextColor='#333' />
          <AuthInput
            value={email}
            onChangeText={setEmail}
            icon='email'
            placeholder='Email'
            style={styles.input} placeholderTextColor='#333' />
          <AuthInput
            value={phone}
            onChangeText={setPhone}
            icon='phone'
            placeholder='Telefone'
            style={styles.input} placeholderTextColor='#333' />
          <AuthInput
            value={bio}
            onChangeText={setBio}
            icon='description'
            placeholder='Biografia'
            style={[styles.input, { height: 120 }]}
            multiline />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F88' }]}
            onPress={props.onCancel}>
            <MaterialIcons
              name='cancel'
              size={20}
              style={styles.buttonIcon}
            />
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#8F8' }]}
            onPress={() => {
              props.handleSaveEdit(name, email, phone, bio)
              props.onCancel()
            }}>
            <MaterialIcons
              name='save'
              size={20}
              style={styles.buttonIcon}
            />
            <Text>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={props.logout}>
            <MaterialIcons
              name='logout'
              size={20}
              style={styles.buttonIcon}
            />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
