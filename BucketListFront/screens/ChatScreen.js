import React, { useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

import Header from "../components/InputArea";

export default function ChatScreen(props) {
    const DATA = [
        {
          id: '1',
          firstName: 'First Item',
        },
        {
          id: '2',
          firstName: 'Second Item',
        },
        {
          id: '3',
          firstName: 'Third Item',
        },
        {
          id: '4',
          firstName: 'fourth Item',
        },
        {
          id: '5',
          firstName: 'fifth Item',
        },
        {
          id: '6',
          firstName: 'sixth Item',
        },
        {
          id: '7',
          firstName: 'seventh Item',
        },
        {
          id: '8',
          firstName: 'heith Item',
        },
    ];

    const [text, setText] = useState("");
    
    const Item = ({ title }) => (
      <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );
    
    //remplir avec les info de la base de donnée
    const renderItem = ({ item }) => (
      <Item title={item.firstName} />
      );
      
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.friendList}>
              <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
          <View style={styles.chat}>
              <View style={styles.chatView}></View>
              <TouchableOpacity style={styles.closeButtonParent} onPress={() => setText("")}>
                <Image style={styles.closeButton} source={require("../assets/send-button.png")} />
              </TouchableOpacity>
              <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={(value) => setText(value)}
              />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      scrollView: {
        // position: "absolute",
        backgroundColor: "#d3d3d3",
        height: "100%",
  },
  friendList: {
    // flexGrow: 0,
    // flexShrink: 1,
    // flexBasis: 100,
    // flexBasis: "100%",
    // height: 1200,
  },
  container: {
    position: "absolute",
    // flex: 1,
    flexDirection: "row",
    // alignContent: "space-between",
    width: "100%",
    height: "100%",
    // marginTop: StatusBar.currentHeight || 0,
    // flexGrow: 0,
    // flexShrink: 1,
    // flexBasis: 100,
  },
  chat: {
    // flexGrow: 0,
    // flexShrink: 1,
    flexBasis: "80%",
    backgroundColor: "#f0f8ff",
    // width: "80%",
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // fontSize: 50,
  },
  title: {
    fontSize: 80,
  },
  textInput: {
    height: 40,
    width: "90%",
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  closeButton: {
    height: 16,
    width: 16,
  },
});