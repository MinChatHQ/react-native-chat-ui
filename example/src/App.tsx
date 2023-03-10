import * as React from 'react';

import { View } from 'react-native';
import { MainContainer } from 'react-native-chat-ui';
import { chats, messages } from './data';


export default function App() {

  const [messageView, setMessageView] = React.useState(false);
  const [msgs, setMsgs] = React.useState<any>([...messages])

  const addMessage = (text: string) => {
    setMsgs([...msgs, {
      "user": {
        "id": "danny_1",
        "name": "Daniel Georgetown",
        avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"

      },
      id: Date.now().toString(),
      "text": text
    }])
  }


  return (
    <View>
      <MainContainer
        inbox={{
          onScrollToBottom: () => console.log("onScrollToBottom"),
          themeColor: "#fcb900",
          conversations: chats,
          // conversations: [],
          loading: false,
          onConversationClick: () => setMessageView(true),
        }}
        selectedConversation={
          messageView ?
            {
              showTypingIndicator: true,
              typingIndicatorContent: "John is typing",
              // onStartTyping: () => console.log("onStartTyping"),
              // onEndTyping: () => console.log("onStopTyping"),
              themeColor: "red",
              // messages:
              //   [{
              //     "user": {
              //       "id": "danny_1",
              //       "name": "Daniel Georgetown",
              //       avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"

              //     },
              //     "text": "first message"
              //   },],
              messages: msgs,
              // messages: [],
              header: "Sandra Bullock",
              currentUserId: "danny_1",
              sendMessageLoading: true,
              onSendMessage: (text) => addMessage(text),
              // onSendMessage: () => console.log("onSendMessage"),
              onBack: () => setMessageView(false),
              onScrollToTop: () => console.log("onScrollToTop"),
              onAttachClick: () => console.log("onAttachClick"),
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


