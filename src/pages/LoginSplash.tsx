import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../style/color'
import { useNavigation } from "@react-navigation/native"

const LoginSplash = () => {
    const navigation = useNavigation<any>()
    return (
            <View style={style.container}>
                <View style={style.topSide}>
                    <Text style={style.title}>Evde Sağlık Mobil Uygulama</Text>
                    <Image source={require("../../assets/logo.png")} style={style.logo} />
                    <Text style={style.desc}>
                        Evde Sağlık , doktoların hastalarını rahat bir şekilde takip edip hastaları için gereken güncellemeleri online şekilde yapmalarına olanak sağlar
                    </Text>
                </View>
                <View style={style.buttonContainer}>

                    <TouchableOpacity style={style.doctor} onPress={()=>{

                        navigation.navigate("login")  
                    }}  >
                        <Image source={require("../../assets/medical6.png")} style={style.doctorIcon} />
                        <Text style={{ textAlign: "center", flex: 1, fontWeight: "bold" }}>
                            Doktor Girişi
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.patientButton} >
                        <Image source={require("../../assets/user.png")} style={style.doctorIcon} />
                        <Text style={{ textAlign: "center", flex: 1, fontWeight: "bold" }}>
                            Hasta Girişi
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textAlign: "center", marginTop: 40 }}>
                            Bu uygulamaya kayıt olarak <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }} >
                                kullanım şartları
                            </Text> ve <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }} >gizlilik politikasını</Text> kabul etmiş olursun
                        </Text>
                    </View>
                </View>
            </View>
    )
}


const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.mainColor,
        height: "100%",
        padding: 30,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "space-between"
    },
    topSide: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2F4372",
        textAlign: "center"
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 10
    },
    desc: {
        color: "gray",
        fontSize: 17,
        textAlign: "center"
    },
    doctor: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        padding: 13,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3
    },
    doctorIcon: {
        width: 20,
        height: 20,
        tintColor: "#27929E",
    },
    buttonContainer: {
        width: "100%",
    },
    patientButton: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        padding: 13,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        marginTop: 25
    }
})


export default LoginSplash