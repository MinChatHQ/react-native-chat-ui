import { View, StyleSheet } from 'react-native'
import React from 'react'
import ConversationList, { Props as ConversationListProps } from '../conversation-list'
import ConversationHeader from '../conversation-header'

export interface Props extends ConversationListProps {

}

const ConversationContainer = (props: Props) => {
    return (
        <View style={styles.container}>
          <ConversationHeader />

            <ConversationList
                {...props}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        position: "relative",
    },

})
export default ConversationContainer