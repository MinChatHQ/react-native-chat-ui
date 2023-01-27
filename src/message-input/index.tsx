import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';


type Props = {
    onSendMessage?: (text: string) => void
    themeColor?: string
    onStartTyping?: () => void
    onEndTyping?: () => void
}

const MessageInput = ({
    onSendMessage,
    themeColor = '#6ea9d7',
    onStartTyping,
    onEndTyping
}: Props) => {
    const [text, setText] = React.useState("")

    const [typing, setTyping] = React.useState(false);

    React.useEffect(() => {
        //call the function when typing starts or ends but should not call it on every render and should only be called when the value of typing changes
        if (typing) {
            onStartTyping && onStartTyping()
        } else {
            onEndTyping && onEndTyping()
        }
    }, [typing])


    const handleSubmit = () => {
        if (text.trim().length > 0) {
            setTyping(false)

            onSendMessage && onSendMessage(text.trim())
            setText("")

        }
    }

    const typingTimeoutRef = React.useRef<any>(null);

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer,]}>
                <View style={[styles.inputBackground, { backgroundColor: themeColor }]} />

                <TextInput
                    onSubmitEditing={handleSubmit}
                    placeholder='Send a message...'
                    value={text}
                    onChangeText={(newText: string) => {
                        setText(newText)
                        setTyping(true);
                        clearTimeout(typingTimeoutRef.current);
                        typingTimeoutRef.current = setTimeout(() => setTyping(false), 2000)
                    }}
                    style={styles.input} />

            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.arrowContainer,
                { opacity: text.trim().length > 0 ? 1 : 0.4 }
                ]}>

                <SvgXml xml={
                    ` <svg
                    fill="${themeColor}"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 512 512" >
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>`
                } width="24" height="24" />
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
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 60,

    },
    inputContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
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
        display: "flex",
        alignItems: "center",
        // padding top controls the distance of the arrow from the top
        paddingTop: 20,

    }
})

export default MessageInput