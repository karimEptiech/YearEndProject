import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, Button } from 'react-native';
import { useRoute } from '@react-navigation/core'
import Message from '../components/Message';
import chatRoomData from '../assets/dummy-data/._Chats';
import MessageInput from '../components/MessageInput';
import { getToken } from "../variables/token";
import { useNavigation } from '@react-navigation/core'

export default function MessageRoom() {
    const route = useRoute();

    const token = getToken();

    const [isLoading, setLoading] = useState(true);
    // const [data, setData] = useState([]);
    const [myId, setMyId] = useState([]);
    const [data, setData] = useState([]);
    const [allMessage, setAllMessage] = useState([]);

    useEffect(() => {
        // console.log(data);
        // console.log("DATA ==> " + data);
        // console.log("MY MESSAGE ==> " + data.mymessage);
        
        getMessage();
        if (data.mymessage != undefined) {
            setAllMessage(data.mymessage.concat(data.friendmessage));
            // console.log(allMessage[0]);
        } else {
            console.log("testeeee")
        }
        getUser();
        // console.log(chatRoomData.messages);
    }, []);

    const getMessage = async() => {
        if (getToken()) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
            try {
                const response= await fetch("http://51.75.201.234:8000/api/message/"+route.params?.id, requestOptions);
                const json = await response.json();
                setData(json);
                setAllMessage(data.mymessage.concat(data.friendmessage));
                // console.log(json);
                return (json);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            };
        }
    };

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
            setMyId(result.id);
          })
          .catch((error) => console.log("error", error));
    };
    const navigation = useNavigation();
    function refreshPage(){ 
        console.log("refresh");
        navigation.navigate('Message', { id: myId });
    }
    return (
        <SafeAreaView style={styles.page}>            
            <FlatList
                data={allMessage}
                renderItem={({item}) => <Message message={item} myId={myId}/>}
                inverted
            ></FlatList>
            {/* <Button title="Press to charg msg" onPress={ refreshPage }/> */}
            {/* <button onClick={() => console.log("azert")}>
                Cliquez ici
            </button> */}
            <MessageInput id={route.params?.id}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    },
});