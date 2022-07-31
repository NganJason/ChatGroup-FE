import React from "react"
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

import Text from "../../../../_shared/Components/Text/Text";
import { message } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { useLogout } from "../../../../_shared/mutations/chat_group";
import { ChatGroupQueryKey } from "../../../../_shared/queries/chat_group";


type MenuProps = {
  className?: string;
  toggleMenu?: (e: React.MouseEvent<HTMLElement>) => void;
};


const Menu = (props: MenuProps): JSX.Element => {
    const { className, toggleMenu } = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout } = useLogout({
      onSuccess: (): void => {
        queryClient.invalidateQueries(ChatGroupQueryKey.VALIDATE_AUTH);
        navigate("/login");
      },
      onError: (err: any): void => {
        message.error(err.message);
      },
    });

    const onLogout = () => {
      logout()
    }

    return (
      <div className={`menu bg-two shadow ${className}`} onClick={toggleMenu}>
        <div className="menu__item bg-one-hover">
          <span className="icon primary">
            <UserOutlined />
          </span>
          <Text color="four">Profile</Text>
        </div>
        <div className="menu__item bg-one-hover">
          <span className="icon primary">
            <SettingOutlined />
          </span>
          <Text color="four">Settings</Text>
        </div>
        <div className="menu__item bg-one-hover" onClick={onLogout}>
          <span className="icon primary">
            <LogoutOutlined />
          </span>
          <Text color="four">Logout</Text>
        </div>
      </div>
    );
}

export default Menu