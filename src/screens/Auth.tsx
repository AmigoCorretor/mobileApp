import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthInput } from '../components/AuthInput'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { server, showError, showSuccess, UserLogin } from '../common'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'


type AuthScreenProps = NativeStackScreenProps<StackParamList, 'Auth'>

export const Auth = ({ navigation }: AuthScreenProps) => {
  const [stageNew, setStageNew] = useState(false)
  const [name, setName] = useState('Gustavo')
  const [email, setEmail] = useState('gustavo@gmail.com')
  const [password, setPassword] = useState('123456')
  const [confirmPassword, setConfirmPassword] = useState('123456')
  const [isRealtor, setIsRealtor] = useState(false)
  const [validForm, setValidForm] = useState(false)

  const { colors } = useTheme()
  const theme = useTheme()

  const loginOrSignup = () => {
    if (stageNew) {
      signUp()
    } else {
      login()
    }
  }

  const signUp = async () => {
    try {
      await axios.post(`${server}/users`, {
        name,
        email,
        password,
        isRealtor
      })

      showSuccess('Usuário castrado!')
    } catch (e) {
      showError(e)
    }
  }

  const login = async () => {
    try {     
      const res = await axios.post<UserLogin>(`${server}/users/login`, {
        email,
        password,
      })
      
      AsyncStorage.setItem('userData', JSON.stringify(res.data))

      console.warn(jwtDecode(res.data.token))

      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `bearer ${res.data.token}`
      navigation.navigate('Home', {
        screen: 'Feed',
        params: res.data
      })

    } catch (e) {
      showError(e)
    }
  }

  const toggleIsRealtor = () => setIsRealtor(previousState => !previousState)
  
  useEffect(() => {
    validateInputs()
  })
  
  const validateInputs = () => {
    const validations = []
    validations.push(email && email.includes('@'))
    validations.push(password && password.length >= 6)

    if (stageNew) {
      validations.push(name && name.trim().length >= 3)
      validations.push(password === confirmPassword)
    }

    setValidForm(validations.reduce((total, current) => total && current) as boolean)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '90%' ,
      backgroundColor: colors.background,
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
      backgroundColor: '#CCC',
    },
    buttonText: {
      color: colors.text,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent: 'space-around',
      width: '50%',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#080',
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    buttonIcon: {
      marginRight: 10,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{stageNew ? 'Crie a sua conta' : 'Fazer login'}</Text>
      {stageNew && (
        <AuthInput
          icon="person"
          placeholder="Nome"
          value={name}
          style={styles.input}
          onChangeText={setName}
        />
      )}

      <AuthInput
        icon="email"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <AuthInput
        icon="lock"
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {stageNew && (
        <AuthInput
          icon="lock"
          placeholder="Confirmar senha"
          value={confirmPassword}
          style={styles.input}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      )}
      {stageNew && (
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Você é corretor?</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isRealtor ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleIsRealtor}
            value={isRealtor}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={loginOrSignup}
        disabled={!validForm}>
        <View
          style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
          <MaterialIcons
            name="login"
            size={20}
            color="#FFF"
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
    </SafeAreaView>
  )
  
}

