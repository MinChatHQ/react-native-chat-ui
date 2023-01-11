import React from 'react'
import type UserType from 'src/UserType'
import MyMessage from './my-message'
import OtherMessage from './other-message'

type Props = {
  children: string,
  loading?: boolean
  themeColor?: string
  position?: "left" | "right"
  user?: UserType
}

const Message = ({
  children,
  themeColor,
  loading,
  position = "left",
  user
}: Props) => {
  return (
    position === "right" ?
      <MyMessage
        themeColor={themeColor}
        loading={loading}
        children={children}
      />

      :

      <OtherMessage
        themeColor={themeColor}
        children={children}
        user={user}
      />
  )
}

export default Message