import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginRight: 10,
    },
    badgeContainer: {
        backgroundColor: '#3777f0',
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 45,
        top: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    rightcontainer:{
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        color: "grey",
    },
})

export default styles;