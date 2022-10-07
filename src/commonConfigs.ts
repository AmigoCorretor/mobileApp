// Rename this file to common.ts and change the IP for your local ip address
// If you are using IOS emulator use http://localhost:3000. For android emulator
// use you local IP.
// If you are using expo go in a real smartphone, use you pc IP for both IOS and Android
import { Alert, Platform } from 'react-native'

const server =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://xxx.xxx.xxx.xxx:3000'

export const FIREBASE_API_KEY=''
export const FIREBASE_AUTHDOMAIN=''
export const FIREBASE_PROJECTID=''
export const FIREBASE_STORAGEBUCKET=''
export const FIREBASE_MESSAGINGSENDERID=''
export const FIREBASE_APPID=''

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
