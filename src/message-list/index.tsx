import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import type MessageType from '../MessageType'
import Message from '../message'
import Loading from '../loading'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

type Props = {
    themeColor?: string
    messages?: MessageType[]
    currentUserId?: string
    loading?: boolean
    // this is true when the message a message is still being sent so show some form of loader on the last message
    sendMessageLoading?: boolean
    onScrollToTop?: () => void
    mobileView?: boolean
}

const MessageList = ({
    messages,
    currentUserId,
    loading = false,
    sendMessageLoading = false,
    onScrollToTop,
    themeColor = '#6ea9d7',
}: Props) => {


    const scrollToBottom = async () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {loading ?
                    <Loading themeColor={themeColor} />
                    :
                    <>
                        {(messages && messages.length <= 0) ?
                            <View style={styles.noMessagesContainer}>
                                <Text>No messages yet...</Text>
                            </View>

                            :

                            <KeyboardAwareFlatList
                                style={styles.scrollContainer}
                                data={messages || []}
                                renderItem={({ item: { user, text }, index }) => {
                                    if (user.id == (currentUserId && currentUserId.toLowerCase())) {
                                        // my message
                                        return <Message key={index}
                                            position="right"
                                            themeColor={themeColor}
                                            // the last message should show loading if sendMessage loading is true
                                            loading={(index === (messages?.length || 0) - 1) && sendMessageLoading}
                                        >{text}</Message>

                                    } else {
                                        // other message
                                        return <Message
                                            position='left'
                                            themeColor={themeColor}
                                            key={index}
                                            user={user}
                                        >{text}</Message>
                                    }
                                }}

                            />
                        }
                    </>
                }
            </View>



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f4f6',

    },
    // scrollBackground: {
    //     width: '100%',
    //     height: '100%',
    // },
    // scrollBackgroundContainer: {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    // },
    scrollContainer: {
        zIndex: 2,
    },
    innerContainer: {
    },
    noMessagesContainer: {
    },
})

export default MessageList