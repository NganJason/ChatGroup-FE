import React from "react"
import Text from "../../../../_shared/Components/Text/Text";
import { message } from "../../../../_shared/types/types";

type MessageProps = {
    msg: message;
}

const Message = (props: MessageProps): JSX.Element => {
    const { msg } = props

  return (
    <div className="message">
      <div className="message__img">
        <img src={msg.sender_info.profile_url} />
      </div>
      <div className="message__content">
        <div className="message__info">
          <Text size="1.1rem" bd="700" color="tertiary">
            {msg.sender_info.user_name}
          </Text>
          <Text size="0.8rem" color="tertiary">
            {msg.created_at}
          </Text>
        </div>
        <div className="message__body">
          <Text size="1rem" bd="500">
            {msg.content}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Message;