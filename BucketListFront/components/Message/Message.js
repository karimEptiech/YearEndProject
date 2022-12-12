import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const blue="#3777f0";
const grey="lightgrey";

const Message = ({ message, myId }) => {

    const isMe = message.id == myId;
    // console.log("MESSAGE ===>");
    // console.log(message);
    // console.log(message);
        return(
            <View style={[styles.container, isMe ? styles.leftContainer : styles.rightContainer]}>
                <Text style={{color: isMe ? "white" : "black"}}>{message.content}</Text>
                {/* <Text>a</Text> */}
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '75%',
    },
    leftContainer: {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: 'auto',
    },
    rightContainer: {
        backgroundColor: grey,
        marginLeft: 'auto',
        marginRight: 10,
    }
});

export default Message;