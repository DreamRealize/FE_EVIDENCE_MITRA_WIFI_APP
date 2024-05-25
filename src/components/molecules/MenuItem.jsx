import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const MenuItem = ({ item, selectedMenuKey }) => {
   const { key, icon, label } = item;
   const isSelected = selectedMenuKey === key;

   return (
      <Menu.Item
         key={key}
         icon={icon}
         style={{
            backgroundColor: isSelected ? "#fafafa" : "inherit",
            boxShadow: isSelected ? "0 20px 27px rgb(0 0 0 / 5%)" : "inherit",
            color: isSelected ? "#1677ff" : "inherit",
            fontWeight: "500",
            textDecoration: "none",
            marginBottom: "18px",
         }}
      >
         <Link to={`/dashboard/${label}`} style={{ textDecoration: "none" }}>
            {label}
         </Link>
      </Menu.Item>
   );
};

export default MenuItem;
