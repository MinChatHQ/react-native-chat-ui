import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import type ConversationType from '../ConversationType'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import Conversation from '../conversation'

import Loading from '../loading' 

export interface Props {
    onConversationClick?: (index: number) => void
    conversations?: ConversationType[],
    loading?: boolean
    onScrollToBottom?: () => void
    themeColor?: string
    /**
       * the current user on the chat ui
       */
    currentUserId?: string
}

const ConversationList = ({
    conversations,
    loading = false,
    onConversationClick,
    onScrollToBottom,
    themeColor = '#6ea9d7',
    currentUserId
}: Props) => {

    return (
        <View style={styles.container}>
            {conversations && conversations.length <= 0 &&
                <View style={styles.noChatsTextContainer}>
                    <Text style={styles.noChatsText}>No conversation started...</Text>
                </View>
            }

            {loading ? <Loading themeColor={themeColor} /> :

                <View style={styles.scrollContainer}>


                    <KeyboardAwareFlatList
                        onEndReached={() => onScrollToBottom && onScrollToBottom()}
                        keyExtractor={(item, index) => item.id ? item.id : index.toString()}
                        data={conversations || []}
                        renderItem={({ item, index }) => {
                            return <Conversation
                                // themeColor={themeColor}
                                onClick={() => onConversationClick && onConversationClick(index)}
                                key={index}
                                title={item.title}
                                lastMessage={item.lastMessage}
                                avatar={item.avatar}
                                currentUserId={currentUserId}
                            />
                        }}

                    />
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
    },
    scrollContainer: {
        paddingTop: 80,
        width: '100%',
        height: '100%',
        backgroundColor: ":##ffffff",
        boxSizing: 'border-box',

    },
    noChatsTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    noChatsText: {
        color: " rgba(0,0,0,.36)",
        display: 'flex',
        fontSize: 14,
    }
})
export default ConversationList