import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
  MaterialIndicator,
} from 'react-native-indicators';

type Props = {
  themeColor?: string
}

const Loading = ({ themeColor }: Props) => {
  return (
    <View style={styles.container}>
      <MaterialIndicator color={themeColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
})

export default Loading