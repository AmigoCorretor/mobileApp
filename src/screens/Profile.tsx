import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
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

const userInfo = {
  id: 11,
  email: 'gustavo@gmail.com',
  photo: 'https://picsum.photos/seed/picsum/300',
  name: 'Gustavo',
  isRealtor: true,
  creci: '22394231',
  stars: 4.9,
  comletedSells: 12,
  completedRents: 10,
  phone: '479999-9999',
  posts: [
    {
      id: 1,
      title: 'casa no lago',
      description: 'Bela casa na beira do lago',
      totalArea: 800,
      usefulArea: 430,
      bathrooms: 5,
      bedrooms: 4,
      suites: 2,
      images: [
        {
          id: 2,
          link: 'https://picsum.photos/seed/picsum/200',
        },
      ],
    },
    {
      id: 2,
      title: 'Casa na praia',
      description: 'Bela casa na praia',
      totalArea: 500,
      usefulArea: 330,
      bathrooms: 3,
      bedrooms: 4,
      suites: 2,
      images: [
        {
          id: 3,
          link: 'https://picsum.photos/seed/picsum/300',
        },
      ],
    },
    {
      id: 3,
      title: 'Cobertura duplex',
      description: 'Bela cobertura duplex',
      totalArea: 450,
      usefulArea: 430,
      bathrooms: 4,
      bedrooms: 4,
      suites: 4,
      images: [
        {
          id: 4,
          link: 'https://picsum.photos/seed/picsum/400',
        },
      ],
    },
  ],
}

export const Profile: React.FC<ProfileScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 24,
      color: colors.text,
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
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
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
    descriptionContainer: {
      width: '60%',
      paddingLeft: 10,
    },
    description: {
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
    postsContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      flexGrow: 1,
    },
    post: {
      alignItems: 'center',
    },
    postText: {
      fontSize: 18,
      color: colors.text,
    },
    dummyPostImage: {
      backgroundColor: colors.primary,
      height: 150,
      width: 150,
      borderRadius: 20,
    },
  })

  return (
    <View style={{ width: '100%', marginBottom: 50 }}>
      <View style={styles.headerContainer}>
        {/* <TouchableHighlight>
          <Text>Voltar</Text>
        </TouchableHighlight> */}
        <Text style={styles.title}>{userInfo.name}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoHeader}>
            <View style={styles.leftContainer}>
              <Image
                style={styles.profilePicture}
                source={{ uri: userInfo.photo }}
              />
              <TouchableHighlight style={styles.msgButton}>
                <Text style={styles.msgButtonText}>Mensagem</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Sapiente consequuntur expedita vero, tenetur pariatur aliquam,
                obcaecati error quia earum ipsam debitis doloremque laboriosam
                aut aliquid ab quasi blanditiis asperiores modi?
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ color: colors.text, fontSize: 20 }}>
              Estatísticas
            </Text>
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
                <Text style={{ color: colors.text }}>Avaliações</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.postsContainer}>
          <View style={styles.post}>
            <View style={styles.dummyPostImage} />
            <Text style={styles.postText}>Post 1</Text>
          </View>
          <View style={styles.post}>
            <View style={styles.dummyPostImage} />
            <Text style={styles.postText}>Post 2</Text>
          </View>
          <View style={styles.post}>
            <View style={styles.dummyPostImage} />
            <Text style={styles.postText}>Post 1</Text>
          </View>
          <View style={styles.post}>
            <View style={styles.dummyPostImage} />
            <Text style={styles.postText}>Post 2</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
