import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';

type Props = {
    onBack?: () => void
    children?: string
    showBack?: boolean
}

const MessageHeader = ({
    onBack, children, showBack = true,
}: Props) => {
    return (
        <View style={styles.container}>
            {showBack &&
                <TouchableOpacity onPress={onBack}
                    style={styles.backContainer}>
                    <SvgXml xml={
                        `<svg
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.694 18.6943C15.102 18.2867 15.102 17.6259 14.694 17.2184L9.4699 12L14.694 6.78165C15.102 6.37408 15.102 5.71326 14.694 5.30568C14.2859 4.89811 13.6244 4.8981 13.2164 5.30568L7.30602 11.2096C7.08861 11.4267 6.98704 11.7158 7.00132 12.0002C6.98713 12.2844 7.0887 12.5733 7.30603 12.7904L13.2164 18.6943C13.6244 19.1019 14.2859 19.1019 14.694 18.6943Z" fill="black" />
                </svg>`
                    } width="24" height="24" />
                </TouchableOpacity>
            }

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{children}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "rgba(0, 0, 0, 0.07999999821186066)",
        borderBottomWidth: 1,
        backgroundColor: "#f3f4f6",
        height: 90,
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 10,
    },
    backContainer: {
        width: 38,
        zIndex: 12,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 48,
    },
    titleContainer: {
        position: "absolute",
        left: 0,
        right: 0,
    },
    title: {
        textAlign: "center",
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
        marginTop: 46,
    }
})

export default MessageHeader