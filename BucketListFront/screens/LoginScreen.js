import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Logo from "../components/Logo";
import Header from "../components/Header";
import ButtonFAB from "../components/ButtonFAB";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getToken, setToken } from "../variables/token";

export default function LoginScreen(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLoginPressed = () => {
    const myHeaders = new Headers();
    const raw = JSON.stringify({
      username: email,
      password: password,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    myHeaders.append("Content-Type", "application/json");
    fetch("http://51.75.201.234:8000/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setToken(result.token);
          props.navigation.navigate("Profil", { token: getToken() });
        }
      })
      .then((result) => console.log(result.token))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.containerHeader}>
            <Logo />
            <Header>Veuillez-vous connectez </Header>
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
              label="Mot de passe"
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />
            <Button
              style={styles.button}
              labelStyle={styles.text}
              onPress={onLoginPressed}
            >
              Se connecter
            </Button>
            <Button
              style={styles.button}
              labelStyle={styles.text}
              onPress={() => {
                props.navigation.push("TabOneScreen");
              }}
            >
              Messagerie
            </Button>
          </View>

          <View style={styles.row}>
            <Text>Vous n'avez pas de compte? </Text>
            <TouchableOpacity onPress={() => props.navigation.push("Register")}>
              <Text style={styles.link}>Inscrivez-vous</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ButtonFAB props={props}></ButtonFAB>
      </KeyboardAwareScrollView>
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
  },
  containerHeader: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginTop: 30,
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
  row: {
    flexDirection: "row",
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
});
