import react, { Platform, StyleSheet, Text, View } from 'react-native'
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
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>{post.type}</Text>
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>{post.sellOrRent}</Text>
            <Text style={[styles.subtitle, { textAlign: 'right' }]}>{post.price}</Text>
          </View>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='airline-seat-individual-suite'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.bedrooms} dormit??rio{post.bedrooms > 0 ? 's' : null}</Text>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='king-bed'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.suites} su??te{post.suites > 0 ? 's' : null}</Text>
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
          <Text style={styles.text}>{post.totalArea} m2 de ??rea total</Text>
        </View>
        <View style={styles.numericInfoContainer}>
          <MaterialIcons
            name='aspect-ratio'
            style={styles.numericInfoIcon}
          />
          <Text style={styles.text}>{post.usefulArea} m2 de ??rea ??til</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Descri????o:</Text>
          <Text style={styles.text}>{post.description}</Text>
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
