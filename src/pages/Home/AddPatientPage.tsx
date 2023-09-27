import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { NavigationProp } from "@react-navigation/native"
import { colors } from '../../style/color'
import { TextInput } from "react-native-paper"
import DropDownPicker from 'react-native-dropdown-picker'
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface Ievent {
    label: string
    path: string,
    icon?: any
}


const AddPatientPage: FC<{ navigation: NavigationProp<any>, route: any }> = ({ navigation, route }) => {

    const eventList = useMemo((): Array<Ievent> => {

        return [{
            label: "Kişisel Bilgiler",
            path: "patientInfo",
            icon: "account"
        }
            , {
            label: "Hastanın Şikayetleri",
            path: "sikayet",
            icon: "emoticon-angry"
        },
        {
            label: "Hastanın Hastalıkları",
            path: "hastalik",
            icon: "emoticon-sick"
        },
        {
            label: "Hastanın İlaçları",
            path: "",
            icon: "pill"
        }
        ]
    }, [])


    return (
        <View style={style.container}>
            <FlatList
                data={eventList}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 30 }}></View>
                    )
                }}
                renderItem={({ index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate(item.path) }}  >
                            <View style={style.eventItem}>
                                <MaterialCommunityIcons name={item.icon} size={24} color={"white"} />
                                <Text style={style.eventText}>
                                    {item.label}
                                </Text>
                            </View>

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
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    eventItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0069B5",
        padding: 25,
        borderRadius: 20
    },
    eventText: {
        color: "white",
        fontSize: 16,
        marginLeft: 20
    }
})

export default AddPatientPage

