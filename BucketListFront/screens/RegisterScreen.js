import React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, TextInput } from "react-native-paper";
import Logo from "../components/Logo";
import Header from "../components/Header";
import ButtonFAB from "../components/ButtonFAB";

export default function RegisterScreen(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setConfirmPassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [bio, setBio] = React.useState("");

  const onRegisterPressed = () => {
    const myHeaders = new Headers();
    const raw = JSON.stringify({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      photo: photo,
      bio: bio,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    myHeaders.append("Content-Type", "application/json");
    fetch("http://51.75.201.234:8000/api/register", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        props.navigation.navigate("Login");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Logo />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Photo"
              value={photo}
              onChangeText={(photo) => setPhoto(photo)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <TextInput
              label="Confirm password"
              value={passwordConfirm}
              onChangeText={(password) => setConfirmPassword(password)}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <TextInput
              label="Firstname"
              value={firstname}
              onChangeText={(firstname) => setFirstname(firstname)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Lastname"
              value={lastname}
              onChangeText={(lastname) => setLastname(lastname)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Bio"
              value={bio}
              onChangeText={(bio) => setBio(bio)}
              style={styles.bioInput}
              mode="outlined"
            />

            <Button
              style={styles.button}
              labelStyle={styles.text}
              onPress={onRegisterPressed}
            >
              Inscrivez-vous
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <ButtonFAB props={props}></ButtonFAB>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    maxWidth: 340,
    alignSelf: "center",
    height: Dimensions.get("window").height,
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  input: {
    width: "45%",
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  bioInput: {
    width: "100%",
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "blue",
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: "white",
  },
});
