import React from "react"
import Text from "../../../_shared/Components/Text/Text";

import { Input, Button } from "antd";

type ModalProps = {
  showModal?: boolean;
  toggleShowModal: () => void;
};

const Modal = (props: ModalProps): JSX.Element => {
    const { showModal, toggleShowModal } = props;

    const toggleModal = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()

        toggleShowModal();
    }

    const onSave = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        toggleShowModal()
    }

    return (
      <div
        className={`overlay ${!showModal ? "disabled" : ""}`}
        onClick={toggleModal}
      >
        <div className="modal">
          <div className="header">
            <Text bd="700" size="1.2rem">
              NEW CHANNEL
            </Text>
          </div>

          <div className="channel-name">
            <Input
              className="bg-four text primary"
              placeholder="Channel Name"
            ></Input>
          </div>
          <div className="channel-desc">
            <Input.TextArea
              className="bg-four text primary"
              placeholder="Channel Description"
            ></Input.TextArea>
          </div>
          <div className="submit-btn">
            <Button type="primary" onClick={onSave}>Save</Button>
          </div>
        </div>
      </div>
    );
}

export default Modal;