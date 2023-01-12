import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {}

const ConversationHeader = ({ }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Messages</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        paddingTop: 40,
        backgroundColor: "#ffffff",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        borderBottomColor: "rgba(0, 0, 0, 0.07999999821186066)",
        borderBottomWidth: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        color: "#000000",
        width: "100%",
    }
})
export default ConversationHeader