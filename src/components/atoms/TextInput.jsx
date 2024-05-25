import React from "react";
import { Input } from 'antd';

const TextInput = ({ placeholder, value, onChange }) => {
   return (
      <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      />
   );
};

export default TextInput;
