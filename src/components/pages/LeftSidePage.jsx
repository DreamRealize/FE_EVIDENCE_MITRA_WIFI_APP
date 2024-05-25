// components/large/Sidebar.js
import { Layout } from "antd";
import { MoneyCollectOutlined } from "@ant-design/icons";
import SideBarPage from "../organisms/SideBarPage";

const { Sider } = Layout;

const LeftSide = ({ collapsed }) => {
   const titleContent = collapsed ? (
      <MoneyCollectOutlined style={{ fontSize: "16px", color: "black" }} />
   ) : (
      "Laporan WIFI"
   );
   return (
      <Sider
         style={{
            background: "white",
            position: "fixed",
            bottom: 0,
            top: 0,
            height: "100vh",
            overflow: "auto",
         }}
         trigger={null}
         collapsible
         collapsed={collapsed}
      >
         <SideBarPage titleContent={titleContent} />
      </Sider>
   );
};

export default LeftSide;
