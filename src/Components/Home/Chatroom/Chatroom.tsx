import React, {useState} from "react";

import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Message from "./Message/Message";

const Chatroom = (): JSX.Element => {
  const [rows, setRows] = useState<number>(1)
  const [value, setValue] = useState<string>("")

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key==="Backspace") {
      if (rows === 1) {
        return
      }

      if (value[value.length-1] === "\n") {
        setRows(rows - 1)
      }
    }

    if (e.shiftKey && e.key==="Enter") {
      setRows(rows + 1);
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let rowHeight = 22

    if (e.target.scrollHeight - e.target.clientHeight !== 0) {
      let finalRows = Math.floor(e.target.scrollHeight/rowHeight)
      setRows(finalRows);
    }

    setValue(e.target.value)
  }

  return (
    <div className="chatroom">
      <div className="chatbox">
        <Message name={"Jason"} /> <Message name={"Jason1"} />
        <Message name={"Jason2"} />
        <Message name={"Jason3"} />
        <Message name={"Jason4"} />
        <Message name={"Jason2"} />
        <Message name={"Jason3"} />
        <Message name={"Jason4"} />
      </div>
      <div className="input">
        <Input.TextArea
          rows={rows}
          value={value}
          className="bg-four text primary"
          placeholder="Type a message here"
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        ></Input.TextArea>
        <Button size="small" type="primary" icon={<SendOutlined />} />
      </div>
    </div>
  );
};

export default Chatroom;
