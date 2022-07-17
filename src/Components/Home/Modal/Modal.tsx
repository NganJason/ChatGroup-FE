import React, { useState } from "react"
import Text from "../../../_shared/Components/Text/Text";

import { Input, Button } from "antd";

type ModalProps = {
  showModal?: boolean;
  toggleShowModal: () => void;
  addChannel: (channelName: string) => void;
};

const Modal = (props: ModalProps): JSX.Element => {
    const { showModal, toggleShowModal, addChannel } = props;

    const [ channelName, setChannelName ] = useState<string>("")
    const [ channelDesc, setChannelDesc ] = useState<string>("")

    const toggleModal = (e: React.MouseEvent<HTMLElement>) => {
        toggleShowModal();
    }

    const onSave = () => {
        toggleShowModal()

        addChannel(channelName)
        setChannelName("")
        setChannelDesc("")
    }

    const stopPropagation = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    }

    const onInputChange = (
      e: React.ChangeEvent<{ value: string; id: string }>
    ) => {
      if (e.target.id === "channel_name") {
        setChannelName(e.target.value)
      } else {
        setChannelDesc(e.target.value)
      }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()

        onSave()
      }
    }

    return (
      <div
        className={`overlay ${!showModal ? "disabled" : ""}`}
        onClick={toggleModal}
      >
        <div className="modal" onClick={stopPropagation}>
          <div className="header">
            <Text bd="700" size="1.2rem">
              NEW CHANNEL
            </Text>
          </div>

          <div className="channel-name">
            <Input
              id="channel_name"
              className="bg-four text primary"
              placeholder="Channel Name"
              value={channelName}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
            ></Input>
          </div>
          <div className="channel-desc">
            <Input.TextArea
              id="channel_desc"
              className="bg-four text primary"
              placeholder="Channel Description"
              value={channelDesc}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
            ></Input.TextArea>
          </div>
          <div className="submit-btn">
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
}

export default Modal;