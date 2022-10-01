import React, { useContext, useState, useEffect } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useTheme } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, Dimensions, Alert } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { AuthInput } from '../components/AuthInput'
import { BottomTabParamList, StackParamList } from "../Navigator"
import axios from "axios"
import { server, showError, showSuccess } from "../common"
import { AuthContext, Image, Post } from "../contexts/AuthContext"

type PublicationScreenNavigationProp = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Publication'>,
    NativeStackScreenProps<StackParamList>
>
interface NewPostResponse {
    message: string,
    results: Post
}

interface Region {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface Marker {
    key: 0,
    coords: {
        latitude: number,
        longitude: number,
    },
    pinColor: string
}

export const Publication: React.FC<PublicationScreenNavigationProp> = () => {

    const { colors } = useTheme()
    const [title, setTitle] = useState('')
    const [arrayImages, setArrayImages] = useState<string[]>([])
    const [idCreatedPost, setIdCreatedPost] = useState(0)
    const [image, setImage] = useState('https://picsum.photos/id/1048/800')
    const [image1, setImage1] = useState('https://picsum.photos/id/1011/800')
    const [image2, setImage2] = useState('https://picsum.photos/id/1029/800')
    const [description, setDescription] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [usefulArea, setUseFulArea] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [suites, setSuites] = useState('')
    const [validPost, setValidPost] = useState(false)

    const [region, setRegion] = useState<Region>()
    const [marker, setMarker] = useState<Marker>({
        key: 0,
        coords: {
            latitude: 0,
            longitude: 0,
        },
        pinColor: colors.primary
    })

    const { user, setUser } = useContext(AuthContext)

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            flexGrow: 1,
        },
        title: {
            fontSize: 22,
            color: colors.text,
            marginTop: 10,
        },
        viewNumberInputData: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '90%',
            alignItems: 'center'
        },
        adicitionalInfosInputData: {
            color: colors.text,
            fontSize: 17,
            textAlign: 'center'
        },
        inputs: {
            marginVertical: 10,
            borderRadius: 5,
            width: '90%'
        },
        numberInputData: {
            width: 150,
            borderRadius: 5,
            marginVertical: 10
        },
        viewButton: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '80%',
            marginTop: 10
        },
        button: {
            width: 100,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 10,
            borderRadius: 8,
        },
        cancelButtonIcon: {
            color: '#333',
        },
        map: {
            marginVertical: 10,
            width: '90%',
            borderRadius: 16,
            height: Dimensions.get('window').width / 2,
        }
    })

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await Location.requestForegroundPermissionsAsync()

                if (status !== "granted") {
                    Alert.alert("Insufficient permissions!")
                    return;
                }
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0421
            })
        })()
    }, [])

    const newMarker = (e: any) => {
        let data: Marker = {
            key: 0,
            coords: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
            },
            pinColor: colors.primary
        }

        setRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0421
        })

        setMarker(data)
    }

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const updateUserInfo = async () => {
        const updatedUser = await (await axios.get(`${server}/users/${user.id}`)).data
        setUser(updatedUser)
        showSuccess('Post criado com sucesso!')
    }

    useEffect(() => {
        if (idCreatedPost != 0) {
            arrayImages.forEach(async (imgURL) => {
                await saveImage(imgURL, idCreatedPost)
            })
            updateUserInfo()
        }
    }, [idCreatedPost])

    useEffect(() => {
        validateInputs()
    })

    const validateInputs = () => {
        const validations: boolean[] = []
        validations.push(title.length > 0)
        validations.push(image.length > 0)

        setValidPost(validations.reduce((total, current) => total && current))
    }

    const saveNewPost = async () => {
        try {
            const newPost = {
                title: capitalize(title),
                description: capitalize(description),
                totalArea: +totalArea,
                usefulArea: +usefulArea,
                bathrooms: +bathrooms,
                bedrooms: +bedrooms,
                suites: +suites,
                available: true,
                user: user.id,
                // type,
                // sellOrRent,
                // price,
                latitude: marker.coords ? marker.coords.latitude : null,
                longitude: marker.coords ? marker.coords.longitude : null
            }
            const res = await axios.post<NewPostResponse>(`${server}/posts`, newPost)

            const idNewPost = +res.data.results.id
            setArrayImages([image, image1, image2])
            setIdCreatedPost(idNewPost)
        } catch (e) {
            showError(e)
        }
    }

    const saveImage = async (imageURI: string, postId: number) => {
        await axios.post(`${server}/images`, {
            link: imageURI,
            post: postId
        })
    }

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.container}
            >
                <Text style={styles.title}>Nova Publicação</Text>
                <AuthInput
                    icon='title'
                    style={styles.inputs}
                    placeholder='Título'
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor='#333'
                />
                <AuthInput
                    icon='photo'
                    style={styles.inputs}
                    placeholder='Foto'
                    value={image}
                    onChangeText={setImage}
                    placeholderTextColor='#333'
                />
                <AuthInput
                    icon='photo'
                    style={styles.inputs}
                    placeholder='Foto'
                    value={image1}
                    onChangeText={setImage1}
                    placeholderTextColor='#333'
                />
                <AuthInput
                    icon='photo'
                    style={styles.inputs}
                    placeholder='Foto'
                    value={image2}
                    onChangeText={setImage2}
                    placeholderTextColor='#333'
                />
                <AuthInput
                    icon='description'
                    style={styles.inputs}
                    placeholder='Descrição'
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor='#333'
                />

                <View style={styles.viewNumberInputData}>
                    <Text style={[styles.numberInputData, styles.adicitionalInfosInputData]}>Informações Adicionais:</Text>
                    <AuthInput
                        icon='crop-din'
                        style={styles.numberInputData}
                        placeholder='Área total'
                        value={totalArea}
                        onChangeText={setTotalArea}
                        placeholderTextColor='#333'
                    />
                    <AuthInput
                        icon='aspect-ratio'
                        style={styles.numberInputData}
                        placeholder='Área útil'
                        value={usefulArea}
                        onChangeText={setUseFulArea}
                        placeholderTextColor='#333'
                    />
                    <AuthInput
                        icon='bathtub'
                        style={styles.numberInputData}
                        placeholder='Banheiro(s)'
                        value={bathrooms}
                        onChangeText={setBathrooms}
                        placeholderTextColor='#333'
                    />
                    <AuthInput
                        icon='airline-seat-individual-suite'
                        style={styles.numberInputData}
                        placeholder='Quarto(s)'
                        value={bedrooms}
                        onChangeText={setBedrooms}
                        placeholderTextColor='#333'
                    />
                    <AuthInput
                        icon='king-bed'
                        style={styles.numberInputData}
                        placeholder='Suítes'
                        value={suites}
                        onChangeText={setSuites}
                        placeholderTextColor='#333'
                    />
                </View>
                <MapView
                    style={styles.map}
                    region={region}
                    zoomEnabled={true}
                    // minZoomLevel={15}
                    maxZoomLevel={19}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    onLongPress={(e) => newMarker(e)}
                >
                    <Marker
                        key={marker.key}
                        coordinate={marker.coords}
                        pinColor={marker.pinColor} />

                </MapView>
                <View style={styles.viewButton}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#F88' }]}
                        onPress={() => { }}>
                        <MaterialIcons
                            name='cancel'
                            size={20}
                            style={styles.cancelButtonIcon}
                        />
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, validPost ? { backgroundColor: '#8F8' } : { backgroundColor: '#AAA' }]}
                        onPress={saveNewPost}
                        disabled={!validPost}>
                        <MaterialIcons
                            name='save'
                            size={20}
                            style={styles.cancelButtonIcon}
                        />
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
