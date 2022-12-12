import React, { useState, useEffect } from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { getToken } from "../variables/token";
import MyModal from "./myModal";
import { useIsFocused } from '@react-navigation/native'


export default function WishCard(navigation) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused()
  const goToPayment = (id) => {

  }
  const isFullyPayed = async (id) => {

  }
  const Delete = async (id) => {
    console.log(id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    try {
      let response = await fetch("http://51.75.201.234:8000/api/wishcard/" + id, requestOptions)
      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.error(error);
    } finally {
      fetchCard();
    }

  }

  function card(i) {

    let title = i['title']
    let id = i['id']
    let description = i['description']
    let list = i['list']

    return (

      <View key={id} style={styles.item}>
        <Button onPress={() => {
          navigation.navigation.navigate("Payment", { id, navigation });
        }}>
          <Text style={isFullyPayed(id) ? styles.listItems : styles.listItemsNo}>{title} </Text>
        </Button>
        <TouchableOpacity onPress={() => { Delete(id) }}>
          <Text style={{ position: "absolute", top: -20, left: -25, width: 20, color: "white", backgroundColor: "rebeccapurple", textAlign: 'center', borderWidth: 2, borderColor: "rebeccapurple" }}>X</Text>
        </TouchableOpacity>
        <Text style={styles.description} >{description} </Text>
        <View style={styles.underItem}>
          {list.map((e) => {
            return (
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontSize: 12, flex: 2, width: "100%", marginRight: "10%", }}>{"item: " + e[0]['item']}</Text>
                <Text style={{ fontSize: 12, flex: 2, width: "100%", marginRight: "10%", }}>{"prix:  " + e[1]['price']}€</Text>
                <Text onPress={() => Linking.openURL(e[2]['url'])} style={{ fontSize: 12, width: "100%", flex: 2, marginBottom: "10%" }}>Url:   <Text style={{ color: "blue" }}>Lien</Text></Text>
              </View>
            )
          })}
          <MyModal id={id}></MyModal>
        </View>

      </View >
    )
  }

  const fetchCard = async () => {
    if (getToken()) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken());
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      try {
        const response = await fetch("http://51.75.201.234:8000/api/wishcard/me", requestOptions)
        const json = await response.json()
        setData(json);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
  }
  useEffect(() => {
    fetchCard();
  }, [isFocused]);

  const onClick = () => {
    navigation.navigation.navigate("WishCardCreate", { navigation: navigation });
  };


  return (
    <ScrollView>
      <View style={{ flex: 1, width: "50%", alignSelf: 'center', }}>
        <Button style={styles.button} onPress={onClick}>Nouvelle</Button>
      </View>
      {isLoading ? <View><Text>ça charge</Text></View> : <View><Text></Text></View>}
      <View style={styles.container}>
        {data.map((e) => card(e ?? null))}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 30,

  },
  description: {
    textAlign: 'center'
  },
  item: {
    margin: 10,
    height: 400,
    borderWidth: 2,
    width: '30%' // is 50% of container width
  },
  button2: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "rebeccapurple",
    marginTop: 15,
  },
  text: {
    color: 'black',
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 26,
  },
  underItem: {
    height: '80%',
    padding: 10,
    width: '100%',
    marginBottom: 5,
  },
  button: {
    borderColor: 'red',
    borderWidth: 3,
  },
  listItems: {
    borderWidth: 3,
    width: '100%',
    textAlign: 'center'
  }
})
