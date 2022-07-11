import React from "react";
import type { Property } from '../../../../node_modules/csstype'

type TextProps = {
  align?: Property.TextAlign;
  color?: string;
  size?: string;
  mgTop?: string;
  mgBtm?: string;
  mgLeft?: string;
  mgRight?: string;
  bd?: string;
  inline?: any;
  hover?: any;
  cursor?: any;
  width?: string;
  children?: JSX.Element | any;
};
function Text(props: TextProps) {
  const {
  align,
  color,
  size,
  mgTop,
  mgBtm,
  mgLeft,
  mgRight,
  bd,
  inline,
  hover,
  cursor,
  width,
  children,
} = props

  const styles: React.CSSProperties = {
    width: `${width ? width : ""}`,
    textAlign: `${align ? align : "left"}`,
    fontSize: `${size ? `${size}` : "1rem"}`,
    fontWeight: `${bd ? `${bd}` : "500"}`,
    marginTop: `${mgTop ? `${mgTop}` : ""}`,
    marginBottom: `${mgBtm ? `${mgBtm}rem` : ""}`,
    marginLeft: `${mgLeft ? `${mgLeft}rem` : ""}`,
    marginRight: `${mgRight ? `${mgRight}rem` : ""}`,
  };

  const classNames = `
  text 
  ${color ? color : "primary"}
  ${inline ? "inline" : ""}
  ${hover ? "text_hover" : ""}
  ${cursor ? "text_cursor" : ""}
`;

  return (
    <p className={classNames} style={styles}>
      {children}
    </p>
  );
}

export default Text;
