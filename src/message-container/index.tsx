import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import type MessageType from '../MessageType'
import MessageList from '../message-list'
import MessageInput from '../message-input'
import MessageHeader from '../message-header'


export type Props = {
    onBack?: () => void
    showBack?: boolean
    header?: string
    mobileView?: boolean
    onSendMessage?: (text: string) => void
    themeColor?: string
    onScrollToTop?: () => void
    sendMessageLoading?: boolean
    loading?: boolean
    currentUserId?: string
    messages?: MessageType[]
    onStartTyping?: () => void,
    onEndTyping?: () => void,
    showTypingIndicator?: boolean
    typingIndicatorContent?: string
    onAttachClick?: () => void,

}
const MessageContainer = (props: Props) => {
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            {!props.loading ?
                <MessageHeader
                    {...props} >{props.header}</MessageHeader>
                :
                <View style={{ height: 2 }} />
            }

            <MessageList
                {...props}
            />


            {!props.loading ?
                <MessageInput
                    {...props}
                />
                :
                <View style={{ height: 2 }} />
            }
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        position: "relative",
    }
})

export default MessageContainer