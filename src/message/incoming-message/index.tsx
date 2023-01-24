import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import styles from '../styles'
import type UserType from '../../UserType'

type Props = {
    children: string,
    user?: UserType,
    themeColor?: string
    showAvatar?: boolean
    showHeader?: boolean
    // determines whether its the last message in the group of incoming messages
    last?: boolean
    //determines whether its the only message in the group of incoming messages
    single?: boolean
}


const IncomingMessage = ({
    children,
    user,
    showAvatar,
    showHeader,
    last,
    single,
    themeColor = '#6ea9d7' }: Props) => {

    const [avatarLoading, setAvatarLoading] = React.useState(false);
    const [avatarError, setAvatarError] = React.useState(false);


    return (
        <View style={[styles.wrapper,{
            marginTop: 4,
            marginBottom: 4
        }]}>
            <View style={localStyles.internalWrapper}>


                <View style={localStyles.dpContainer}>
                    {showAvatar && <>
                        {(avatarLoading || avatarError || !user?.avatar) && (
                            <Image
                                source={require('./profile.png')}
                                style={localStyles.displayPicture}
                            />
                        )}

                        <Image
                            source={{ uri: user?.avatar }}
                            style={[localStyles.displayPicture, { position: "absolute", top: 0, left: 0, bottom: 0, right: 0, zIndex: 1 }]}
                            onLoadStart={() => setAvatarLoading(true)}
                            onLoadEnd={() => setAvatarLoading(false)}
                            onError={() => setAvatarError(true)}

                        />
                    </>
                    }

                </View>

                <View style={localStyles.textWrapper}>

                    {showHeader &&
                        <View style={{ display: "flex" }}>
                            <View style={localStyles.nameContainer}>
                                <Text style={localStyles.name}>{user?.name}</Text>

                                {/* <View style={localStyles.timestampContainer}>

                        </View> */}
                            </View>
                        </View>
                    }

                    <View style={{ display: "flex" }}>
                        <View style={[styles.container, { alignSelf: "flex-start",  justifyContent: "flex-start" }]}>

                            <View style={[styles.background, { 
                                backgroundColor: themeColor,
                                opacity: 0.5,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: !last ? 8 : 2,
                                borderBottomLeftRadius: last || single ? 8: 2,
                             }
                            ]} />

                            <View style={styles.contentContainer}>
                                <Text style={styles.contentText}>{children}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
    internalWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    dpContainer: {
        width: 32,
        height: 32,
        marginRight: 6,
        marginLeft: 16
    },
    displayPicture: {
        width: "100%",
        height: "100%",
        borderRadius: 9999
    },
    textWrapper: {
        // display: "flex",
        // flexDirection: "column",

    },
    nameContainer: {
        display: "flex",
        alignItems: "flex-start",
        alignSelf: "flex-start",
        marginBottom: 8
    },
    name: {
        color: '#4b5563',
        fontSize: 14,
        fontWeight: "500",
        // fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
    },
    timestampContainer: {
    }

})

export default IncomingMessage