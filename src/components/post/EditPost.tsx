import { useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Modal, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { AuthInput } from '../AuthInput'
import { AuthContext, Post, User } from '../../contexts/AuthContext'
import axios from 'axios'
import { server, showError, showSuccess } from '../../common'

type Props = {
  postInfo: Post,
  isVisible: boolean
  onCancel: any,
  deletePost: (id: number) => void
}

export const EditPost = (props: Props) => {
  const { colors } = useTheme()
  const { user, updateUser } = useContext(AuthContext)

  const [title, setTitle] = useState(props.postInfo.title)
  // const [image, setImage] = useState('https://picsum.photos/id/1015/600')
  const [description, setDescription] = useState(props.postInfo.description)
  const [totalArea, setTotalArea] = useState(props.postInfo.totalArea)
  const [usefulArea, setUseFulArea] = useState(props.postInfo.usefulArea)
  const [bathrooms, setBathrooms] = useState(props.postInfo.bathrooms)
  const [bedrooms, setBedrooms] = useState(props.postInfo.bedrooms)
  const [suites, setSuites] = useState(props.postInfo.suites)
  const [validPost, setValidPost] = useState(false)

  const updatePost = async () => {
    const newPostInfo = {
      ...props.postInfo,
      title,
      description,
      totalArea,
      usefulArea,
      bathrooms,
      bedrooms,
      suites
    }
    try {
      await axios.patch(`${server}/users/${user.id}`, newPostInfo)
      showSuccess('Perfil atualizado com sucesso!')
    } catch (e) {
      showError(e)
    }
  }

  const validateInputs = () => {
    const validations: boolean[] = []
    validations.push(title.length > 0 && title.length < 20)
    // validations.push(image.length > 0)

    setValidPost(validations.reduce((total, current) => total && current))
  }

  const handleSaveEdit = async (name: string, email: string, phone: string, bio: string, photo?: string) => {
    const newUserInfo = {
      ...user,
      name,
      email,
      phone,
      bio
    }
    try {
      await axios.patch(`${server}/users/${user.id}`, newUserInfo)
      showSuccess('Perfil atualizado com sucesso!')
    } catch (e) {
      showError(e)
    }
  }
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      justifyContent: 'center'
    },
    scrollContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1
    },
    title: {
      fontSize: 22,
      color: colors.text,
      marginTop: 10,
    },
    aditionalInfosContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '90%',
      alignItems: 'center',
      backgroundColor: 'red'
    },
    aditionalInfosInputData: {
      color: colors.text,
      fontSize: 17,
      textAlign: 'center'
    },
    numberInputData: {
      width: 150,
      borderRadius: 5,
      marginVertical: 10
    },
    input: {
      marginVertical: 10,
      borderRadius: 5,
      width: '90%'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
      marginTop: 10
    },
    button: {
      width: 100,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 10,
      borderRadius: 8,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Editar Publicação</Text>
          <AuthInput
            icon='title'
            style={styles.input}
            placeholder='Título'
            value={title}
            onChangeText={setTitle}
            placeholderTextColor='#333'
          />
          {/* <AuthInput
              icon='photo'
              style={styles.input}
              placeholder='Foto'
              value={image}
              onChangeText={setImage}
              placeholderTextColor='#333'
            /> */}
          <AuthInput
            icon='description'
            style={styles.input}
            placeholder='Descrição'
            value={description}
            onChangeText={setDescription}
            placeholderTextColor='#333'
          />

          <View style={styles.aditionalInfosContainer}>
            <Text style={[styles.numberInputData, styles.aditionalInfosInputData]}>Informações Adicionais:</Text>
            <AuthInput
              icon='crop-din'
              style={styles.numberInputData}
              placeholder='Área total'
              value={totalArea.toString()}
              onChangeText={setTotalArea}
              placeholderTextColor='#333'
            />
            <AuthInput
              icon='aspect-ratio'
              style={styles.numberInputData}
              placeholder='Área útil'
              value={usefulArea.toString()}
              onChangeText={setUseFulArea}
              placeholderTextColor='#333'
            />
            <AuthInput
              icon='bathtub'
              style={styles.numberInputData}
              placeholder='Banheiro(s)'
              value={bathrooms.toString()}
              onChangeText={setBathrooms}
              placeholderTextColor='#333'
            />
            <AuthInput
              icon='airline-seat-individual-suite'
              style={styles.numberInputData}
              placeholder='Quarto(s)'
              value={bedrooms.toString()}
              onChangeText={setBedrooms}
              placeholderTextColor='#333'
            />
            <AuthInput
              icon='king-bed'
              style={styles.numberInputData}
              placeholder='Suítes'
              value={suites.toString()}
              onChangeText={setSuites}
              placeholderTextColor='#333'
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F88' }]}
              onPress={props.onCancel}>
              <MaterialIcons
                name='cancel'
                size={20}
                style={styles.cancelButtonIcon}
              />
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F88' }]}
              onPress={() => {props.deletePost(props.postInfo.id)}}>
              <MaterialIcons
                name='delete'
                size={20}
                style={styles.cancelButtonIcon}
              />
              <Text>Apagar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, validPost ? { backgroundColor: '#8F8' } : { backgroundColor: '#AAA' }]}
              onPress={updatePost}
              disabled={!validPost}>
              <MaterialIcons
                name='save'
                size={20}
                style={styles.cancelButtonIcon}
              />
              <Text>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}
