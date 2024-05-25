import React from "react";
import MainTemplatePageCountainer from "../templates/MainTemplatePageCountainer";
import { theme, Row, Col, Card, Typography } from "antd";
import {
   DownloadOutlined,
   RiseOutlined,
   FallOutlined,
} from "@ant-design/icons";
import SecondHeaderLayout from "../molecules/SecondHeaderLayout";
import { Content } from "antd/es/layout/layout";

const DashBoard = () => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
   return (
      <>
         {/* <SecondHeaderLayout
            TitleHeaderPage={"Overview Dashboard"}
            icon={<DownloadOutlined />}
            buttonName={"Download"}
            type={"primary"}
            TitleSecondHeaderPage={"Lets see overview dashboard"}
         /> */}
         <MainTemplatePageCountainer
            TitleHeaderPage={"Overview Dashboard"}
            icon={<DownloadOutlined />}
            buttonName={"Download"}
            type={"primary"}
            TitleSecondHeaderPage={"Lets see overview dashboard"}
         />
         <Content
            style={{
               margin: "24px 16px",
               padding: 0,
               minHeight: "68vh",
               width: "full",
               overflow: "hidden",
               // background: colorBgContainer,
               borderRadius: borderRadiusLG,
            }}
         >
            <div>
               <h1>TELKOM WIFI LAPORAN APP</h1>
            </div>
         </Content>
      </>
   );
};

export default DashBoard;
