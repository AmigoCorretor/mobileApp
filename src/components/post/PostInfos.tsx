import { Platform, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Post } from '../../contexts/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'

type Props = {
  post: Post
}

export const PostInfos: React.FC<Props> = ({ post }) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 10
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    },
    title: {
      fontSize: 28,
      color: colors.text,
    },
    subtitle: {
      fontSize: 24,
      color: colors.text,
    },
    shareIcon: {
      color: colors.text,
      fontSize: 30
    },
    numericInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    numericInfoIcon: {
      color: colors.text,
      fontSize: 35,
      marginRight: 15
    },
    text: {
      color: colors.text,
      fontSize: 20
    },
    map: {
      marginVertical: 10,
      width: '100%',
      borderRadius: 16,
      height: 300,
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <MaterialIcons
          name={Platform.OS === 'ios' ? 'ios-share' : 'share'}
          style={styles.shareIcon}
        />
      </View>
      <View>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
          <View>
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>venda/aluguel</Text>
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>valor</Text>
          </View>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='airline-seat-individual-suite'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.bedrooms} dormitório{post.bedrooms > 0 ? 's' : null}</Text>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='king-bed'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.suites} suíte{post.suites > 0 ? 's' : null}</Text>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='bathtub'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.bathrooms} banheiro{post.bathrooms > 0 ? 's' : null}</Text>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='crop-din'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.totalArea} m2 de área total</Text>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='aspect-ratio'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.usefulArea} m2 de área útil</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Descrição:</Text>
          <Text style={styles.text}>{post.description}</Text>
          <Text style={styles.text}>Inserir aqui o mapa se houver localização</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <MapView
            style={styles.map}
            region={{
              latitude: post.latitude!,
              longitude: post.longitude!,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0421
            }}
            zoomEnabled={true}
            // minZoomLevel={15}
            maxZoomLevel={19}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            <Marker
              key={0}
              coordinate={{ latitude: post.latitude!, longitude: post.longitude! }}
              pinColor={colors.primary} />
          </MapView>
        </View>
      </View>
    </View>
  )
}
