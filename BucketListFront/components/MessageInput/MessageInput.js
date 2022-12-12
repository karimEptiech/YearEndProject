import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { getToken } from "../../variables/token";

const MessageInput = ({id}) => {
    const token = getToken();
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

    const sendMsg = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        let raw = JSON.stringify({content: message});
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: "follow",
            body: raw,
        };
        fetch("http://51.75.201.234:8000/api/message/" + id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    };
    
    const [message, setMessage] = useState('');
    
    const sendMessage = () => {
        sendMsg();
        setMessage('');
    }

    const onPlusClicked = () => {
        console.warn("Write anything !");
    }

    const onPress = () => {
        if (message) {
            sendMessage();
        } else {
            onPlusClicked();
        }
    }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS == "ios" ? "padding" : "height"} keybordVerticalOffset={160}>
        <View style={styles.inputContainer}>
            <SimpleLineIcons name="emotsmile" size={24} color="#595959" style={styles.icon} />

            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Message..."
            />

            <Feather name="camera" size={24} color="#595959" />
            <MaterialCommunityIcons name="microphone-outline" size={24} color="#595959" />
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
            {message ? <Ionicons name="send" size={18} color="white" />: <AntDesign name="plus" size={24} color="white" />}
        </Pressable>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 10,
    },
    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#dedede',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#3777f0',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        marginBottom: 10
    }
})

export default MessageInput