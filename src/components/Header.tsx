import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../style/color'
import { StackHeaderProps } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import { Appbar } from 'react-native-paper';

const Header: FC<{ props: StackHeaderProps, name: string }> = ({ props, name }) => {
    const { route, back, navigation } = props
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                <Ionicons name='arrow-back' size={26} color={"white"} />
            </TouchableOpacity>

            <Text style={style.text}>
                {name}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: colors.textColor,
        color: "white",
        paddingVertical: 16,
        paddingHorizontal: 22,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    text: {
        fontWeight: "bold",
        color: "white",
        fontSize: 20,
        alignSelf: "center",
        display: "flex",
        textTransform: "capitalize",
        marginLeft: 40
    }
})


export default Header