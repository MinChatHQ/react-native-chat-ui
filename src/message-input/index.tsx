import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'

type Props = {
    onSendMessage?: (text: string) => void
    themeColor?: string
}

const MessageInput = ({
    onSendMessage,
    themeColor='#6ea9d7',
}: Props) => {
    const [text, setText] = React.useState("")


    const handleSubmit = () => {
        if (text.trim().length > 0) {
            onSendMessage && onSendMessage(text.trim())
            setText("")

        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer,]}>
                <View style={[styles.inputBackground, { backgroundColor: themeColor }]} />

                <TextInput
                    placeholder='Send a message...'
                    value={text}
                    onChangeText={(newText) => setText(newText)}
                    style={styles.input} />

            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.arrowContainer,
                { opacity: text.trim().length > 0 ? 1 : 0.4 }
                ]}>
                {/* svg goes here */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f4f6",
        height: 90,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        zIndex: 10,
        borderTopColor: "rgba(0, 0, 0, 0.07999999821186066)",
        borderTopWidth: 1,
        paddingTop:8,
        boxSizing: "border-box",
        paddingLeft: 12,
        paddingRight: 56,

    },
    inputContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box"
    },
    input: {
        width: "100%",
        padding: 0,
        color: "rgba(0,0,0,.87)",
        fontSize: 14,
        opacity: 1,
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: "transparent",
        textAlign: "center"
    },

    inputBackground: {
        opacity: 0.4,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        borderRadius: 8,
        border: "1px solid #ecebeb"
    },
    arrowContainer: {
        position: "absolute",
        right: 0,
        paddingLeft: 24,
        paddingRight: 24,
        top: 0,
        bottom: 0,
        zIndex: 12,
        backgroundColor: "red",

    }
})

export default MessageInput