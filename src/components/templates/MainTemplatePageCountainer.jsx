import React, { Children } from "react";
import SecondHeaderLayout from "../molecules/SecondHeaderLayout";
import { Content } from "antd/es/layout/layout";
import { theme, Row, Col, Card, Typography, Layout } from "antd";
const MainTemplatePageCountainer = ({
   TitleHeaderPage,
   icon,
   buttonName,
   TitleSecondHeaderPage,
   Children,
   linked,
   type,
}) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
   return (
      <>
         <SecondHeaderLayout
            TitleHeaderPage={TitleHeaderPage}
            icon={icon}
            buttonName={buttonName}
            type={type}
            linked={linked}
            TitleSecondHeaderPage={TitleSecondHeaderPage}
         />

         {/* <Content
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
            {Children}
         </Content> */}
      </>
   );
};

export default MainTemplatePageCountainer;
