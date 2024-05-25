import React from "react";
import { Button, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "./AtomCss.css";

const CustomButton = ({ loading, onClick, children, icon }) => {
   const handleClick = () => {
      // Lakukan apa pun yang perlu dilakukan pada klik tombol
      if (!loading) {
         onClick();
      }
   };

   return (
      <Button
         type="primary"
         disabled={loading}
         onClick={handleClick}
         className="btn-login"
      >
         {!loading && icon}{" "}
         {/* Tampilkan ikon hanya jika tidak dalam proses loading */}
         {loading ? <Spin size="small" /> : children}
      </Button>
   );
};

export default CustomButton;
