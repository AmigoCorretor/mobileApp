import React, { useContext, useState, useEffect } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useTheme } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Platform, ScrollView, Dimensions, Alert, Image, FlatList, ActionSheetIOS } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'

import { Masks } from 'react-native-mask-input'

import { AuthInput } from '../components/AuthInput'
import { BottomTabParamList, StackParamList } from "../Navigator"
import axios from "axios"
import { server, showError, showSuccess } from "../common"
import { AuthContext, Post, TypePost, TypeSellOrRent } from "../contexts/AuthContext"

import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { firebaseApp } from "../FirebaseConfig"
const firebaseStorage = getStorage(firebaseApp)

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

interface MarkerInt {
    key: 0,
    coords: {
        latitude: number,
        longitude: number,
    },
    pinColor: string
}

// export const saveImageToFirebase = async (imageURI: any, pathReference: StorageReference) => {
//     const img = await fetch(imageURI)
//     const imgBytes = await img.blob()

//     await uploadBytes(pathReference, imgBytes).then(() => {
//         console.log('Uploaded a picture')
//     })
// }

// export const saveImageUrlToDB = async (imageURI: string, postId: number) => {
//     await axios.post(`${server}/images`, {
//         link: imageURI,
//         post: postId
//     })
// }

export const Publication: React.FC<PublicationScreenNavigationProp> = () => {
    const { colors } = useTheme()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [usefulArea, setUseFulArea] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [suites, setSuites] = useState('')
    const [validPost, setValidPost] = useState(false)
    const [price, setPrice] = useState<string | undefined>()
    const [type, setType] = useState<TypePost>('')
    const [sellOrRent, setSellOrRent] = useState<TypeSellOrRent>('')
    const [imagesArray, setImagesArray] = useState<any[]>([])

    const [region, setRegion] = useState<Region>()
    const [marker, setMarker] = useState<MarkerInt>({
        key: 0,
        coords: {
            latitude: 0,
            longitude: 0,
        },
        pinColor: colors.primary
    })

    const { user, setUser, saveImageToFirebase, saveImageUrlToDB } = useContext(AuthContext)

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
        aditionalInfosInputData: {
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
            width: 170,
            borderRadius: 5,
            marginVertical: 10
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '80%',
            marginTop: 10,
            marginBottom: 50
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
        },
        picker: {
            marginVertical: 10,
            borderRadius: 5,
            width: 170,
            backgroundColor: '#EEE',
            color: '#333'
        },
        selectionImageButton: {
            backgroundColor: 'silver',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 10,
            marginTop: 30
        },
        img: {
            width: 200,//Dimensions.get(window).width - 30,
            height: 200,
            marginHorizontal: 10,
            borderRadius: 16
        },
        iosPickerButton: {
            backgroundColor: '#EEE',
            width: 170,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginVertical: 10
        },
        iosPickerText: {
            color: '#333',
        },
        textInfos: {
            color: colors.text
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
        let data: MarkerInt = {
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
        validateInputs()
    })

    const validateInputs = () => {
        const validations: boolean[] = []
        validations.push(title.length > 0 && title.length < 30)
        validations.push(imagesArray.length > 1)
        validations.push(type != '')
        validations.push(sellOrRent != '')
        if (price) {
            validations.push(price.length > 1 && price.length <= 15)
        } else {
            validations.push(false)
        }

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
                type,
                sellOrRent,
                price,
                latitude: marker.coords ? marker.coords.latitude : null,
                longitude: marker.coords ? marker.coords.longitude : null
            }

            const res = await axios.post<NewPostResponse>(`${server}/posts`, newPost)

            const idNewPost = +res.data.results.id

            const save = new Promise<void>((resolve, reject) => {
                imagesArray.forEach(async (image: any, index) => {
                    // Upload images to Firebase
                    const name = `images/${user.id}/${image.assetId}`
                    const pathReference = ref(firebaseStorage, name)
                    await saveImageToFirebase!(image.uri, pathReference)

                    // Get url for images
                    const url = await getDownloadURL(pathReference)

                    //save images urls to postgres
                    await saveImageUrlToDB!(url, idNewPost)
                    if (index === imagesArray.length - 1) resolve()
                })
            })

            save.then(() => {
                setTimeout(() => {
                }, 1000)
                updateUserInfo()
            })
            onCancel()
        } catch (e) {
            showError(e)
        }
    }

    const onCancel = () => {
        setTitle('')
        setDescription('')
        setTotalArea('')
        setUseFulArea('')
        setBathrooms('')
        setBedrooms('')
        setSuites('')
        setValidPost(false)
        setPrice(undefined)
        setType('')
        setSellOrRent('')
        setImagesArray([])
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
            allowsMultipleSelection: true
        })

        if (!result.cancelled) {
            if (result.selected) {
                // const uriArray = result.selected.map(picture => picture.uri)
                const images = result.selected.map(picture => {
                    if (Platform.OS === 'ios') {
                        return { ...picture, assetId: picture.assetId?.replaceAll('/', '-') }
                    } else {
                        return picture
                    }
                })
                setImagesArray(images)
            }
        }
    }

    const actionSheet = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Venda', 'Aluguel'],
                // cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    setSellOrRent('Venda')
                } else if (buttonIndex === 1) {
                    setSellOrRent('Aluguel')
                }
            }
        )
    const actionSheetType = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Casa', 'Apartamento', 'Terreno', 'Sítio', 'Kitnet', 'Quarto', 'Galpão', 'Sala comercial', 'Studio'],
                // cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        setType('Casa')
                        break
                    case 1:
                        setType('Apartamento')
                        break
                    case 2:
                        setType('Terreno')
                        break
                    case 3:
                        setType('Sítio')
                        break
                    case 4:
                        setType('Kitnet')
                        break
                    case 5:
                        setType('Quarto')
                        break
                    case 6:
                        setType('Galpão')
                        break
                    case 7:
                        setType('Sala comercial')
                        break
                    case 8:
                        setType('Studio')
                        break
                    default:
                        break
                }
            }
        )

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
                    icon='description'
                    style={[styles.inputs, { height: 120 }]}
                    placeholder='Descrição'
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor='#333'
                    multiline
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Text style={[styles.numberInputData, styles.aditionalInfosInputData]}>Tipo de imóvel:</Text>
                    {
                        Platform.OS === 'android' ? (
                            <Picker
                                style={styles.picker}
                                selectedValue={type}
                                onValueChange={(itemValue, itemIndex) =>
                                    setType(itemValue)
                                }>
                                <Picker.Item label='' value='' />
                                <Picker.Item label='Casa' value='Casa' />
                                <Picker.Item label='Apartamento' value='Apartamento' />
                                <Picker.Item label='Terreno' value='Terreno' />
                                <Picker.Item label='Sítio' value='Sítio' />
                                <Picker.Item label='Kitnet' value='Kitnet' />
                                <Picker.Item label='Quarto' value='Quarto' />
                                <Picker.Item label='Galpão' value='Galpão' />
                                <Picker.Item label='Sala comercial' value='Sala comercial' />
                                <Picker.Item label='Studio' value='Studio' />
                            </Picker>
                        ) : (
                            <TouchableOpacity onPress={actionSheetType} style={styles.iosPickerButton}>
                                <Text style={styles.iosPickerText}>{type ? type : 'Tipo de imóvel'}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                <View style={styles.viewNumberInputData}>
                    <Text style={[styles.numberInputData, styles.aditionalInfosInputData]}>Venda/Aluguel:</Text>
                    {
                        Platform.OS === 'android' ? (
                            <Picker
                                style={[styles.picker]}
                                selectedValue={sellOrRent}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSellOrRent(itemValue)
                                }>
                                <Picker.Item label='' value='' />
                                <Picker.Item label='Venda' value='Venda' />
                                <Picker.Item label='Aluguel' value='Aluguel' />
                            </Picker>
                        ) : (
                            <TouchableOpacity onPress={actionSheet} style={styles.iosPickerButton}>
                                <Text style={styles.iosPickerText}>{sellOrRent ? sellOrRent : 'Venda/Aluguel'}</Text>
                            </TouchableOpacity>
                        )
                    }
                    <AuthInput
                        icon='crop-din'
                        style={styles.numberInputData}
                        placeholder='Área total'
                        value={totalArea}
                        onChangeText={setTotalArea}
                        placeholderTextColor='#333'
                        keyboardType='number-pad'
                    />
                    <AuthInput
                        icon='aspect-ratio'
                        style={styles.numberInputData}
                        placeholder='Área útil'
                        value={usefulArea}
                        onChangeText={setUseFulArea}
                        placeholderTextColor='#333'
                        keyboardType='number-pad'
                    />
                    <AuthInput
                        icon='bathtub'
                        style={styles.numberInputData}
                        placeholder='Banheiro(s)'
                        value={bathrooms}
                        onChangeText={setBathrooms}
                        placeholderTextColor='#333'
                        keyboardType='number-pad'
                    />
                    <AuthInput
                        icon='airline-seat-individual-suite'
                        style={styles.numberInputData}
                        placeholder='Quarto(s)'
                        value={bedrooms}
                        onChangeText={setBedrooms}
                        placeholderTextColor='#333'
                        keyboardType='number-pad'
                    />
                    <AuthInput
                        icon='king-bed'
                        style={styles.numberInputData}
                        placeholder='Suítes'
                        value={suites}
                        onChangeText={setSuites}
                        placeholderTextColor='#333'
                        keyboardType='number-pad'
                    />
                    <AuthInput
                        icon='attach-money'
                        style={styles.numberInputData}
                        placeholder='Preço'
                        value={price}
                        onChangeText={setPrice}
                        placeholderTextColor='#333'
                        // mask={Masks.BRL_CURRENCY}
                        keyboardType='number-pad'
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
                <Text style={styles.textInfos}>Selecione no mínimo duas imagens</Text>
                <FlatList
                    data={imagesArray}
                    style={{ width: '90%', borderRadius: 16 }}
                    horizontal
                    contentContainerStyle={{ alignItems: 'center' }}
                    keyExtractor={(img, index) => index.toString()}
                    renderItem={({ item }) => {
                        if (item) {
                            return (
                                <Image source={{ uri: item.uri }} style={styles.img} />
                            )
                        } else {
                            return (
                                <></>
                            )
                        }
                    }}
                />
                <TouchableOpacity
                    style={styles.selectionImageButton}
                    onPress={selectImage}>
                    <Text>Selecione Imagem</Text>
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#F88' }]}
                        onPress={onCancel}>
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
