import React, { useContext } from "react"

import Text from "../../../../_shared/Components/Text/Text";

import { Message as MessageType } from "../../../../_shared/apis/chat_group";
import { DataContext } from "../../../../_shared/hooks/dataContext";

type MessageProps = {
  msg: MessageType;
};

const UnixTimeToLocale = (unix:number): string => {
  let d = new Date(unix)

  return d.toLocaleString()
}
const Message = (props: MessageProps): JSX.Element => {
    const { msg } = props
    
    const { user } = useContext(DataContext)

    let isSender = user.user_id === msg.sender?.user_id;

  return (
    <div className={`message ${isSender && "sender"}`}>
      <div className="message__img">
        <img
          src={
            msg.sender?.photo_url ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
      </div>
      <div className="message__content">
        <div className={`message__info ${isSender && "sender"}`}>
          <Text size="1.1rem" bd="700" color="tertiary">
            {msg.sender?.username}
          </Text>
          <Text size="0.8rem" color="tertiary">
            {UnixTimeToLocale(msg.created_at || 0)}
          </Text>
        </div>
        <div className={`message__body ${isSender && "sender"}`}>
          <Text size="1rem" bd="500" align={`${isSender ? "right" : "left"}`}>
            {msg.content}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Message;