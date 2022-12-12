import React, { useState, memo } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const InputArea = () => {
  const [text, setText] = useState("");
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.parent}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={(value) => setText(value)}
          />
          <TouchableOpacity
            style={styles.closeButtonParent}
            onPress={() => setText("")}
          >
            <Image
              style={styles.closeButton}
              source={require("../assets/send-button.png")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  parent: {
    marginLeft: 25,
    marginRight: 25,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    width: "90%",
  },
  closeButton: {
    height: 16,
    width: 16,
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});

export default memo(InputArea);