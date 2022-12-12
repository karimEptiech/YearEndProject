// import React from "react";

// import { View, Image, Text, Pressable } from "react-native"
// import { useNavigation } from '@react-navigation/core'

// import styles from "./styles";

// export default function ChatRoomItem({ chatRoom }) {
//     const user = chatRoom.users[1];

//     const navigation = useNavigation();

//     const onPress = () => {
//         console.warn('pressed on', user.name)
//         navigation.navigate('Message', { id: chatRoom.id });
//     }

//     return (
//         <Pressable onPress={onPress} style={styles.container}>
//             <Image source={{uri : user.imageUri}} style={styles.image} />

//             {chatRoom.newMessages ? <View style={styles.badgeContainer}>
//                 <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
//             </View> : null}

//             <View style={styles.rightcontainer}>
//                 <View style={styles.row}>
//                     <Text style={styles.name}>{user.name}</Text>
//                     <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
//                 </View>
//                 <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage.content}</Text>
//             </View>
//         </Pressable>
//     );
// }



import React, {useState} from "react";

import { View, Image, Text, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/core'

import styles from "./styles";

export default function ChatRoomItem({ chatRoom, infoUser }) {
    // const user = chatRoom.users[1];
    const navigation = useNavigation();

    // console.log(chatRoom);

    const onPress = () => {
        // console.warn('pressed on', chatRoom.firstname)
        navigation.navigate('Message', { id: chatRoom.id });
    }
    // onPress={onPress}
    const [onLoadImage, setLoadImage] = useState(false);
    // console.log({uri : chatRoom.photo});
    const imageLoading = () => {
        if (chatRoom.photo.search("http") != -1)
            setLoadImage(true);
        else
            setLoadImage(false);
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={
                onLoadImage ?
                { uri: chatRoom.photo }
                : require('../../assets/anonyme.png')}
                style={styles.image}
            onLoad={() => imageLoading()} />

            {/* {chatRoom.newMessages ? <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
            </View> : null} */}

            <View style={styles.rightcontainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{chatRoom.firstname}{chatRoom.lastname}</Text>
                    <Text style={styles.text}>test</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>AZERTY</Text>
            </View>
        </Pressable>
    );
}
