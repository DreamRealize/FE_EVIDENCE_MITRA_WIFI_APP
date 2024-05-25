import React, { useState } from "react";
import DashBoardMainTemplate from "../templates/DashBoardMainTemplate";
import LeftSide from "./LeftSidePage";
import RightSide from "./RightSidePage";
import { theme } from "antd";

const DashBoardPage = () => {
   const [collapsed, setCollapsed] = useState(false);

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
   return (
      <DashBoardMainTemplate>
         <LeftSide collapsed={collapsed} />
         <RightSide
            borderRadiusLG={borderRadiusLG}
            colorBgContainer={colorBgContainer}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
         />
      </DashBoardMainTemplate>
   );
};

export default DashBoardPage;
