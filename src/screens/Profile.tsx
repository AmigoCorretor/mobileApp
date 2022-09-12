import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { BottomTabParamList, StackParamList } from '../Navigator'
import { useTheme } from '@react-navigation/native'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<StackParamList>
>
// type Props = BottomTabScreenProps<BottomTabParamList, 'Profile'>

export const Profile: React.FC<ProfileScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      color: colors.text,
    },
    text: {
      fontSize: 18,
      color: colors.text,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </SafeAreaView>
  )
}
