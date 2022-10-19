import { View, StyleSheet, TouchableOpacity, Text, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import React, { useState } from 'react'

type Props = {
  isVisible: boolean
  onCancel: () => void,
  handleFilter: (house: boolean, apartment: boolean, land: boolean, farm: boolean, kitnet: boolean, room: boolean, shed: boolean, mall: boolean, studio: boolean) => void
}

export const FilterModal = (props: Props) => {
  const { colors } = useTheme()

  const [house, setHouse] = useState(false)
  const [apartment, setApartment] = useState(false)
  const [land, setLand] = useState(false)
  const [farm, setFarm] = useState(false)
  const [kitnet, setKitnet] = useState(false)
  const [room, setRoom] = useState(false)
  const [shed, setShed] = useState(false)
  const [mall, setMall] = useState(false)
  const [studio, setStudio] = useState(false)

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
    title: {
      color: colors.text,
      fontSize: 22,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '90%',
      marginVertical: 20
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '45%',
      marginVertical: 5
    },
    itemTitle: {
      color: colors.text,
      fontSize: 18,
    },
    icon: {
      color: '#333',
      marginLeft: 20,
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
          <Text style={styles.title}>Filtrar publicações</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.item}>
              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setHouse(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={house}
              />
              <Text style={styles.itemTitle}>Casa</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setApartment(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={apartment}
              />
              <Text style={styles.itemTitle}>Apartamento</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setLand(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={land}
              />
              <Text style={styles.itemTitle}>Terreno</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setFarm(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={farm}
              />
              <Text style={styles.itemTitle}>Sítio</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setKitnet(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={kitnet}
              />
              <Text style={styles.itemTitle}>Kitnet</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setRoom(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={room}
              />
              <Text style={styles.itemTitle}>Quarto</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setShed(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={shed}
              />
              <Text style={styles.itemTitle}>Galpão</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setMall(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={mall}
              />
              <Text style={styles.itemTitle}>Sala comercial</Text>
            </View>
            <View style={styles.item}>

              <BouncyCheckbox
                onPress={(isChecked: boolean) => { setStudio(isChecked) }}
                size={30}
                fillColor={colors.primary}
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 0 }}
                isChecked={studio}
              />
              <Text style={styles.itemTitle}>Studio</Text>
            </View>
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
                props.handleFilter(house, apartment, land, farm, kitnet, room, shed, mall, studio)
                props.onCancel()
              }}>
              <MaterialIcons
                name='save'
                size={20}
                style={styles.buttonIcon}
              />
              <Text>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}
