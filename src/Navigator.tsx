import React, { useState, useEffect } from 'react'
import { CompositeScreenProps, NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { Auth } from './screens/Auth'
import { Feed } from './screens/Feed'
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { StatusBar, useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Profile } from './screens/Profile'
import { Search } from './screens/Search'
import { Publication } from './screens/Publication'
import AuthProvider, { Post, User } from './contexts/AuthContext'
import { Post as PostScreen } from './screens/Post'



export type StackParamList = {
  Auth: undefined,
  Home: NavigatorScreenParams<BottomTabParamList>,
}
export type FeedStackParamList = {
  Feed: undefined
  Post: { post: Post, user: User },
}

export type BottomTabParamList = {
  FeedRoutes: NavigatorScreenParams<FeedStackParamList>,
  Search: undefined
  Publication: undefined
  Profile: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()
const FeedStack = createNativeStackNavigator<FeedStackParamList>()
const BottomTab = createBottomTabNavigator<BottomTabParamList>()


type FeedRoutesScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'FeedRoutes'>,
  NativeStackScreenProps<StackParamList>
>

const FeedRoutes: React.FC<FeedRoutesScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return (
    <FeedStack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Feed">
      {/* <Stack.Screen
        name="AuthOrApp"
        component={AuthOrApp}
      /> */}
      <FeedStack.Screen
        name="Feed"
        component={Feed}
        options={{ headerShown: false }}
      />
      <FeedStack.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({ title: route.params.post.title })}
      />
    </FeedStack.Navigator>
  )
}

const HomeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamList, 'Home'>) => {
  return (
    <BottomTab.Navigator
      initialRouteName="FeedRoutes"
      backBehavior='initialRoute'
      screenOptions={
        {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#0096FF'
        }
      }>
      {/* <BottomTab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons
              name='home'
              size={size}
              color={color}
            />
          }
        }}
      /> */}
      <BottomTab.Screen
        name="FeedRoutes"
        component={FeedRoutes}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons
              name='home'
              size={size}
              color={color}
            />
          }
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons
              name='search'
              size={size}
              color={color}
            />
          }
        }}
      />
      <BottomTab.Screen
        name="Publication"
        component={Publication}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons
              name='add'
              size={size}
              color={color}
            />
          }
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
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
    <AuthProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        initialRouteName="Auth">
        {/* <Stack.Screen
        name="AuthOrApp"
        component={AuthOrApp}
      /> */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ contentStyle: { alignItems: 'center' } }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </AuthProvider>
  )
}

export const Navigator: React.FC = () => {
  let theme = useColorScheme() === 'dark' ? CustomDarkTheme : CustomDefaultTheme

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor='#0096FF' />
      <AuthNavigator />
    </NavigationContainer>
  )
}

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#333',
    primary: '#0096FF'
  }
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#333',
    text: '#fff',
    primary: '#0096FF'
  }
}