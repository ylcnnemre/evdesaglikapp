import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../style/color'
import { httpClient } from '../api/HttpClient'
import { AxiosError } from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { login } from '../redux/AuthReducer'

interface IuserInfo {
    tcNo: string
    password: string
}


const LoginPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<any>();
    const [userInfo, setUserInfo] = useState<IuserInfo>({
        password: "",
        tcNo: ""
    })


    async function loginApi() {
        try {
            let response = await httpClient.post("/user/login", {
                ...userInfo
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            await AsyncStorage.setItem('userToken', JSON.stringify(response.data.token));
            dispatch(login())
        }
        catch (Err: any) {
            const err = Err as AxiosError
            console.log("err ==>", err.response?.data)
        }
    }




    return (

        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>Doktor Girişi</Text>
            <Image source={require("../../assets/doctoricon.png")} style={loginStyle.doctorIcon} />
            <View style={loginStyle.inputContainer}>
                <TextInput keyboardType='numeric' style={loginStyle.tcNo} placeholder='Tc No ' maxLength={11} onChangeText={(val) => {
                    setUserInfo({
                        ...userInfo,
                        tcNo: val
                    })
                }} />
                <TextInput style={loginStyle.password} placeholder='Şifre' secureTextEntry={true} onChangeText={(val) => {
                    setUserInfo({
                        ...userInfo,
                        password: val
                    })
                }} />
            </View>
            <TouchableOpacity style={loginStyle.loginButton} onPress={() => { loginApi() }}>
                <Text style={{ color: "white" }}>
                    Giriş Yap
                </Text>
            </TouchableOpacity>
        </View>


    )
}

const loginStyle = StyleSheet.create({

    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingTop: 70,
        width: "100%",
        backgroundColor: colors.mainColor
    },
    title: {
        color: colors.textColor,
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 30
    },
    inputContainer: {
        width: "100%",
        marginTop: 20
    },
    tcNo: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "white",
        marginBottom: 20
    },
    doctorIcon: {
        marginBottom: 20
    },
    password: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "white"
    },
    loginButton: {
        backgroundColor: "#2196F3",
        width: "100%",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        marginTop: 30
    }
})

export default LoginPage