import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { User } from '../../contexts/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  userInfo: User,
  setShowLogoutModal: (show: boolean) => void
}
export const RealtorProfile: React.FC<Props> = ({ userInfo, setShowLogoutModal }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: `${colors.primary}35`,
      width: '100%',
      alignItems: 'center',
      borderRadius: 16
    },
    title: {
      fontSize: 24,
      color: colors.text,
      // textAlign: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      height: 50,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: colors.text,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingsButton: {
      position: 'absolute',
      right: 10,
    },
    settingsIcon: {
      color: colors.primary,
      fontSize: 30,
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    verifiedIcon: {
      color: colors.primary,
      position: 'absolute',
      right: 10,
      fontSize: 30
    },
    userInfoContainer: {
      alignItems: 'center',
      paddingTop: 10,
    },
    userInfoHeader: {
      flexDirection: 'row',
      paddingTop: 10,
    },
    leftContainer: {
      height: 160,
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    msgButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 3,
    },
    msgButtonText: {
      fontSize: 18,
      color: colors.text,
    },
    bioContainer: {
      width: '60%',
      paddingLeft: 10,
      justifyContent: 'center'
    },
    bio: {
      fontSize: 15,
      color: colors.text,
      textAlign: 'justify',
    },
    statisticsContainer: {
      width: '80%',
      paddingVertical: 10,
      height: 120,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dummyStats: {
      backgroundColor: colors.primary,
      height: 80,
      width: 80,
      borderRadius: 40,
    },
  })

  return (
    <View >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{userInfo.name}</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => setShowLogoutModal(true)}>
          <MaterialIcons
            name='settings'
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoHeader}>
          <View style={styles.leftContainer}>
            <Image
              style={styles.profilePicture}
              source={{ uri: userInfo.photo }}
            />
            <MaterialIcons
              name='verified'
              style={styles.verifiedIcon}
            />
            <TouchableOpacity
              style={styles.msgButton}
              onPress={() => Linking.openURL(`https://wa.me/${userInfo.phone}`)}>
              <Text style={styles.msgButtonText}>Mensagem</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>
              {userInfo.bio}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{ color: colors.text, fontSize: 20 }}>Estat??sticas</Text>
          <View style={styles.statisticsContainer}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.dummyStats} />
              <Text style={{ color: colors.text }}>Vendas</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.dummyStats} />
              <Text style={{ color: colors.text }}>Alugueis</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.dummyStats} />
              <Text style={{ color: colors.text }}>Avalia????es</Text>
            </View>
          </View>
        </View>
      </View>
    </View >
  )
}