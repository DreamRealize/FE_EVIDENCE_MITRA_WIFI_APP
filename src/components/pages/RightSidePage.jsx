import { Layout, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import HeaderLayout from "../organisms/HeaderLayoutPage";
import { Outlet } from "react-router-dom";

const RightSide = ({ collapsed, colorBgContainer, setCollapsed, welcome }) => {
   return (
      <Layout style={{ marginLeft: 200 }}>
         <HeaderLayout
            collapsed={collapsed}
            colorBgContainer={colorBgContainer}
            setCollapsed={setCollapsed}
         />
         {/* <ContentLayout
				colorBgContainer={colorBgContainer}
				borderRadiusLG={borderRadiusLG}
			/> */}
         <Outlet />
      </Layout>
   );
};

export default RightSide;
