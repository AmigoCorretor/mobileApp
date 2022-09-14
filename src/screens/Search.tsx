import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthInput } from '../components/AuthInput'
import { useState } from 'react'

type SearchScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Search'>,
  NativeStackScreenProps<StackParamList>
>
// type Props = BottomTabScreenProps<BottomTabParamList, 'Search'>

export const Search: React.FC<SearchScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const [searchInput, setSearchInput] = useState('')
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 24,
      color: colors.text,
    },
    text: {
      fontSize: 18,
      color: colors.text,
    },
    searchInputView: {
      // marginTop: 30,
      width: '70%'
    },
    cancelButtonText:{
      color: colors.text
    },
    cancelButton:{

    },
    searchInputContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      justifyContent: 'space-around',
      width:'93%'
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <AuthInput
          icon='search'
          style={styles.searchInputView}
          placeholder='Pesquisar'
          value={searchInput}
          onChangeText={setSearchInput}
          placeholderTextColor="#000"
        />
        
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
