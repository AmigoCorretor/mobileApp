import React, { useContext, useState, useEffect } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useTheme } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'

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

export const Publication: React.FC<PublicationScreenNavigationProp> = () => {

    const { colors } = useTheme()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('https://picsum.photos/id/222/300')
    const [description, setDescription] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [usefulArea, setUseFulArea] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [suites, setSuites] = useState('')
    const [validPost, setValidPost] = useState(false)

    const { user, setUser } = useContext(AuthContext)

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
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
        infosInputData: {
            color: colors.text,
            fontSize: 17,
            textAlign: 'center'
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
        inputs: {
            marginVertical: 10,
            borderRadius: 5,
            width: '90%'
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
    })

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

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
            const res = await axios.post<NewPostResponse>(`${server}/posts`, {
                title: capitalize(title),
                description: capitalize(description),
                totalArea: +totalArea,
                usefulArea: +usefulArea,
                bathrooms: +bathrooms,
                bedrooms: +bedrooms,
                suites: +suites,
                user: user.id
            })

            const idNewPost = +res.data.results.id

            const savedImage: Image = await axios.post(`${server}/images`, {
                link: image,
                post: idNewPost
            })
            const updatedUser = await (await axios.get(`${server}/users/${user.id}`)).data
            setUser(updatedUser)
            showSuccess('Post criado com sucesso!')
        } catch (e) {
            showError(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
                icon='description'
                style={styles.inputs}
                placeholder='Descrição'
                value={description}
                onChangeText={setDescription}
                placeholderTextColor='#333'
            />

            <View style={styles.viewNumberInputData}>

                <Text style={[styles.numberInputData, styles.infosInputData]}>Informações Adicionais:</Text>

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
        </SafeAreaView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//     },
//     viewNumberInputData: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         width: '90%',
//         alignItems: 'center'
//     },
//     infosInputData:{
//         color:
//     },
//     numberInputData: {
//         width: 150,
//         borderRadius: 5,
//         marginVertical: 10
//     },
//     viewButton: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         width: '80%',
//     },
//     inputs: {
//         marginVertical: 10,
//         borderRadius: 5,
//         width: '90%'
//     },
//     button: {
//         width: 100,
//         backgroundColor: '#fff',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         padding: 10,
//         borderRadius: 8,
//     },
//     cancelButtonIcon: {
//         color: '#333',
//     },
// })



