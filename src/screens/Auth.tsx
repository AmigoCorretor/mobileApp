import { useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { AuthInput } from '../components/AuthInput'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { server, showError, showSuccess } from '../common'

export const Auth: React.FC = (props) => {
  const [stageNew, setStageNew] = useState(false)
  const [name, setName] = useState('Gustavo')
  const [email, setEmail] = useState('gustavo@gmail.com')
  const [password, setPassword] = useState('123456')
  const [confirmPassword, setConfirmPassword] = useState('123456')
  const [isRealtor, setIsRealtor] = useState(false)
  const [validForm, setValidForm] = useState(false)

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
    // console.warn("LOGIN")
    try {     
      const res = await axios.post(`${server}/users/login`, {
        email,
        password,
      })
      console.warn(JSON.stringify(res.data))

      // AsyncStorage.setItem('userData', JSON.stringify(res.data))
      // axios.defaults.headers.common[
      //   'Authorization'
      // ] = `bearer ${res.data.token}`
      // props.navigation.navigate('Home', res.data)
    } catch (e) {
      showError(e)
    }
  }

  const toggleIsRealtor = () => setIsRealtor(previousState => !previousState)
  
  useEffect(() => {
    const validations = []
    validations.push(email && email.includes('@'))
    validations.push(password && password.length >= 6)

    if (stageNew) {
      validations.push(name && name.trim().length >= 3)
      validations.push(password === confirmPassword)
    }

    setValidForm(validations.reduce((total, current) => total && current) as boolean)
  })
  
  const validateInputs = () => {
    console.warn("teste")
  }

  return (
    <View style={styles.container}>
      <Text>{stageNew ? 'Crie a sua conta' : 'Fazer login'}</Text>
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
          <Text>Você é corretor?</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#CCC',
  },
  buttonText: {},
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
