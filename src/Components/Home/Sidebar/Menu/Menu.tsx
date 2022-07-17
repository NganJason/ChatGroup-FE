import React from "react"

import Text from "../../../../_shared/Components/Text/Text";

type MenuProps = {
  items?: Item[];
  className?: string;
  toggleMenu?: (e: React.MouseEvent<HTMLElement>) => void;
};

type Item = {
    label?: string,
    key?: string,
    icon?: JSX.Element
}

const Menu = (props: MenuProps): JSX.Element => {
    const { items, className, toggleMenu } = props;

    return (
      <div className={`menu bg-two shadow ${className}`} onClick={toggleMenu}>
        {items?.map((item) => {
          return (
            <div className="menu__item bg-one-hover">
              <span className="icon primary">{item.icon}</span>
              <Text color="four">{item.label}</Text>
            </div>
          );
        })}
      </div>
    );
}

export default Menu