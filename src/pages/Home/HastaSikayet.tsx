import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Keyboard, ScrollView, Animated, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../style/color';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addSikayetInfo, editSikayetInfo } from '../../redux/NewPatienReducer';
import { IselectorType } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';

const HastaSikayet = () => {

    const [modalControl, setModalControl] = useState<{ visible: boolean, editMode: boolean }>({ visible: false, editMode: false });
    const [sikayetData, setSikayetData] = useState<{ id: string, title: string, desc: string }>({ id: "", desc: "", title: "" })
    const showModal = useCallback(() => {
        setModalControl({
            ...modalControl,
            visible: true
        })
    }, [modalControl])
    const hideModal = useCallback(() => {
        setModalControl({
            ...modalControl,
            visible: false
        })
    }, [modalControl])
    const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
    const dispatch = useDispatch()
    const { sikayetList } = useSelector((item: IselectorType) => item.newPatient)
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [])

    const style = StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: "white"
        },
        icon: {
            display: "flex",
            backgroundColor: "blue",
            alignSelf: "flex-start",
            padding: 20,
            borderRadius: 50,
            position: "absolute",
            bottom: 70,
            right: 30,
            zIndex: 2000
        },
        modal: {
            backgroundColor: "white",
            borderRadius: 10,
            position: "absolute",
            display: "flex",
            justifyContent: "flex-start",
            padding: 20,
            top: isKeyboardOpen ? 50 : 100,
            left: 20,
            right: 20
        },
        modalHeader: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20
        },
        textInput: {
            backgroundColor: "white",
            marginVertical: 10,
            borderRadius: 5,

        },
        confirmModal: {
            alignSelf: "flex-end",
            backgroundColor: "#20A674",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 14,
            marginTop: 10,
        },
        sikayetItem: {
            width: "100%",
            backgroundColor: colors.textColor,
            marginVertical: 10,
            padding: 15,
            borderRadius: 15
        },
        sikayetTextTitle: {
            color: "white"
        },
        sikayetTextDesc: {
            marginTop: 15,
            color: "black"
        }
    })


    const confirmModal = () => {

        if (!modalControl.editMode) {
            dispatch(addSikayetInfo({
                id: uuidv4(),
                desc: sikayetData.desc,
                title: sikayetData.title
            }))
            setSikayetData({
                id: "",
                desc: "",
                title: ""
            })
            setModalControl({
                editMode: false,
                visible: false
            })
        }
        else {
            dispatch(editSikayetInfo({
                id: sikayetData.id,
                desc: sikayetData.desc,
                title: sikayetData.title
            }))
            setSikayetData({
                id: "",
                desc: "",
                title: ""
            })
            setModalControl({
                visible: false,
                editMode: false
            })
      
        }

    }


    return (
        <View style={style.container} >
            <TouchableOpacity style={{ ...style.icon, display: isKeyboardOpen ? "none" : "flex" }} onPress={showModal}  >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            <Portal>

                <Modal visible={modalControl.visible} onDismiss={hideModal} contentContainerStyle={style.modal} dismissable={false}  >

                    <View style={style.modalHeader} >
                        <Text style={{ fontSize: 18 }}>
                            {
                                modalControl.editMode ? "Şikayet Düzenle" : "Şikayet Ekle"
                            }
                        </Text>
                        <TouchableOpacity onPress={() => {
                            if (modalControl.editMode) {
                                setSikayetData({
                                    id: "",
                                    desc: "",
                                    title: ""
                                })
                            }
                            setModalControl({
                                visible: false,
                                editMode: false
                            })
                        }} >
                            <AntDesign name="close" size={27} color="black" />
                        </TouchableOpacity>



                    </View>
                    <View>
                        <TextInput
                            key={"Baslik"}
                            inputMode={"text"}
                            style={style.textInput}
                            outlineColor={colors.textColor}
                            activeOutlineColor={colors.textColor}
                            mode='outlined'
                            label={"Başlık"}
                            value={sikayetData.title}
                            onChangeText={(e) => {
                                setSikayetData({
                                    ...sikayetData,
                                    title: e
                                })
                            }}
                        />
                        <TextInput
                            key={"aciklama"}
                            inputMode={"text"}
                            style={style.textInput}
                            outlineColor={colors.textColor}
                            activeOutlineColor={colors.textColor}
                            mode='outlined'
                            value={sikayetData.desc}
                            label={"Açıklama"}
                            numberOfLines={5}
                            multiline={true}
                            onChangeText={(e) => {
                                setSikayetData({
                                    ...sikayetData,
                                    desc: e
                                })
                            }}
                        />
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            <TouchableOpacity style={style.confirmModal} onPress={confirmModal} >
                                <Text style={{ color: "white" }}>
                                    {
                                        modalControl.editMode ? "Düzenle" : "Ekle"
                                    }
                                </Text>
                            </TouchableOpacity>
                            {
                                modalControl.editMode && (<TouchableOpacity style={{ ...style.confirmModal, backgroundColor: "red", paddingHorizontal: 25, marginLeft: 10 }} >
                                    <Text style={{ color: "white" }} >
                                        Sil
                                    </Text>
                                </TouchableOpacity>)
                            }
                        </View>



                    </View>

                </Modal>
            </Portal>
            <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                {
                    sikayetList.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={style.sikayetItem} onPress={() => {
                                setSikayetData({
                                    id: item.id,
                                    desc: item.desc,
                                    title: item.title
                                })
                                setModalControl({
                                    visible: true,
                                    editMode: true
                                })
                            }} >
                                <Text style={style.sikayetTextTitle}>
                                    {
                                        item.title
                                    }
                                </Text>
                                <Text style={style.sikayetTextDesc}>
                                    {
                                        item.desc
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}



export default HastaSikayet