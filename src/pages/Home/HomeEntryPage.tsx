import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useMemo, useCallback, useEffect, useLayoutEffect } from 'react'
import { colors } from '../../style/color'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute, getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { useDispatch } from 'react-redux'

interface Ieventitem {
    icon: any
    desc: string
    routePage?: string
}

const HomeEntryPage = ({ route }: any) => {

    const navigation = useNavigation<any>()
    const selectRoute = useRoute()



    useLayoutEffect(() => {
        let sonuc = getFocusedRouteNameFromRoute(route)
        navigation.setOptions({ tabBarStyle: { display: 'flex' } })
    }, [navigation, route])


    const eventList = useMemo((): Ieventitem[] => {
        return [{
            icon: "user",
            desc: "Hastalar",
            routePage : "patientlist"
        }, {
            desc: "Hasta Ekle",
            icon: "adduser",
            routePage: "addpatient"

        }, {
            desc: "Randevu",
            icon: "calendar",
        }, {
            desc: "Form",
            icon: "form",
        }]
    }, [])

    const routepage = useCallback((page?: string) => {
        if (page) {
            navigation.navigate(page)
        }
    }, [])

    return (
        <View style={style.container}>
            <FlatList
                numColumns={2}
                data={eventList}
                keyExtractor={(item) => item.desc}
                renderItem={({ item, index }) => {

                    return (
                        <TouchableOpacity style={style.eventItem} onPress={() => { routepage(item.routePage) }} >
                            <AntDesign name={item.icon} size={30} color={"white"} />
                            <Text style={style.eventLabel}>
                                {item.desc}
                            </Text>

                        </TouchableOpacity>
                    )
                }}

            />

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor,
        paddingVertical: 40,
        paddingHorizontal: 10
    },
    eventItem: {
        backgroundColor: colors.textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 7,
        marginVertical: 15,
        height: 100
    },
    eventLabel: {
        color: "white",
        fontSize: 14
    }
})

export default HomeEntryPage