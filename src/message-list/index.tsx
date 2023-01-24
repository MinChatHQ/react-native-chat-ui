import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, memo } from 'react'
import type MessageType from '../MessageType'
import Message, { Props as MessageProps } from '../message'
import Loading from '../loading'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import TypingIndicator from '../typing-indicator'

type Props = {
    themeColor?: string
    messages?: MessageType[]
    currentUserId?: string
    loading?: boolean
    // this is true when the message a message is still being sent so show some form of loader on the last message
    sendMessageLoading?: boolean
    onScrollToTop?: () => void
    mobileView?: boolean
    showTypingIndicator?: boolean
    typingIndicatorContent?: string
}

const MessageList = ({
    messages,
    currentUserId,
    loading = false,
    sendMessageLoading = false,
    onScrollToTop,
    themeColor = '#6ea9d7',
    typingIndicatorContent,
    showTypingIndicator
}: Props) => {

    const [isAtBottom, setIsAtBottom] = React.useState(false)

    const [reversedMessages, setReversedMessages] = React.useState<MessageType[]>([])

    const flatlistRef = React.useRef<any>()

    /** keeps track of whether messages was previously empty or whether it has already scrolled */
    const [messagesWasEmpty, setMessagesWasEmpty] = React.useState(true)

    React.useEffect(() => {
        if (messages) {
            //it add messages that are not already in the reversedMessages array that are incoming from the messages array without needing to recreate the 
            //reversedMessages array
            const localReversedMessages = [...messages].reverse()

            const notExistingMessages = localReversedMessages.filter(message => {
                return !reversedMessages.find(rMessage => rMessage.id === message.id)
            })

            setReversedMessages(value => {
                value.unshift(...notExistingMessages)
                return value
            })
        }
    }, [messages])

    React.useEffect(() => {
        if (!reversedMessages) {
            setMessagesWasEmpty(true)
        }

        if (reversedMessages) {

            if (messagesWasEmpty) {
                //if the messages object was previously empty then scroll to bottom
                // this is for when the first page of messages arrives
                //if a user has instead scrolled to the top and the next page of messages arrives then don't scroll to bottom

                setMessagesWasEmpty(false)
            }

            //when closer to the bottom of the scroll bar and a new message arrives then scroll to bottom
            if (isAtBottom) {
                scrollToBottom()
            }

        }
    }, [reversedMessages])

    React.useEffect(() => {
        //TODO when closer to the bottom of the scroll bar and a new message arrives then scroll to bottom
        if (isAtBottom) {
            scrollToBottom()
        }
    }, [showTypingIndicator])


    const scrollToBottom = async () => {
        if (flatlistRef.current) {
            flatlistRef.current.scrollToEnd({ animated: true })
        }
    }


    const MemoMessage = memo((props: MessageProps) => {
        // Render image using imageUrl
        return <Message {...props} />
    }
        , (prevProps, nextProps) => {
            return prevProps.loading === nextProps.loading
        }
    )


    const renderItem = useCallback(({ item: { user, text }, index }: { item: MessageType, index: number }) => {

        //determining the type of message to render
        let lastClusterMessage, firstClusterMessage, last, single

        //if it is the first message in the messages array then show the header
        if (index === 0) { lastClusterMessage = true }
        //if the previous message from a different user then show the header
        if (index > 0 && reversedMessages[index - 1]?.user.id !== user.id) { lastClusterMessage = true; last = true }
        //if it is the last message in the messages array then show the avatar and is the last incoming
        if (index === reversedMessages.length - 1) { firstClusterMessage = true; }
        //if the next message from a different user then show the avatar and is last message incoming
        if (index < reversedMessages.length - 1 && reversedMessages[index + 1]?.user.id !== user.id) { firstClusterMessage = true; }
        if (index < reversedMessages.length + 1 && reversedMessages[index - 1]?.user.id !== user.id) { last = true }

        //if the next message and the previous message are not from the same user then single incoming is true
        if (index < reversedMessages.length - 1 && index > 0 && reversedMessages[index + 1]?.user.id !== user.id && reversedMessages[index - 1]?.user.id !== user.id) { single = true }
        //if it is the first message in the messages array and the next message is from a different user then single incoming is true
        if (index === 0 && index < reversedMessages.length - 1 && reversedMessages[index + 1]?.user.id !== user.id) { single = true }
        //if it is the last message in the messages array and the previous message is from a different user then single incoming is true
        if (index === reversedMessages.length - 1 && index > 0 && reversedMessages[index - 1]?.user.id !== user.id) { single = true }
        //if the messages array contains only 1 message then single incoming is true
        if (reversedMessages.length === 1) { single = true }

        if (user.id == (currentUserId && currentUserId.toLowerCase())) {
            // my message
            return <MemoMessage
                type="outgoing"
                themeColor={themeColor}
                last={single ? false : last}
                single={single}
                clusterFirstMessage={firstClusterMessage}
                clusterLastMessage={lastClusterMessage}
                // the last message should show loading if sendMessage loading is true
                loading={(index === 0) && sendMessageLoading}
            >{text}</MemoMessage>

        } else {
            // other message
            return <MemoMessage
                type='incoming'
                themeColor={themeColor}
                user={user}
                showAvatar={lastClusterMessage}
                showHeader={firstClusterMessage}
                last={single ? false : last}
                single={single}
            >{text}</MemoMessage>
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {loading ?
                    <Loading themeColor={themeColor} />
                    :
                    <>
                        {(messages && messages.length <= 0) ?
                            <View style={styles.noMessagesContainer}>
                                <Text style={styles.noMessagesText}>No messages yet...</Text>
                            </View>

                            :
                            <View style={styles.scrollContainer}>
                                <KeyboardAwareFlatList
                                    inverted={true}
                                    ref={flatlistRef}
                                    keyExtractor={(item, index) => item.id ? item.id : index.toString()}
                                    data={reversedMessages || []}
                                    renderItem={renderItem}
                                    ListHeaderComponent={
                                        showTypingIndicator ? <TypingIndicator
                                            content={typingIndicatorContent}
                                            themeColor={themeColor} />
                                            : undefined
                                    }
                                    onScroll={(e) => {
                                        if (e.nativeEvent.contentOffset.y <= 100) {
                                            setIsAtBottom(true)
                                        } else {
                                            setIsAtBottom(false)
                                        }

                                        //check if the scroll is close to the bottom
                                        if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height - 50) {
                                            onScrollToTop && onScrollToTop()
                                        } else {
                                        }
                                    }}
                                />
                            </View>
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
        height: '100%',

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
        paddingTop: 90,
        paddingBottom: 90,
        height: '100%',
    },
    innerContainer: {
    },
    noMessagesContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noMessagesText: {
        color: " rgba(0,0,0,.36)",
        display: 'flex',
        fontSize: 14,
    }
})

export default MessageList