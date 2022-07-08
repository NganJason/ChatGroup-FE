import React from "react";

import { Button } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";

import Text from "../../../_shared/Text/Text";

const Channel = (): JSX.Element => {
  return (
    <div className="channel">
      <div className="channel__icon bg-two">
        <Text color="secondary">FD</Text>
      </div>
      <div className="channel__name">
        <Text color="primary">Frontend Developers</Text>
      </div>
    </div>
  );
}
const Sidebar = (): JSX.Element => (
  <div className="sidebar">
    <div className="header shadow">
      <Text bd="700" align="left">
        Channels
      </Text>

      <Button className="btn primary" size="small" icon={<PlusOutlined />} />
    </div>

    <div className="content">
      {[1, 2, 3, 4].map(() => {
        return Channel();
      })}
    </div>

    <div className="footer bg-three">
      <img src="https://media.wired.com/photos/5926c1288d4ebc5ab806b602/master/pass/SuperMarioRunHP.jpg" />
      <Text bd="700" align="left" color="tertiary">
        Jason Ngan
      </Text>

      <DownOutlined className="icon primary" />
    </div>
  </div>
);

export default Sidebar;
