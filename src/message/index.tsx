import React from 'react'
import type UserType from 'src/UserType'
import OutgoingMessage from './outgoing-message'
import IncomingMessage from './incoming-message'

export type Props = {
  text?: string,
  image?: string,
    loading?: boolean
  themeColor?: string
  type?: "incoming" | "outgoing"
  user?: UserType
  showAvatar?: boolean
  showHeader?: boolean
  // determines whether its the last message in the group of outgoing or incoming
  last?: boolean
  //determines whether its the only message in the group of outgoing or incoming
  single?: boolean
  clusterFirstMessage?: boolean
  clusterLastMessage?: boolean
}

const Message = ({
  text,
  image,
    themeColor,
  loading,
  type = "outgoing",
  user,
  showAvatar,
  showHeader,
  last,
  single,
  clusterFirstMessage,
  clusterLastMessage
}: Props) => {
  return (
    type === "outgoing" ?
      <OutgoingMessage
        themeColor={themeColor}
        loading={loading}
        text={text}
        image={image}
        last={last}
        single={single}
        clusterFirstMessage={clusterFirstMessage}
        clusterLastMessage={clusterLastMessage}
      />

      :

      <IncomingMessage
        themeColor={themeColor}
        text={text}
        image={image}
        user={user}
        showHeader={showHeader}
        last={last}
        single={single}
        showAvatar={showAvatar}

      />
  )
}

export default Message