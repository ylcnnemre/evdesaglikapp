import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginSplash from '../pages/LoginSplash'
import LoginPage from '../pages/LoginPage'
const Stack = createNativeStackNavigator()
const AuthStack = () => {
    return (

        <Stack.Navigator initialRouteName='loginsplash' screenOptions={{ headerShown: false }}    >
            <Stack.Screen name='loginsplash' component={LoginSplash} />
            <Stack.Screen name='login' component={LoginPage} />
        </Stack.Navigator>


    )
}

export default AuthStack