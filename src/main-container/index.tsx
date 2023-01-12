import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MessageContainer, { Props as MessageContainerProps } from '../message-container';
import ConversationContainer, { Props as ConversationContainerProps } from '../conversation-container';

interface Props {
    mobileView?: boolean
    inbox: ConversationContainerProps
    selectedConversation?: MessageContainerProps | null
}

const MainContainer = ({
    inbox,
    selectedConversation
}: Props) => {
    return (
        <View style={styles.container}>
            {selectedConversation ?
                <MessageContainer
                    {...selectedConversation}
                />
                :
                <ConversationContainer
                    {...inbox}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})
export default MainContainer