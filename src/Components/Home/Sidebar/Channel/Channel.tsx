import React from "react";
import { ChannelObj } from "../../../../_shared/apis/chat_group";

import Text from "../../../../_shared/Components/Text/Text"

type ChannelProps = {
  channel: ChannelObj;
  selected: boolean;
  onClick: React.MouseEventHandler;
};

const Channel = (props: ChannelProps): JSX.Element => {
  const { channel, selected } = props;
  return (
    <div className={`channel ${selected ? "bg-four" : ""}`} {...props}>
      {channel && (
        <>
          <div className="channel__icon bg-two">
            <Text color="secondary">
              {channel.channel_name
                ? channel.channel_name[0].toUpperCase()
                : ""}
            </Text>
          </div>
          <div className="channel__name">
            <Text color="primary">{channel.channel_name}</Text>
            {channel.unread ||
              (0 > 0 && (
                <div className="channel__badge bg-alert">
                  <Text size="0.8rem" bd="500" color="secondary">
                    {channel.unread}
                  </Text>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Channel;