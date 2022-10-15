import { View, StyleSheet, TouchableOpacity, Text, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

type Props = {
  isVisible: boolean
  onCancel: () => void,
}

export const FilterModal = (props: Props) => {
  const { colors } = useTheme()

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
      marginBottom: 20
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
                // props.handleSaveEdit(name, email, phone, bio, photo)
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
