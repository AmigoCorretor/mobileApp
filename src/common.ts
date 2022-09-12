import { Alert, Platform } from 'react-native'

const server =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.1.254:3000'

function showSuccess(msg: string) {
  Alert.alert('Sucesso!', msg)
}

function showError(err: any) {
  if (err.response && err.response.data) {
    Alert.alert(
      'Ops! Ocorreu um problema!',
      `Mensagem: ${err.response.data.message}`
    )
  } else {
    Alert.alert(
      'Ops! Ocorreu um problema inesperado!',
      `Código do erro: ${err.response.status}, contate o suporte`
    )
  }
}

// types:

interface UserLogin {
  payload: {
    name: string
    email: string
    isRealtor: boolean
  }
  token: string
}

export { server, showSuccess, showError, UserLogin }
