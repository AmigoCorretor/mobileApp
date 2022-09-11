import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Auth } from './screens/Auth'
import { RootStackParamList } from './common'
import { Home } from './screens/Home'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Auth">
      {/* <Stack.Screen
        name="AuthOrApp"
        component={AuthOrApp}
      /> */}
      <Stack.Screen
        name="Auth"
        component={Auth}
      />
      <Stack.Screen
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  )
}

export const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}
