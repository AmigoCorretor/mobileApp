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

import { AuthInput } from '../components/AuthInput'
import { BottomTabParamList, StackParamList } from "../Navigator"
import axios from "axios"
import { server, showError, showSuccess } from "../common"
import { AuthContext, Post } from "../contexts/AuthContext"

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
    const [price, setPrice] = useState<string | undefined>()
    const [type, setType] = useState('')
    const [sellOrRent, setSellOrRent] = useState('')
    const [imagePickerArray, setImagePickerArray] = useState<string[]>()

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
        validations.push(title.length > 0 && title.length < 30)
        validations.push(image.length > 0)
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
            setArrayImages([image, image1, image2])
            setIdCreatedPost(idNewPost)
        } catch (e) {
            showError(e)
        }
    }

    const onCancel = () => {
        setTitle('')
        setArrayImages([])
        setImage('https://picsum.photos/id/1048/800')
        setImage1('https://picsum.photos/id/1011/800')
        setImage2('https://picsum.photos/id/1029/800')
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
        setImagePickerArray([])
    }

    const saveImage = async (imageURI: string, postId: number) => {
        await axios.post(`${server}/images`, {
            link: imageURI,
            post: postId
        })
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true
        })

        if (!result.cancelled) {
            const uriArray = result.selected.map((picture) => {
                return picture.uri
            })
            setImagePickerArray(uriArray);
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
                        value={price ? price.toString() : undefined}
                        onChangeText={setPrice}
                        placeholderTextColor='#333'
                        inputMask='money'
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

                <FlatList
                    data={imagePickerArray}
                    style={{ width: '90%', borderRadius: 16 }}
                    horizontal
                    contentContainerStyle={{ alignItems: 'center' }}
                    keyExtractor={(img, index) => index.toString()}
                    renderItem={({ item }) => {
                        if (item) {
                            return (
                                <Image source={{ uri: item }} style={styles.img} />
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
