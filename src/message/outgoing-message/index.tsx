import { View, Text, Image } from 'react-native'
import React from 'react'
import Loading from '../loading'
import styles from '../styles'

type Props = {
    text?: string,
    image?: string,
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
    text,
    image,
    themeColor = '#6ea9d7',
    loading,
    last,
    single,
    clusterFirstMessage,
    clusterLastMessage
}: Props) => {

    const [imageDimensions, setImageDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        if (image) {
            Image.getSize(image, (width, height) => {
                const aspectRatio = width / height;
                const imageHeight = 200 / aspectRatio; //200 is the width of the message component
                setImageDimensions({ width: 200, height: imageHeight });
            });
        }
    }, []);

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
                        borderTopRightRadius: !last && single ? 8 : 2,

                    }]} />

                    {image ?
                        <View style={[styles.imageContainer, { height: imageDimensions.height }]}>
                            <Image
                                style={styles.image}
                                source={{ uri: image }} />
                        </View>
                        :
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>{text}</Text>
                        </View>
                    }


                    {loading && <View style={styles.loadingContainer}>
                        <Loading />
                    </View>}

                </View>
            </View>

        </View>
    )
}

export default OutgoingMessage