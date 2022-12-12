import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import WishCard from "../components/WishCard";
import { getToken } from "../variables/token";
import { Button, TextInput } from "react-native-paper";

export default function ProfilScreen({ navigation, route }) {
  let arrayFriends = { friends: [] };
  let state = {
    carouselItems: [
      {
        title: "Amis 1",
        text: "Text 1",
      },
      {
        title: "Amis 2",
        text: "Text 2",
      },
      {
        title: "Amis 3",
        text: "Text 3",
      },
      {
        title: "Amis 4",
        text: "Text 4",
      },
      {
        title: "Amis 5",
        text: "Text 5",
      },
      {
        title: "Amis 5",
        text: "Text 5",
      },
      {
        title: "Amis 5",
        text: "Text 5",
      },
      {
        title: "Amis 5",
        text: "Text 5",
      },
    ],
  };
  let [friendId, setFriend] = React.useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataFriends, setDataFriends] = useState([{}]);

  useEffect(() => {
    getUser();
    getUserFriends();
  }, []);

  const addFriend = () => {
    if (getToken()) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken());
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        "http://51.75.201.234:8000/api/friend/add/" + friendId,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setFriend(null);
          Alert.alert("Vous venez de suivre " + result.user.firstname);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const getUserId = (userId) => {
    if (getToken()) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken());
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch("http://51.75.201.234:8000/api/user/" + userId, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          arrayFriends.friends.push(result);
          console.log("LA");
          console.log(arrayFriends);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const getUser = async () => {
    if (getToken()) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken());
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          "http://51.75.201.234:8000/api/user/me",
          requestOptions
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getUserFriends = async () => {
    if (getToken()) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken());
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          "http://51.75.201.234:8000/api/friends",
          requestOptions
        );
        const json = await response.json();
        setDataFriends(json);
        dataFriends.map((e) => {
          getUserId(e.friendid);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  function _renderItem({ item, index }) {
    const onPress = () => alert(item.firstname);
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          // height: 25,
          // width: 100,
          // borderRadius: 5,
          // padding: 0,
          // marginLeft: 30,
        }}
      >
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>{item.firstname}</Text>
          <Image
            source={require("../assets/profil.jpg")}
            style={styles.friendProfil}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: "10%" }}>
          <Text
            style={{
              position: "absolute",
              fontSize: 25,
              top: 60,
              left: -30,
              fontFamily: "Arial",
            }}
          >
            {data.firstname}
          </Text>
          <Image
            source={require("../assets/profil.jpg")}
            style={styles.profil}
          />
        </View>
        <View>
          {isLoading ? (
            <View>
              <Text>ça charge</Text>
            </View>
          ) : (
            <View>
              <Text></Text>
            </View>
          )}
          <Text style={styles.bioContainer}>{data.bio}</Text>
        </View>
        <View style={styles.addFriend}>
          <TextInput
            label="id friend"
            value={friendId}
            onChangeText={(friendId) => setFriend(friendId)}
            style={styles.input}
            mode="outlined"
          />
          <Button icon="account-search" onPress={addFriend}>
            Add friends
          </Button>
        </View>
        <View
          style={{
            backgroundColor: "rebeccapurple",
            paddingTop: 50,
            paddingBottom: 50,
            maxHeight: "30%",
          }}
        >
          {/* <ScrollView horizontal> */}
          {/* <Text>{arrayFriends.friends[0].firstname}</Text> */}
          {/* <Text>{arrayFriends.friends[0].firstname}</Text> */}
          <FlatList
            data={state.carouselItems}
            renderItem={_renderItem}
            horizontal
          ></FlatList>
        </View>
        <ScrollView contentContainerStyle={styles.container2}>
          <WishCard navigation={navigation}></WishCard>
        </ScrollView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    alignSelf: "center",
    height: "130%",
  },
  container2: {},
  profil: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderWidth: 3,
    overflow: "hidden",
    borderColor: "black",
    alignSelf: "center",
  },
  friendProfil: {
    height: 50,
    width: 50,
    padding: 50,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 50,
    borderWidth: 3,
    overflow: "hidden",
    borderColor: "black",
    alignSelf: "center",
    alignContent: "center",
  },
  bioContainer: {
    textAlign: "center",
  },
  scrollContainer: {
    height: "100%",
  },
  input: {
    alignSelf: "center",
    width: "45%",
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  addFriend: {
    display: "flex",
  },
});
