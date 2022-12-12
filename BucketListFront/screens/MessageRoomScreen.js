import React from 'react';
import { View, StyleSheet } from 'react-native';
import Message from '../components/Message';
import chatRoomData from '../assets/dummy-data/._ChatRooms';

export default function MessageRoom() {
    return (
        <View style={styles.page}>
            <Message message={chatRoomData.messages[2]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    },
});