import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import type MessageType from 'src/MessageType'

export type Props = {
    title: string,
    lastMessage?: MessageType,
    avatar?: string,
    onClick: () => void,
    // themeColor?: string
    /**
     * the current user on the chat ui
     */
    currentUserId?: string
}

const Conversation = ({
    title,
    lastMessage,
    onClick,
    avatar,
    // themeColor = '#6ea9d7',
    currentUserId
}: Props) => {
    const [avatarLoading, setAvatarLoading] = React.useState(false);
    const [avatarError, setAvatarError] = React.useState(false);

    const MemoImage = memo((props: { avatar?: string }) => {
        return <Image
            source={{ uri: props.avatar }}
            style={[styles.displayPicture, { position: "absolute", top: 0, left: 0, bottom: 0, right: 0, zIndex: 1 }]}
            onLoadStart={() => setAvatarLoading(true)}
            onLoadEnd={() => setAvatarLoading(false)}
            onError={() => setAvatarError(true)}
        />
    }, (_, __) => {
        return true
    }
    )

    const PlaceHolderImage = memo(() => {
        return <Image
            source={require('./profile.png')}
            style={styles.displayPicture}
        />
    }, (_, __) => {
        return true
    }
    )
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onClick}>

            {/* <View style={[styles.background, { backgroundColor: themeColor }]} /> */}

            <View style={styles.contentContainer}>
                <View style={styles.displayPictureContainer}>
                    {(avatarLoading || avatarError || !avatar) && (
                        <PlaceHolderImage />
                    )}

                    <MemoImage avatar={avatar} />

                </View>


                <View style={styles.textContainer}>
                    <Text style={[styles.name,
                    {
                        color: lastMessage?.seen ? "#7a7a7a" : "black",
                        fontWeight: lastMessage?.seen ? "normal" : "600"
                    }]}>{title}</Text>

                    <View style={styles.messageContainer}>
                        <Text style={[styles.lastMessageUser,
                        {
                            color: lastMessage?.seen ? "#7a7a7a" : "black",
                            fontWeight: lastMessage?.seen ? "normal" : "600"
                        }]}>
                            {lastMessage?.user.id === currentUserId ? "You" : lastMessage?.user.name}:
                        </Text>

                        <View style={[styles.messageContent]}>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={1}
                                style={[styles.message, {
                                    color: lastMessage?.seen ? "#7a7a7a" : "black",
                                    fontWeight: lastMessage?.seen ? "normal" : "600"
                                }]}>{lastMessage?.text}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        paddingRight: 12,
        paddingLeft: 12,

    },
    // background: {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //     backgroundColor: "#ffffff",
    //     opacity: 0.2,
    //     zIndex: 1,
    // },

    contentContainer: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        alignItems: "center",

        height: "100%",
        boxSizing: "border-box",
    },
    displayPictureContainer: {
        width: 58,
        height: 58,
        marginRight: 12,
        boxSizing: "border-box",
    },
    displayPicture: {
        width: 58,
        height: 58,
        borderRadius: 99999,
        boxSizing: "border-box",
        // borderWidth: 1,
        // borderColor: "rgb(255 255 255)",
    },
    name: {
        textAlign: "left",
        fontSize: 14,
        color: "#000000",
    },
    messageContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
        width: "100%",
        boxSizing: "border-box",

    },
    textContainer: {
        flex: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.04)",
        borderBottomWidth: 1,
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    lastMessageUser: {
        textAlign: "left",
        fontSize: 12,
        alignSelf: "flex-start",
        position: "relative",
        color: "#7a7a7a",
    },
    messageContent: {
        flex: 1,
        display: "flex",
        width: "100%",
        marginRight: 8
    },
    message: {
        textAlign: "left",
        fontSize: 12,
        alignSelf: "flex-start",
        position: "relative",
        color: "#7a7a7a",
        marginLeft: 8,
        // todo handle text overflow ...
        boxSizing: "border-box",
    }

});

export default Conversation