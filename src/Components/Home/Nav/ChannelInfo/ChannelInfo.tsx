import React, { useContext } from "react";
import { User } from "../../../../_shared/apis/chat_group";
import Text from "../../../../_shared/Components/Text/Text";
import { ModalContext } from "../../../../_shared/hooks/showModalContext";

type ChannelInfoProps = {
    members: User[]
}

const ChannelInfo = (props: ChannelInfoProps): JSX.Element => {
    const { members } = props
    const { showChannelInfo, setShowChannelInfo, setShowAddMemberModal } = useContext(ModalContext)

    const stopPropagate = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
    }

    const onAddMemberHandler = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      setShowChannelInfo(false)
      setShowAddMemberModal(true)
    }
    return (
      <div
        className={`channel-info bg-one ${!showChannelInfo && "disable"}`}
        onClick={stopPropagate}
      >
        <div className="members">
          {members.map((user) => (
            <div key={user.user_id || 0} className="member">
              <img
                className="member__img"
                src={
                  user.photo_url ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
              />
              <Text color="primary" bd="500">
                {user.username}
              </Text>
            </div>
          ))}
        </div>

        <div className="add-btn bg-one-hover" onClick={onAddMemberHandler}>
          <Text>Add member</Text>
        </div>
      </div>
    );
}

export default ChannelInfo