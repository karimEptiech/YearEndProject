import React, { useState, useEffect } from "react";

import { View, StyleSheet, FlatList } from "react-native"
import { Button } from "react-native-paper";
import { getToken } from "../variables/token";
import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem";

import chatRoomsData from "../assets/dummy-data/._ChatRooms";

export default function TabOneScreen(props) {
  const token = getToken();
  let infoUser;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
    getAllUser();
  }, []);

  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://51.75.201.234:8000/api/user/me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        infoUser = result;
      })
      .catch((error) => console.log("error", error));
  };

  const getAllUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://51.75.201.234:8000/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  };

  const test = () => {
    console.log("Salut");
  }

  return(
      <View>
        <View style={{height: 20}}></View>
        {/* <View>
          <Button onPress={getAllUser}>LOL</Button>
        </View> */}
          <View style={{paddingTop: 30}}></View>
          <View style={styles.page}>
            <FlatList
            data={data}
            renderItem={({ item }) => <ChatRoomItem chatRoom={item} info={infoUser} />}
            showsHorizontalScrollIndicator={false}
            />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //     flexDirection: 'row',
  //     padding: 10,
  // },
  // image: {
  //     height: 60,
  //     width: 60,
  //     borderRadius: 50,
  //     marginRight: 10,
  // },
  // badgeContainer: {
  //     backgroundColor: '#3872E9',
  //     width: 20,
  //     height: 20,
  //     borderRadius: 10,
  //     borderWidth: 1,
  //     borderColor: "white",
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     position: 'absolute',
  //     left: 45,
  //     top: 10,
  // },
  // badgeText: {
  //     color: 'white',
  //     fontSize: 12,
  // },
  // rightcontainer:{
  //     flex: 1,
  // },
  // row: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  // },
  // name: {
  //     fontWeight: 'bold',
  //     fontSize: 18,
  // },
  // text: {
  //     color: "grey",
  // },
})

const test = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "blue",
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 50,
    color: "white",
  }
});