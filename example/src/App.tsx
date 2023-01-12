import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { MainContainer } from 'react-native-chat-ui';
import { messages, chats } from './data';

export default function App() {

  const [messageView, setMessageView] = React.useState(false);

  return (
    <View>
      <MainContainer
        inbox={{
          onScrollToBottom: () => console.log("onScrollToBottom"),
          themeColor: "#6ea9d7",
          conversations: chats,
          // conversations: [],
          loading: false,
          onConversationClick: () => setMessageView(true),
        }}
        selectedConversation={
          messageView ?
            {
              themeColor: "#6ea9d7",
              messages: messages,
              // messages: [],
              header: "Sandra Bullock",
              currentUserId: "danny_1",
              sendMessageLoading: true,
              onSendMessage: () => console.log("onSendMessage"),
              onBack: () => setMessageView(false),
              onScrollToTop: () => console.log("onScrollToTop"),
            } : null
        }
      />

      {/* <MessageContainer
        messages={messages}
        currentUserId="danny_1"
        header='Martha'
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
});
