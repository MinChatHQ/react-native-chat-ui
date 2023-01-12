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

    const [isAtBottom, setIsAtBottom] = React.useState(false)
    const [isRendered, setIsRendered] = React.useState(false);

    const [reversedMessages, setReversedMessages] = React.useState<MessageType[]>([])

    const flatlistRef = React.useRef<any>()

    /** keeps track of whether messages was previously empty or whether it has already scrolled */
    const [messagesWasEmpty, setMessagesWasEmpty] = React.useState(true)

    React.useEffect(() => {
        if (messages) {
            setReversedMessages([...messages].reverse())
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

            // //todo this is just a quick fix, the ideal behavior we would want is when new messages are added, it doesnt 
            // //scroll to the bottom and neither does it scroll to the top it remains right where it is
            // scrollToBottom()

            //when closer to the bottom of the scroll bar and a new message arrives then scroll to bottom
            if (isAtBottom) {
                scrollToBottom()
            }

        }
    }, [reversedMessages])

    const scrollToBottom = async () => {
        if (flatlistRef.current) {
            flatlistRef.current.scrollToEnd({ animated: true })
        }
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
                                <Text style={styles.noMessagesText}>No messages yet...</Text>
                            </View>

                            :
                            <View style={styles.scrollContainer}>
                                <KeyboardAwareFlatList
                                    inverted={true}
                                    ref={flatlistRef}
                                    onLayout={() => setIsRendered(true)}
                                    onScroll={(e) => {
                                        if (e.nativeEvent.contentOffset.y === 0) {
                                            onScrollToTop && onScrollToTop()
                                        }

                                        //check if the scroll is close to the bottom

                                        if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height - 50) {
                                            setIsAtBottom(true)
                                        } else {
                                            setIsAtBottom(false)
                                        }
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={reversedMessages || []}
                                    renderItem={({ item: { user, text }, index }) => {
                                        if (user.id == (currentUserId && currentUserId.toLowerCase())) {
                                            // my message
                                            return <Message key={index}
                                                position="right"
                                                themeColor={themeColor}
                                                // the last message should show loading if sendMessage loading is true
                                                loading={(index === 0) && sendMessageLoading}
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
        paddingBottom: 90
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