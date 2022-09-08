import { useState } from 'react'
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRealtor, setIsRealtor] = useState(false)

  const toggleIsRealtor = () => setIsRealtor(previousState => !previousState)

  return (
    <View style={styles.container}>
      <Text>Cadastrar</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isRealtor ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleIsRealtor}
        value={isRealtor}
      />
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
})
