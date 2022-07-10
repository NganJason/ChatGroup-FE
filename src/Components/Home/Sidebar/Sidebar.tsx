import React, { useState } from "react";

import { Button } from "antd";
import {
  PlusOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import Text from "../../../_shared/Components/Text/Text";
import Menu from "./Menu/Menu";

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

const items = [
  {
    label: "Profile",
    key: "profile",
    icon: <UserOutlined />,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
  },
  {
    label: "Logout",
    logout: "logout",
    icon: <LogoutOutlined />,
  },
];
const Sidebar = (): JSX.Element => {
  const [ showMenu, setShowMenu ] = useState<boolean>(false)

  const toggleShowMenu = (): void => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="sidebar">
      <div className="header shadow">
        <Text bd="700" align="left">
          Channels
        </Text>

        <Button className="btn primary" size="small" icon={<PlusOutlined />} />
      </div>

      <div className="content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6].map(() => {
          return Channel();
        })}
      </div>

      <div className="footer bg-three">
        <img src="https://media.wired.com/photos/5926c1288d4ebc5ab806b602/master/pass/SuperMarioRunHP.jpg" />
        <Text bd="700" align="left" color="tertiary">
          Jason Ngan
        </Text>

        <div className="icon__container">
          <DownOutlined className="icon primary" onClick={toggleShowMenu} />
          <Menu
            className={`${showMenu ? "" : "menu-disable"}`}
            items={items}
            toggleShowMenu={toggleShowMenu}
          />
        </div>
      </div>
    </div>
  );
}
  
export default Sidebar;
