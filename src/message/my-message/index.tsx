import { View, Text } from 'react-native'
import React from 'react'
import Loading from '../loading'
import styles from '../styles'

type Props = {
    children: string,
    loading?: boolean
    themeColor?: string
}

const MyMessage = ({
    children,
    themeColor = '#6ea9d7',
    loading
}: Props) => {

    console.log({ loading })
    return (
        <View style={styles.wrapper}>
            <View>
                <View style={[styles.container,
                { alignSelf: "flex-end" }
                ]}>

                    <View style={[styles.background, { backgroundColor: themeColor }]} />

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

export default MyMessage