import React, { useContext, useState } from "react";

import Text from "../../../_shared/Components/Text/Text";
import DebounceSelectInput from "./DebounceSelectInput/DebounceSelectInput";
import { Button } from "antd";
import { ModalContext } from "../../../_shared/hooks/showModalContext";

const AddMemberModal = (): JSX.Element => {
  const { showAddMemberModal, toggleShowAddMemberModal } = useContext(ModalContext)
  const [ input, setInput ] = useState([])
  
  const stopPropagate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault();
  }

  const onSaveHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    toggleShowAddMemberModal()
    setInput([])
  }

  return (
    <div
      className={`overlay ${!showAddMemberModal && "disabled"}`}
      onClick={toggleShowAddMemberModal}
    >
      <div className="modal" onClick={stopPropagate}>
        <div className="header">
          <Text bd="700" size="1.2rem">
            NEW MEMBERS
          </Text>
        </div>
        <DebounceSelectInput input={input} setInput={setInput}/>

        <div className="submit-btn">
          <Button type="primary" onClick={onSaveHandler}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
