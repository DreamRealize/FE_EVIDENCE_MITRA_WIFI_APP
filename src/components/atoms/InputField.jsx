import React from "react";
import { Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const InputField = ({ prefix, placeholder }) => {
   return <Input prefix={prefix} placeholder={placeholder} />;
};

export default InputField;
