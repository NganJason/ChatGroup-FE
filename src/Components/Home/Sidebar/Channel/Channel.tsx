import React from "react";

import Text from "../../../../_shared/Components/Text/Text"

import { channel } from "../../../../_shared/types/types";

type ChannelProps = {
  channel: channel;
  isSelected: boolean;
  onClick: React.MouseEventHandler
};

const Channel = (props: ChannelProps): JSX.Element => {
  const { channel, isSelected } = props;
  return (
    <div className={`channel ${isSelected ? "bg-four" : ""}`} {...props}>
      <div className="channel__icon bg-two">
        <Text color="secondary">{channel.channel_name[0].toUpperCase()}</Text>
      </div>
      <div className="channel__name">
        <Text color="primary">{channel.channel_name}</Text>
      </div>
    </div>
  );
};

export default Channel;