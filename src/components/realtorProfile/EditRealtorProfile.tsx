import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Modal, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { AuthInput } from '../AuthInput'
import { AuthContext, User } from '../../contexts/AuthContext'
import axios from 'axios'
import { server } from '../../common'
import * as ImagePicker from 'expo-image-picker'
import { Masks } from 'react-native-mask-input'

type Props = {
  // icon: keyof typeof MaterialIcons.glyphMap
  isVisible: boolean
  onCancel: any,
  logout: any,
  userInfo: User,
  handleSaveEdit: (name: string, email: string, phone: string, bio: string, photo?: string) => void,
}

export const EditRealtorProfile = (props: Props) => {
  const { colors } = useTheme()
  const { user, setUser } = useContext(AuthContext)

  const [name, setName] = useState(props.userInfo.name)
  const [email, setEmail] = useState(props.userInfo.email)
  const [phone, setPhone] = useState(props.userInfo.phone)
  const [bio, setBio] = useState(props.userInfo.bio)
  const [previewPhoto, setPreviewPhoto] = useState(props.userInfo.photo)
  const [photo, setPhoto] = useState<any>()
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const updateUser = async () => {
      const currentUserInfo = await (await axios.get(`${server}/users/${user.id}`)).data
      setUser(currentUserInfo)
      setName(currentUserInfo.name)
      setEmail(currentUserInfo.email)
      setPhone(currentUserInfo.phone)
      setBio(currentUserInfo.bio)
      // setPhoto(currentUserInfo.photo)
      setPreviewPhoto(currentUserInfo.photo)
    }
    updateUser()
  }, [props.isVisible])

  const selectProfilePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    })

    if (!result.cancelled) {
      setPhoto(result)
      setPreviewPhoto(result.uri)
    }
  }

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
        style={{ flexGrow: 1 }}>
        <ScrollView keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.container}
        >
          <Text style={styles.title}>Editar perfil</Text>
          <View style={styles.editInfosContainer}>
            <TouchableOpacity onPress={selectProfilePhoto}>
              <View style={{ alignItems: 'center' }}>

                <Image
                  style={styles.profilePicture}
                  source={{ uri: previewPhoto }} />

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
              mask={Masks.BRL_PHONE}
              keyboardType='phone-pad'
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
                props.handleSaveEdit(name, email, phone, bio, photo)
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}
