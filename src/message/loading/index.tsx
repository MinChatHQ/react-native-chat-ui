import { View, StyleSheet } from 'react-native'
import React from 'react'
import {
  MaterialIndicator,
} from 'react-native-indicators';


type Props = {}

const Loading = ({ }: Props) => {
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <MaterialIndicator
        size={10}
        color={"#fff"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 2,
  }
})

export default Loading