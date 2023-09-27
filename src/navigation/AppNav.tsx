import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { httpClient } from '../api/HttpClient'
import { login } from '../redux/AuthReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
const AppNav = () => {

    const { auth } = useSelector((item: any) => item.authReducer)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(true)


    const verify = async () => {
        try {
            setLoading(true)

            const res = await httpClient.get("/user/verify")

            dispatch(login())
            setLoading(false)
        }
        catch (err: any) {
            console.log("err ==>", err.response.data)
            setLoading(false)
        }
    }


    useEffect(() => {
        verify()
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={"blue"} />
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }} >
            <NavigationContainer >
                <>
                    {auth ? <AppStack /> : <AuthStack />}
                </>

            </NavigationContainer>
        </SafeAreaView>
    )
}

export default AppNav