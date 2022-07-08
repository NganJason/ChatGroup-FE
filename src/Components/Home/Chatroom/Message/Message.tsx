import React from "react"
import Text from "../../../../_shared/Text/Text";

type MessageProps = {
    name?: string;
}

const Message = (props: MessageProps): JSX.Element => {
    const { name } = props
  return (
    <div className="message">
      <div className="message__img">
        <img src="https://media.wired.com/photos/5926c1288d4ebc5ab806b602/master/pass/SuperMarioRunHP.jpg" />
      </div>
      <div className="message__content">
        <div className="message__info">
          <Text size="1.1rem" bd="700" color="tertiary">
            {name}
          </Text>
          <Text size="0.8rem" color="tertiary">
            yesterday at 1.29pm
          </Text>
        </div>
        <div className="message__body">
          <Text size="1rem" bd="500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry'
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Message;