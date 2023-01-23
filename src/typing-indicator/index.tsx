import { View, StyleSheet, Text } from 'react-native';
import React from 'react'
import {
    DotIndicator,
} from 'react-native-indicators';

type Props = {
    content?: string
    themeColor?: string
}

const TypingIndicator = ({
    content,
    themeColor = '#6ea9d7'
}: Props) => {
    return (
        <View style={styles.container}>

        <View>
            {/* @ts-ignore */}
            <DotIndicator 
            count={3}
            size={4}
            color={themeColor}  />
        </View>

            <Text style={[styles.contentText, { color: themeColor }]}>{content}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 32,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom:12,
        marginTop:12
    },
    contentText: {
        flex: 1,
        fontSize: 14,
        marginLeft: 5,
    }
})

export default TypingIndicator