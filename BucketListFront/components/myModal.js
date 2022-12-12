import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { getToken } from "../variables/token";
function MyModal(id) {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [url, setUrl] = React.useState("");


  const addWish = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "list": [
        [
          { item },
          { price },
          { url }
        ]
      ],
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };


    fetch("http://51.75.201.234:8000/api/wish/" + id.id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    setModalVisible(!modalVisible)

  }
  const close = () => {
    setModalVisible(!modalVisible)
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ajouté les informations sur votre souhait!</Text>
            <Button onPress={close}> Annuler</Button>
            <View style={styles.containerInput}>
              <TextInput
                label="Item"
                placeholder="item"
                placeholderTextColor={"red"}
                value={item}
                onChangeText={(item) => setItem(item)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Prix"
                placeholder="prix en Euros"
                placeholderTextColor={"red"}
                value={price}
                onChangeText={(price) => setPrice(price)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Url"
                placeholder="Url"
                placeholderTextColor={"red"}
                value={url}
                onChangeText={(url) => setUrl(url)}
                style={styles.input}
                mode="outlined"
              />
            </View>
            <Button onPress={addWish}> Ok</Button>

          </View>

        </View>
      </Modal >
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Ajouter un voeu</Text>
      </Pressable>
    </View >
  );
};

const styles = StyleSheet.create({
  containerInput: {
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  input: {
    borderWidth: 2,

    marginTop: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MyModal;