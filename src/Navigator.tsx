import React, { useState, useEffect } from 'react'
import { CompositeScreenProps, NavigationContainer, useTheme } from '@react-navigation/native'
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
import { AuthOrApp } from './screens/AuthOrApp'



export type StackParamList = {
  AuthOrApp: undefined
  Auth: undefined
  Home: NavigatorScreenParams<BottomTabParamList>
  Post: {
    user: User,
    post: Post
  }
}
// export type FeedStackParamList = {
//   Feed: undefined
//   Post: { post: Post, user: User },
// }

export type BottomTabParamList = {
  // FeedRoutes: NavigatorScreenParams<FeedStackParamList>,
  Feed: undefined
  Search: undefined
  Publication: undefined
  Profile: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()
// const FeedStack = createNativeStackNavigator<FeedStackParamList>()
const BottomTab = createBottomTabNavigator<BottomTabParamList>()


// type FeedRoutesScreenNavigationProp = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabParamList, 'FeedRoutes'>,
//   NativeStackScreenProps<StackParamList>
// >

// const FeedRoutes: React.FC<FeedRoutesScreenNavigationProp> = ({
//   navigation,
//   route,
// }) => {
//   return (
//     <FeedStack.Navigator
//       // screenOptions={{ headerShown: false }}
//       initialRouteName="Feed">
//       {/* <Stack.Screen
//         name="AuthOrApp"
//         component={AuthOrApp}
//       /> */}
//       <FeedStack.Screen
//         name="Feed"
//         component={Feed}
//         options={{ headerShown: false }}
//       />
//       <FeedStack.Screen
//         name="Post"
//         component={PostScreen}
//         options={({ route }) => ({ title: route.params.post.title })}
//       />
//     </FeedStack.Navigator>
//   )
// }

const HomeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamList, 'Home'>) => {
  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
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
        name="Feed"
        component={Feed}
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

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AuthNavigator = () => {
  const { colors } = useTheme()
  return (
    <AuthProvider>
      <Stack.Navigator
        screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal', animation: 'fade' }}
        initialRouteName="AuthOrApp">
        <Stack.Screen
          name="AuthOrApp"
          component={AuthOrApp}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ contentStyle: { alignItems: 'center' }, headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={({ route }) => ({ title: route.params.post.title, gestureEnabled: true, gestureDirection: 'horizontal', animation: 'slide_from_right', headerTransparent: true, headerStyle: { backgroundColor: `${colors.background}7` } })}
        />
      </Stack.Navigator>
    </AuthProvider>
  )
}

export const Navigator: React.FC = () => {
  let theme = useColorScheme() === 'dark' ? CustomDarkTheme : CustomDefaultTheme

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.primary} />
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