import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useMemo, useLayoutEffect, FC } from 'react'
import { colors } from '../../style/color'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRoute, NavigationProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import HomeEntryPage from './HomeEntryPage'
import AddPatientPage from './AddPatientPage'
import PatientList from './PatientList'
import Header from '../../components/Header'
import PersonalPage from './PatientPersonalinfoPage'
import PatientPersonelInfoPage from './PatientPersonalinfoPage'
import HastaSikayet from './HastaSikayet'
import HastaHastalik from './HastaHastalik'
import Hastaİlac from './Hastaİlac'



const Stack = createStackNavigator()

const HomePage: FC<{ navigation: NavigationProp<any>, route: any }> = ({ navigation, route }) => {
  const active = useRoute()
  const active2 = getFocusedRouteNameFromRoute(active)
  useLayoutEffect(() => {
    if (active2 == "entry" || active2 == undefined) {
      navigation.setOptions({
        tabBarStyle: { display: "flex" }
      })
    }
    else {
      navigation.setOptions({
        tabBarStyle: { display: "none" }
      })
    }
  }, [active])

  return (
    <Stack.Navigator  >
      <Stack.Screen name='entry' component={HomeEntryPage} options={{
        headerShown: false
      }} />
      <Stack.Screen name='patientlist' component={PatientList} options={
        {
          header: (props) => (<Header props={props} name='Hastalar' />)
        }
      } />
      <Stack.Screen name='addpatient' component={AddPatientPage} options={{
        header: (props) => (<Header props={props} name='Hasta Ekle' />)
      }} />
      <Stack.Screen name='patientInfo' component={PatientPersonelInfoPage} options={{
        header: (props) => (<Header props={props} name='Kişisel Bilgiler' />)
      }} />
      <Stack.Screen name='sikayet' component={HastaSikayet} options={{
        header: (props) => (<Header props={props} name='Hastanın Şikayetleri' />)
      }} />
      <Stack.Screen  name='hastalik' component={HastaHastalik}  options={{
         header : (props) => (<Header  props={props}  name='Hastalıklar'  />)
      }} />
      <Stack.Screen  name='ilac' component={Hastaİlac} options={{
        header : (props) => (<Header props={props} name='İlac' />)
      }}  />
     </Stack.Navigator>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainColor,
    paddingVertical: 20,
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
    marginVertical: 10,
    height: 100
  },
  eventLabel: {
    color: "white",
    fontSize: 14
  }
})


export default HomePage