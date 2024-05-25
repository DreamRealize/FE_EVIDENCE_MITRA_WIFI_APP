import React, { useEffect } from "react";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   SearchOutlined,
} from "@ant-design/icons";
import { Layout, Button, Input, Avatar } from "antd";

const HeaderLayout = ({ collapsed, setCollapsed, firstName }) => {
   //    useEffect(() => {
   //       userMeRequest();
   //    }, [userMeRequest]);
   return (
      <>
         <div
            style={{
               display: "flex",
               alignItems: "center",
            }}
         >
            <Button
               type="text"
               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
               onClick={() => setCollapsed(!collapsed)}
               style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  color: "white",
               }}
            />
            <div>
               <span style={{ color: "white", fontWeight: 500 }}>
                  Welcome, {firstName}
               </span>
            </div>
         </div>
         <div
            style={{
               display: "flex",
               alignItems: "center",
            }}
         >
            {/* <div
                  style={{
                     marginRight: "20px",
                     display: "flex",
                  }}
               >
                  <Input.Search placeholder="Search" style={{ width: 200 }} />
               </div> */}
            <Input
               className="header-search mx-lg-3"
               placeholder="Type here..."
               prefix={<SearchOutlined />}
            />
            <div>
               <Avatar
                  size="medium"
                  style={{
                     marginLeft: "8px",
                     marginRight: "20px",
                  }}
                  // Set URL profil image atau sesuaikan dengan data profil pengguna
                  src="https://example.com/path/to/profile-image.jpg"
                  alt="Profile"
               />
            </div>
         </div>
      </>
   );
};

export default HeaderLayout;
