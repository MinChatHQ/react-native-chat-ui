<p align="center">
<img src="https://img.shields.io/github/license/minchathq/react-native-chat-ui"/>
<img src="https://img.shields.io/npm/v/@minchat/react-native-chat-ui"/>
<img src="https://img.shields.io/twitter/follow/minchathq?style=social"/>
</p>


Build your own chat UI with React Native components in a few minutes. React Native Chat UI Kit from [MinChat](https://minchat.io) is an open source UI toolkit for developing mobile chat applications.

**React Native Chat UI makes chat UI development faster**

# Documentation
You can view detailed documentation [here](https://reactnative.minchat.io)

# Install

Component Library

Using npm.
```bash
npm install @minchat/react-native-chat-ui
```

Using yarn.
```bash
yarn add @minchat/react-native-chat-ui
```


```jsx
import { MainContainer } from "@minchat/react-native-chat-ui";

        <View> <MainContainer
            inbox={{
                onScrollToBottom: () => { },
                themeColor: "#6ea9d7",
                conversations: [{
                    id: "1",
                    title: "Epic gamers",
                    avatar: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-suliman-sallehi-1704488.jpg&fm=jpg"
                    , lastMessage: {
                        seen: false,
                        text: "Hello everbody"
                        ,
                        user: {
                            id: "martha_stewart",
                            name: "Daniel",
                            avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                        }
                    }
                }, {
                    id: "2",

                    title: "Devops",
                    lastMessage: {
                        seen: true,
                        text: "How do you enable an actuator on a servo motor of a hardware and design laboratory experiment in the city,an actuator on a servo motor of a hardware and design laboratory experiment in the city",

                        user: {
                            avatar: "https://fsdfsdfsdfs",
                            id: "daniel",
                            name: "Daniel",
                        }
                    }
                }],
                loading: false,
                onConversationClick: () => console.log("onChat click"),
            }}
            selectedConversation={
                {
                    themeColor: "#6ea9d7",
                    messages: [
                        {
                            "user": {
                                "id": "danny_1",
                                "name": "Daniel Georgetown",
                                avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"

                            },
                            "text": "first message"
                        },
                        {
                            "user": {
                                "id": "mark",
                                "name": "Markus"
                            },
                            "text": "hello"
                        },],
                        header: "Sandra Bullock",
                currentUserId: "danny_1",
                onSendMessage: () => console.log("onSendMessage"),
                onBack: () => { }

            }
        }
    />
        </View>
```

# Typescript

This library is written in Typescript, by extension can be used in Javascript projects as well.

# Show your support
Now if you made your awesome chat UI and you love this library, please ⭐ this repository!

# Community and support

Articles on the [minchat blog](https://minchat.io/blog)

# Website

[https://minchat.io](https://minchat.io)

Unleash the power of seamless chat functionality with MinChat's [React Native Chat API!](https://minchat.io) Say goodbye to backend worries and hello to effortless integration. Get started today and save months of development time. Build a full-fledged React chat application in just minutes, not months!

# License

[MIT](https://github.com/MinChatHQ/react-native-chat-ui/blob/master/LICENSE)
