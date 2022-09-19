import React, { useEffect, useContext } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../Navigator'
import { server } from '../common'
import { AuthContext } from '../contexts/AuthContext'
import jwtDecode from 'jwt-decode'

type AuthScreenProps = NativeStackScreenProps<StackParamList, 'AuthOrApp'>

export const AuthOrApp: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext)
  useEffect(() => {
    const getData = async () => {
      const userDataJson = await AsyncStorage.getItem('userData')
      let userData = null
      try {
        userData = JSON.parse(userDataJson!)
      } catch (e) {
        // userData invalid
      }

      if (userData && userData.token) {
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `bearer ${userData.token}`
        const userDecoded: { id: number, iat: number } = jwtDecode(userData.token)
        const currentUserInfo = await (await axios.get(`${server}/users/${userDecoded.id}`)).data
        setUser(currentUserInfo)

        navigation.navigate('Home', { screen: 'Feed' })
      } else {
        navigation.navigate('Auth')
      }
    }
    getData()
  }, [])


  return (<View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
})
