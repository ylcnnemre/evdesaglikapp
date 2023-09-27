import { useEffect, useState } from "react"
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginSplash from './src/pages/LoginSplash';
import LoginPage from './src/pages/LoginPage';
import { SafeAreaView } from "react-native-safe-area-context"
import HomePage from "./src/pages/Home/HomePage";
import { httpClient } from "./src/api/HttpClient";
import { Provider } from "react-redux"
import { store } from "./src/redux/store";
import { useSelector } from "react-redux"
import AppNav from "./src/navigation/AppNav";
import { PaperProvider } from "react-native-paper";
import "react-native-get-random-values";


export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider  >
        <AppNav />
      </PaperProvider>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
