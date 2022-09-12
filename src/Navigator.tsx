import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { Auth } from './screens/Auth'
import { UserLogin } from './common'
import { Feed } from './screens/Feed'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { StatusBar, useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Profile } from './screens/Profile'


export type StackParamList = {
  Auth: undefined,
  Home: NavigatorScreenParams<BottomTabParamList>,
}

export type BottomTabParamList = {
  Feed: UserLogin,
  Search: undefined
  NewPost: undefined
  Notifications: undefined
  Profile: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()
const BottomTab = createBottomTabNavigator<BottomTabParamList>()

const HomeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamList, 'Home'>) => {
  return (
    <BottomTab.Navigator
     initialRouteName="Feed"
     screenOptions={
      { 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'orange'
        }
      }>
      <BottomTab.Screen
        name="Feed"
        component={Feed}
        options={{tabBarIcon: ({focused, color, size}) => {
          return <MaterialIcons
          name='home'
          size={size}
          color={color}
        />
        }
      }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarIcon: ({focused, color, size}) => {
          return <MaterialIcons
          name='person'
          size={size}
          color={color}
        />
        }
      }}
      />
    </BottomTab.Navigator>
  )
}

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
        options={{contentStyle: { alignItems: 'center'}}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  )
}

export const Navigator: React.FC = () => {
  let theme = useColorScheme() === 'dark' ? CustomDarkTheme : CustomDefaultTheme

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      <AuthNavigator />
    </NavigationContainer>
  )
}

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#333'
  }
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#333',
    text: '#fff'
  }
}