import React, { useContext } from "react";
import Text from "../../../../_shared/Components/Text/Text";
import { ModalContext } from "../../../../_shared/hooks/showModalContext";
import { userInfo } from "../../../../_shared/types/types";

type ChannelInfoProps = {
    members: userInfo[]
}

const ChannelInfo = (props: ChannelInfoProps): JSX.Element => {
    const { members } = props
    const { showChannelInfo } = useContext(ModalContext)

    const stopPropagate = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
    }

    return (
      <div
        className={`channel-info bg-one ${!showChannelInfo && "disable"}`}
        onClick={stopPropagate}
      >
        <div className="members">
          {members.map((user) => (
            <div className="member">
              <img className="member__img" src={user.profile_url} />
              <Text color="primary" bd="500">
                {user.user_name}
              </Text>
            </div>
          ))}
        </div>

        <div className="add-btn bg-one-hover">
          <Text>Add member</Text>
        </div>
      </div>
    );
}

export default ChannelInfo