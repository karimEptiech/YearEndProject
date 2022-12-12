import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import ButtonFAB from "../components/ButtonFAB";
import { getToken } from "../variables/token";
function WishCardCreate(navigation) {
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const create = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "title": title,
      "description": description
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://51.75.201.234:8000/api/wishcard", requestOptions)
      .then(response => response.text())
      .then(navigation.navigation.navigate('Profil'))
      .catch(error => console.log('error', error));

  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(title) => setTitle(title)}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(description) => setDescription(description)}
          placeholder="Description"
        />
        <Button style={styles.button} labelStyle={styles.text} onPress={create}>
          Create
        </Button>

      </SafeAreaView>
      <ButtonFAB props={navigation.navigation}></ButtonFAB>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    width: "50%",
    alignSelf: "center",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: "white",
  },
  button: {
    width: "50%",
    alignSelf: 'center',
    marginVertical: 10,
    color: "white",
    backgroundColor: "blue",
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  }
});

export default WishCardCreate;