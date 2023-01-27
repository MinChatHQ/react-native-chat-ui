import { View, Text } from 'react-native'
import React from 'react'
import Loading from '../loading'
import styles from '../styles'

type Props = {
    children: string,
    loading?: boolean
    themeColor?: string
    // determines whether its the last message in the group of outgoing messages
    last?: boolean
    //determines whether its the only message in the group of outgoing messages
    single?: boolean
    clusterFirstMessage?: boolean
    clusterLastMessage?: boolean
}

const OutgoingMessage = ({
    children,
    themeColor = '#6ea9d7',
    loading,
    last,
    single,
    clusterFirstMessage,
    clusterLastMessage
}: Props) => {

    return (
        <View style={[styles.wrapper, {
            marginTop: clusterFirstMessage ? 16 : 4,
            marginBottom: clusterLastMessage ? 16 : 4,
        }]}>
            <View>
                <View style={[styles.container,
                { alignSelf: "flex-end" }
                ]}>

                    <View style={[styles.background, {
                        backgroundColor: themeColor,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: last ? 8 : 2,
                        borderTopRightRadius: !last && single  ? 8 : 2,

                    }]} />

                    <View style={styles.contentContainer}>
                        <Text style={styles.contentText}>{children}</Text>
                    </View>

                    {loading && <View style={styles.loadingContainer}>
                        <Loading />
                    </View>}

                </View>
            </View>

        </View>
    )
}

export default OutgoingMessage