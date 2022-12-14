import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Modal, Image, KeyboardAvoidingView, Platform, ScrollView, ActionSheetIOS, Switch } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { AuthInput } from '../AuthInput'
import { AuthContext, Post } from '../../contexts/AuthContext'
import axios from 'axios'
import { server, showError, showSuccess } from '../../common'
import { Picker } from '@react-native-picker/picker'

type Props = {
  postInfo: Post
  isVisible: boolean
  onCancel: any
  deletePost: (id: number) => void
  navigation: any
}

export const EditPost = (props: Props) => {
  const { colors } = useTheme()
  const { user, updateUser } = useContext(AuthContext)

  const [title, setTitle] = useState(props.postInfo.title)
  const [description, setDescription] = useState(props.postInfo.description)
  const [totalArea, setTotalArea] = useState(props.postInfo.totalArea)
  const [usefulArea, setUseFulArea] = useState(props.postInfo.usefulArea)
  const [bathrooms, setBathrooms] = useState(props.postInfo.bathrooms)
  const [bedrooms, setBedrooms] = useState(props.postInfo.bedrooms)
  const [suites, setSuites] = useState(props.postInfo.suites)
  const [validPost, setValidPost] = useState(false)
  const [type, setType] = useState(props.postInfo.type)
  const [price, setPrice] = useState(props.postInfo.price)
  const [sellOrRent, setSellOrRent] = useState(props.postInfo.sellOrRent)
  const [available, setAvailable] = useState(props.postInfo.available)


  const updatePost = async () => {
    const newPostInfo = {
      ...props.postInfo,
      title,
      description,
      totalArea,
      usefulArea,
      bathrooms,
      bedrooms,
      suites,
      price,
      type,
      sellOrRent,
      available
    }
    try {
      await axios.patch(`${server}/posts/${props.postInfo.id}`, newPostInfo)
      updateUser()
      props.onCancel()
      props.navigation.goBack()
      showSuccess('Post atualizado com sucesso!')
    } catch (e) {
      showError(e)
    }
  }

  const validateInputs = () => {
    const validations: boolean[] = []
    validations.push(title.length > 0 && title.length < 30)
    validations.push(type != '')
    validations.push(sellOrRent != '')
    if (price) {
      validations.push(price.length > 1 && price.length <= 15)
    } else {
      validations.push(false)
    }


    setValidPost(validations.reduce((total, current) => total && current))
  }

  useEffect(() => {
    validateInputs()
  })

  const actionSheetType = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Casa', 'Apartamento', 'Terreno', 'S??tio', 'Kitnet', 'Quarto', 'Galp??o', 'Sala comercial', 'Studio'],
        // cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            setType('Casa')
            break
          case 1:
            setType('Apartamento')
            break
          case 2:
            setType('Terreno')
            break
          case 3:
            setType('S??tio')
            break
          case 4:
            setType('Kitnet')
            break
          case 5:
            setType('Quarto')
            break
          case 6:
            setType('Galp??o')
            break
          case 7:
            setType('Sala comercial')
            break
          case 8:
            setType('Studio')
            break
          default:
            break
        }
      }
    )


  const actionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Venda', 'Aluguel'],
        // cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          setSellOrRent('Venda')
        } else if (buttonIndex === 1) {
          setSellOrRent('Aluguel')
        }
      }
    )

  const onCancel = () => {
    setTitle(props.postInfo.title)
    setDescription(props.postInfo.description)
    setTotalArea(props.postInfo.totalArea)
    setUseFulArea(props.postInfo.usefulArea)
    setBathrooms(props.postInfo.bathrooms)
    setBedrooms(props.postInfo.bedrooms)
    setSuites(props.postInfo.suites)
    setValidPost(false)
    setPrice(props.postInfo.price)
    setType(props.postInfo.type)
    setSellOrRent(props.postInfo.sellOrRent)
    props.onCancel()
  }

  const toggleAvailable = () => setAvailable(previousState => !previousState)


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
    picker: {
      marginVertical: 10,
      borderRadius: 5,
      width: 150,
      backgroundColor: '#EEE',
      color: '#333'
    },
    iosPickerButton: {
      backgroundColor: '#EEE',
      width: 150,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginVertical: 10
    },
    iosPickerText: {
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
          <Text style={styles.title}>Editar Publica????o</Text>
          <AuthInput
            icon='title'
            style={styles.input}
            placeholder='T??tulo'
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
            style={[styles.input, { height: 120}]}
            placeholder='Descri????o'
            value={description}
            onChangeText={setDescription}
            placeholderTextColor='#333'
            multiline
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
            <Text style={[styles.numberInputData, styles.aditionalInfosInputData]}>Tipo de im??vel:</Text>
            {
              Platform.OS === 'android' ? (
                <Picker
                  style={styles.picker}
                  selectedValue={type}
                  onValueChange={(itemValue, itemIndex) =>
                    setType(itemValue)
                  }>
                  <Picker.Item label="Casa" value="Casa" />
                  <Picker.Item label="Apartamento" value="Apartamento" />
                  <Picker.Item label="Terreno" value="Terreno" />
                  <Picker.Item label="S??tio" value="S??tio" />
                  <Picker.Item label="Kitnet" value="Kitnet" />
                  <Picker.Item label="Quarto" value="Quarto" />
                  <Picker.Item label="Galp??o" value="Galp??o" />
                  <Picker.Item label="Sala comercial" value="Sala comercial" />
                  <Picker.Item label="Studio" value="Studio" />
                </Picker>
              ) : (
                <TouchableOpacity onPress={actionSheetType} style={styles.iosPickerButton}>
                  <Text style={styles.iosPickerText}>{type ? type : 'Tipo de im??vel'}</Text>
                </TouchableOpacity>
              )
            }
          </View>
          <View style={styles.aditionalInfosContainer}>
            <Text style={[styles.numberInputData, styles.aditionalInfosInputData]}>Venda/Aluguel:</Text>
            {
              Platform.OS === 'android' ? (
                <Picker
                  style={[styles.picker]}
                  selectedValue={sellOrRent}
                  onValueChange={(itemValue, itemIndex) =>
                    setSellOrRent(itemValue)
                  }>
                  <Picker.Item label="Venda" value="Venda" />
                  <Picker.Item label="Aluguel" value="Aluguel" />
                </Picker>
              ) : (
                <TouchableOpacity onPress={actionSheet} style={styles.iosPickerButton}>
                  <Text style={styles.iosPickerText}>{sellOrRent ? sellOrRent : 'Venda/Aluguel'}</Text>
                </TouchableOpacity>
              )
            }
            <AuthInput
              icon='crop-din'
              style={styles.numberInputData}
              placeholder='??rea total'
              value={totalArea.toString()}
              onChangeText={setTotalArea}
              placeholderTextColor='#333'
            />
            <AuthInput
              icon='aspect-ratio'
              style={styles.numberInputData}
              placeholder='??rea ??til'
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
              placeholder='Su??tes'
              value={suites.toString()}
              onChangeText={setSuites}
              placeholderTextColor='#333'
            />
            <AuthInput
              icon='attach-money'
              style={styles.numberInputData}
              placeholder='Pre??o'
              value={price ? price : undefined}
              onChangeText={setPrice}
              placeholderTextColor='#333'
              inputMask='money'
              keyboardType='number-pad'
            />
          </View>

          <Text style={[styles.numberInputData, styles.aditionalInfosInputData]}>Im??vel vendido?</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={available ? '#FFF' : '#AAA'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleAvailable}
            value={!available}
          />


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F88' }]}
              onPress={onCancel}>
              <MaterialIcons
                name='cancel'
                size={20}
                style={styles.cancelButtonIcon}
              />
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F88' }]}
              onPress={() => { props.deletePost(props.postInfo.id) }}>
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
