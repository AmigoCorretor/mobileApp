import { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Animated, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthInput } from '../components/AuthInput'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { server, showError, showSuccess, UserLogin } from '../common'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '../contexts/AuthContext'


type AuthScreenProps = NativeStackScreenProps<StackParamList, 'Auth'>

export const Auth = ({ navigation }: AuthScreenProps) => {
  const [stageNew, setStageNew] = useState(false)
  const [name, setName] = useState('Gustavo')
  const [email, setEmail] = useState('gustavo@gmail.com')
  const [password, setPassword] = useState('123456')
  const [confirmPassword, setConfirmPassword] = useState('123456')
  const [isRealtor, setIsRealtor] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [creci, setCreci] = useState('')

  const { colors } = useTheme()
  const theme = useTheme()

  const { user, setUser, loggedUser, setLoggedUser } = useContext(AuthContext)

  let position = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start()
  })

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (loggedUser) {
        // navigation.dispatch(e.data.action)
        return
      }
      e.preventDefault()

      // Alert.alert(
      //   'Sair?',
      //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
      //   [
      //     { text: "Não sair", style: 'cancel', onPress: () => { } },
      //     {
      //       text: 'Sair',
      //       style: 'destructive',
      //       // If the user confirmed, then we dispatch the action we blocked earlier
      //       // This will continue the action that had triggered the removal of the screen
      //       onPress: () => navigation.dispatch(e.data.action),
      //     },
      //   ]
      // )
    })
  }, [loggedUser])

  const loginOrSignup = () => {
    if (stageNew) {
      signUp()
    } else {
      login()
    }
  }

  const signUp = async () => {
    let user: {
      name: string,
      email: string
      password: string
      isRealtor: boolean,
      creci?: string
    } = {
      name,
      email,
      password,
      isRealtor
    }
    if (isRealtor) {
      user = { ...user, creci }
    }
    // try {
    await axios.post(`${server}/users`, user)
      .then(_ => showSuccess('Usuário castrado!'))
      .catch(e => showError(e))
    // showSuccess('Usuário castrado!')
    // } catch (e) {
    //   // showError(e)
    // }
  }

  const login = async () => {
    try {
      const res = await axios.post<UserLogin>(`${server}/users/login`, {
        email,
        password,
      })

      const userDecoded: { id: number, iat: number } = jwtDecode(res.data.token)
      const currentUserInfo = await (await axios.get(`${server}/users/${userDecoded.id}`)).data
      setUser(currentUserInfo)

      setLoggedUser(JSON.stringify(res.data))
      await AsyncStorage.setItem('userData', JSON.stringify(res.data))
      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `bearer ${res.data.token}`
      navigation.navigate('Home', { screen: 'Feed' })
    } catch (e) {
      showError(e)
    }
  }
  const toggleIsRealtor = () => setIsRealtor(previousState => !previousState)

  useEffect(() => {
    validateInputs()
  })

  const validateInputs = () => {
    const validations: boolean[] = []
    validations.push(email.includes('@'))
    validations.push(password.length >= 6)

    if (stageNew) {
      validations.push(name.trim().length >= 3)
      validations.push(password === confirmPassword)
      if (isRealtor) {
        validations.push(creci.trim().length >= 5 && creci.trim().length <= 10)
      }
    }

    setValidForm(validations.reduce((total, current) => total && current) as boolean)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      // backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
      fontSize: 24
    },
    text: {
      color: colors.text,
      fontSize: 18
    },
    input: {
      marginTop: 10,
      backgroundColor: '#EFEFEF',
    },
    buttonText: {
      color: colors.text,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent: 'space-around',
      width: '60%',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,

    },
    buttonIcon: {
      marginRight: 10,
      color: theme.dark ? '#FFF' : '#000',
    },
    background: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30

    },

  })

  return (
    <Animated.View style={styles.container}>
      <LinearGradient
        colors={theme.dark ? [colors.primary, '#332657'] : [colors.primary, '#F2F2F2']}
        start={[0.1, 0.1]}
        style={styles.background}
      >
        <Animated.View style={[styles.container, position.getLayout()]}>

          <Text style={styles.title}>{stageNew ? 'Crie a sua conta' : 'Fazer login'}</Text>
          {stageNew && (
            <AuthInput
              icon='person'
              placeholder='Nome'
              value={name}
              style={styles.input}
              onChangeText={setName}
              placeholderTextColor='#333'
            />
          )}

          <AuthInput
            icon='email'
            style={styles.input}
            placeholder='E-mail'
            value={email}
            onChangeText={setEmail}
            placeholderTextColor='#333'
          />
          <AuthInput
            icon='lock'
            style={styles.input}
            placeholder='Senha'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor='#333'
          />
          {stageNew && (
            <AuthInput
              icon='lock'
              placeholder='Confirmar senha'
              value={confirmPassword}
              style={styles.input}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              placeholderTextColor='#333'
            />
          )}
          {stageNew && (
            <View style={styles.switchContainer}>
              <Text style={styles.text}>Você é corretor?</Text>
              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={isRealtor ? '#FFF' : '#AAA'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleIsRealtor}
                value={isRealtor}
              />
            </View>
          )}
          {(stageNew && isRealtor) && (
            <AuthInput
              icon='vpn-key'
              placeholder='CRECI'
              value={creci}
              style={[styles.input, { width: '60%' }]}
              onChangeText={setCreci}
              placeholderTextColor='#333'
              textInputStyle={{ width: '55%' }}
            />
          )}

          <TouchableOpacity
            onPress={loginOrSignup}
            disabled={!validForm}>
            <View
              style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
              <MaterialIcons
                name='login'
                size={20}
                color='#FFF'
                style={styles.buttonIcon}
                solid
              />
              <Text style={styles.buttonText}>
                {stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => setStageNew(!stageNew)}>
            <Text style={styles.buttonText}>
              {stageNew ? 'Já possui conta? Fazer login' : 'Criar nova conta'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  )

}
