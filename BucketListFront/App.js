import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import ProfilScreen from "./screens/ProfilScreen";
import Payment from "./screens/Payment";
import ChatScreen from "./screens/ChatScreen";
import TabOneScreen from "./screens/TabOneScreen";
import ChatRoomScreen from "./screens/ChatRoomScreen";
import WishCardCreate from "./screens/WishCardCreate";
import MessageRoomScreen from "./screens/MessageRoomScreen";
import { Directions } from "react-native-gesture-handler";

const { Navigator, Screen } = createStackNavigator();

export default function App() {

  return (
    // <View>
    //   <TabOneScreen></TabOneScreen>
    // </View>
    <NavigationContainer styles={styles.container}>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="WishCardCreate" component={WishCardCreate} />
        <Screen name="Register" component={RegisterScreen} />
        <Screen name="Main" component={MainScreen} />
        <Screen name="Profil" component={ProfilScreen} />
        <Screen name="Payment" component={Payment} />
        <Screen name="Chat" component={ChatScreen} />
        <Screen name="TabOneScreen" component={TabOneScreen} />
        <Screen name="Message" component={ChatRoomScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});