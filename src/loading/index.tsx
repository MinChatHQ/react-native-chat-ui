import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    themeColor?: string
}

const Loading = (props: Props) => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

export default Loading