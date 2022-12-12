import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import ButtonFAB from "../components/ButtonFAB";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function MainScreen(props) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <>
      <KeyboardAwareScrollView>
        <ScrollView style={styles.scrollContainer}>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
        </ScrollView>
      </KeyboardAwareScrollView >
      <ButtonFAB props={props}></ButtonFAB>
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => props.navigation.push("Profil")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },
  scrollContainer: {
    height: "100%",
  },
});
