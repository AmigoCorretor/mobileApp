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


export type StackParamList = {
  Auth: undefined, // Feed do artigo
  Home: NavigatorScreenParams<BottomTabParamList>, // MainNav do artigo
  // MainNav: NavigatorScreenParams<BottomTabParamList>;
  // Feed: undefined;
}

export type BottomTabParamList = {
  Feed: UserLogin,
  Search: undefined
  NewPost: undefined
  Notifications: undefined
  Profile: undefined
  
  // Home: undefined;
  // Profile: undefined
  // Settings: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>()
const BottomTab = createBottomTabNavigator<BottomTabParamList>()

// MainNav do artigo
const HomeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamList, 'Home'>) => {
  return (
    <BottomTab.Navigator initialRouteName="Feed">
      <BottomTab.Screen
        name="Feed"
        component={Feed}
      />
    </BottomTab.Navigator>
  )
}

// "PAI" do artigo
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { alignItems: 'center'} }}
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