import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import { TextInput } from "react-native-paper"
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../../style/color'
import { cityData } from '../../data/cities'
import { useDispatch, useSelector } from 'react-redux'
import { InewPersonType, addNewPersonInfo } from '../../redux/NewPatienReducer'
import { IselectorType } from '../../redux/store'

interface Iinput {
  label: string,
  key: "Ad" | "Soyad" | "Yaş" | "Cinsiyet" | "Boy" | "Kilo" | "Şehir" | "İlçe"
  inputType: "textinput" | "dropdown"
  inputMode: "text" | "decimal",
  state?: "cities" | "genders",
  data?: Array<{ label: string, value: string }>
}

const genders: Array<{ label: string, value: string }> = [{
  label: "Erkek",
  value: "Erkek"
}, {
  label: "Kadın",
  value: "Kadın"
}, {
  value: "Diğer",
  label: "Diğer"
}]



const PatientPersonelInfoPage = () => {
  const [genderOpen, setGenderOpen] = useState<boolean>(false)
  const [genderValue, setGenderValue] = useState<string>("")
  const [citiesOpen, setCitiesOpen] = useState<boolean>(false);
  const [cityValue, setCityValue] = useState<string>("")
  const [ilceOpen, setİlceOpen] = useState<boolean>(false)
  const [ilceValue, setİlceValue] = useState<string>("")

  const [cities, setCities] = useState(cityData.map(item => ({ label: item.name, value: item.name })))
  const [ilce, setİlce] = useState<Array<{ label: string, value: string }>>([])

  const dispatch = useDispatch()
  const { Ad, Adres, Boy, Cinsiyet, Kilo, Sehir, Soyad, Yas, İlce } = useSelector((item: IselectorType) => item.newPatient.personInfo)


  useEffect(() => {
    setGenderValue(Cinsiyet)
  }, [Cinsiyet])

  useEffect(() => {
    setCityValue(Sehir)
  }, [Sehir])

  useEffect(() => {
    setİlceValue(İlce)
  }, [ilce])

  return (
    <View style={style.container}>
      <View style={style.textWrapper}>
        <ScrollView showsVerticalScrollIndicator={false} >

          <TextInput
            key={"ad"}
            inputMode={"text"}
            style={style.textInput}
            outlineColor={colors.textColor}
            activeOutlineColor={colors.textColor}
            defaultValue={Ad}
            mode='outlined'
            label={"Ad"}
            onChangeText={(e) => {
              dispatch(addNewPersonInfo({
                "Ad": e
              }))
            }}
          />
          <TextInput
            key={"soyad"}
            inputMode={"text"}
            style={style.textInput}
            outlineColor={colors.textColor}
            activeOutlineColor={colors.textColor}
            mode='outlined'
            label={"Soyad"}
            defaultValue={Soyad}
            onChangeText={(e) => {
              dispatch(addNewPersonInfo({
                "Soyad": e
              }))
            }}
          />
          <TextInput
            key={"yaş"}
            inputMode={"decimal"}
            style={style.textInput}
            outlineColor={colors.textColor}
            activeOutlineColor={colors.textColor}
            defaultValue={Yas}
            mode='outlined'
            label={"Yaş"}
            onChangeText={(e) => {
              dispatch(addNewPersonInfo({
                "Yas": e
              }))
            }}
          />
          <DropDownPicker
            key={"cinsiyet"}
            open={genderOpen}
            style={style.textInput}
            value={genderValue}
            items={genders}
            setOpen={setGenderOpen}
            setValue={setGenderValue}

            placeholder={"Cinsiyet"}
            searchPlaceholder='Ara'
            zIndex={1000}
            listMode='MODAL'
            searchable={true}
            onChangeValue={(e) => {
              dispatch(addNewPersonInfo({
                "Cinsiyet": e
              }))
            }}
          />
          <TextInput
            key={"boy"}
            inputMode={"decimal"}
            style={style.textInput}
            outlineColor={colors.textColor}
            activeOutlineColor={colors.textColor}
            defaultValue={Boy}
            mode='outlined'
            label={"Boy"}
            onChangeText={(e) => {
              dispatch(addNewPersonInfo({
                "Boy": e
              }))
            }}
          />
          <TextInput
            key={"kilo"}
            inputMode={"decimal"}
            style={style.textInput}
            outlineColor={colors.textColor}
            activeOutlineColor={colors.textColor}
            defaultValue={Kilo}
            mode='outlined'
            label={"kilo"}
            onChangeText={(e) => {
              dispatch(addNewPersonInfo({
                "Kilo": e
              }))
            }}
          />
          <DropDownPicker
            key={"sehir"}
            open={citiesOpen}
            style={style.textInput}
            value={cityValue}
            items={cities}

            setOpen={setCitiesOpen}
            setValue={setCityValue}
            placeholder={"Şehir"}
            searchPlaceholder='Ara'
            zIndex={1000}
            listMode='MODAL'
            searchable={true}
            onChangeValue={(val) => {
              let ilceler = cityData.find(item => item.name == val)?.counties.map(item => ({ value: item, label: item }))

              setİlce(ilceler ?? [])

              dispatch(addNewPersonInfo({
                Sehir: val
              }))
            }}
          />
          <DropDownPicker
            key={"ilce"}
            open={ilceOpen}
            style={style.textInput}
            value={ilceValue}
            items={ilce}
            setOpen={setİlceOpen}
            setValue={setİlceValue}
            placeholder={"İlçe"}
            searchPlaceholder='Ara'
            zIndex={1000}
            listMode='MODAL'
            searchable={true}
            onChangeValue={(val) => {
              dispatch(addNewPersonInfo({
                İlce: val
              }))
            }}
          />
          <TextInput
            numberOfLines={5}
            multiline={true}
            key={"adres"}
            inputMode={"text"}
            style={style.textInput}
            outlineColor={colors.textColor}
            activeOutlineColor={colors.textColor}
            placeholder='Adresin tamamını giriniz'
            defaultValue={Adres}
            mode='outlined'
            label={"adres"}
            onChangeText={(e) => {
              dispatch(addNewPersonInfo({
                "Adres": e
              }))
            }}
          />

        </ScrollView>
      </View>
    </View >
  )
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainColor,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  textInput: {
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 5,

  }
})



export default PatientPersonelInfoPage