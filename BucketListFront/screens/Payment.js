import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from '../components/keys';
import { Button, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CreditCardInput } from "react-native-credit-card-input";
import { getToken } from '../variables/token';

// create a component
const CURRENCY = 'EUR';
var CARD_TOKEN = null;


function getCreditCardToken(creditCardData){
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @param key
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken, key){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

function Payment (id, navigation)  {
let idcp=id
  id=id.route.params.id;
  const [CardInput, setCardInput] = React.useState({})
  const [montant, setMontant] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [key, setKey] = useState('');
  const onSubmit = async () => {
    console.log('ok');
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('carte invalide');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert("carte de crédit erreur");
        return;
      }
    } catch (e) {
      console.log("e",e);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken, key,   
    {
      billingDetails: {
        email: email,
      }
    });
    // Handle any errors from your server
    if (error) {
      alert(error)
    } else {
      let pament_data = await charges();
      console.log("pament_data", pament_data);
      if(pament_data.status == 'succeeded')
      {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getToken());
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "description": description,
          "wishcardid": id,
          "total": montant * 1, 
        });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };
        fetch("http://51.75.201.234:8000/api/pot", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        Alert.alert('Paiement effectué');
        idcp.route.params.navigation.navigation.navigate("Profil");
        pament_data["billing_details"].email = email
       // console.log(pament_data["billing_details"].email);
       // console.log("pament_data", pament_data);
      }
      else{
        Alert.alert('Paiement refusé');
      }
    }
  };

  const charges = async () => {

  
    
    const card = {
        amount: montant * 100, 
        currency: CURRENCY,
        source: CARD_TOKEN,
        description: description,
    }
    console.log(card);    
  
      return fetch('https://api.stripe.com/v1/charges', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${Secret_key}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
  };
  


  const _onChange =(data) => {
    setCardInput(data);
  }

  return (
    <>
    <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
        <Image 
        source={{uri:'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png'}}
        style={styles.ImgStyle}
        />
         <CreditCardInput 
        inputContainerStyle={styles.inputContainerStyle} 
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ffff"
        onChange={_onChange} />
        <TextInput
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
              mode="outlined"
            />
        <TextInput
              label="Montant à payer"
              value={montant}
              onChangeText={(montant) => setMontant(montant)}
              style={styles.input}
              mode="outlined"
            />
         <TextInput
              label="Description"
              value={description}
              onChangeText={(description) => setDescription(description)}
              style={styles.input}
              mode="outlined"
            />    
      <TouchableOpacity 
      onPress={onSubmit}>
        <Button
              style={styles.button}
              labelStyle={styles.text}>
              Payer
        </Button>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
      </KeyboardAwareScrollView >
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: { 
      flexGrow: 1,
      justifyContent: "center",
      maxWidth: 300,
      height: Dimensions.get("window").height,
      marginLeft: 41,
  },
  ImgStyle: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "blue",
    marginTop: 15,
  },
  buttonText : {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    borderRadius:5
  },
  inputStyle : {
    backgroundColor:'blue',
    paddingLeft:20,
    borderRadius:5,
    color:'#FFFFFF',
    height: 40,
    marginLeft: -17,
  },
  labelStyle : {
    width: "100%",
    marginVertical: 10,
    marginTop: 5,
    marginLeft:50,
  },
  input: {
    width: "100%",
    marginTop: 22,
    marginBottom: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: "white",
  },
});

//make this component available to the app
export default Payment;