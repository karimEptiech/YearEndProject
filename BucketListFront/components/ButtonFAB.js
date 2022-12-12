import React from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";

export default function ButtonFAB(props) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const goToLogin = () => props.props.navigation.navigate('Login')
  const goToMain = () => props.props.navigation.navigate('Main')
  const goToPayment = () => props.props.navigation.navigate('Payment')
  const goToRegister = () => props.props.navigation.navigate('Register')
  const { open } = state;
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "minus" : "plus"}
          color='white'
          fabStyle={{ backgroundColor: 'blue' }}
          actions={[
            {
              icon: "home",
              label: "Acceil",
              onPress: goToMain,
            },
            {
              icon: "shield-account",
              label: "Connexion",
              onPress: goToLogin,
            },{
              icon: "credit-card",
              label: "Cagnotte",
              onPress: goToPayment,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {

            }
          }}
        />
      </Portal>
    </Provider >
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
