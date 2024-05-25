import React from "react";
import { Button } from "antd";
// eslint-disable-next-line react/prop-types
const PrimaryButton = ({ onClick, children }) => {
   return <Button onClick={onClick}>{children}</Button>;
};

export default PrimaryButton;
