import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute, useRoute } from "@react-navigation/native"
import HomePage from '../pages/Home/HomePage'
import { FontAwesome } from "@expo/vector-icons"
import { colors } from '../style/color'
import { useDispatch, useSelector } from 'react-redux'


const BottomTabs = createBottomTabNavigator()
const AppStack = () => {


    return (
        <BottomTabs.Navigator screenOptions={({ route }) => {
            return {
                headerShown: false
            }
        }}  >
            <BottomTabs.Screen name='home' component={HomePage} options={({ route }) => {
                return {
                    tabBarLabelStyle: {
                        color: "black",
                    },
                    tabBarIcon: () => {
                        return (
                            <FontAwesome name='home' size={24} color={colors.textColor} />
                        )
                    }
                }
            }} />
        </BottomTabs.Navigator>
    )
}

export default AppStack