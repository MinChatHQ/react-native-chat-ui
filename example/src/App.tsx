import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Message, MessageList ,MessageContainer} from 'react-native-chat-ui';
import { messages } from './data';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();


  return (
    <View>

      <MessageContainer
        messages={messages}
        currentUserId="danny_1"
      />
    </View>
  );
}

const styles = StyleSheet.create({
});
