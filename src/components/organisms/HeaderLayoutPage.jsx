import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   SearchOutlined,
} from "@ant-design/icons";
import { Layout, Button, Input, Avatar } from "antd";
import { userMeRequest } from "../../redux/actions/authActions";
import HeaderLayout from "../molecules/HeaderLayout";
const { Header } = Layout;

const HeaderLayoutPage = ({
   colorBgContainer,
   collapsed,
   setCollapsed,
   userMeRequest,
   user,
}) => {
   useEffect(() => {
      userMeRequest();
   }, [userMeRequest]);
   return (
      <>
         <Header
            style={{
               padding: 0,
               background: colorBgContainer,
               backgroundColor: "#3E54AC",
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
            }}
         >
            <HeaderLayout
               // eslint-disable-next-line react/prop-types
               firstName={user?.nama}
               collapsed={collapsed}
               setCollapsed={setCollapsed}
               //        userMeRequest={userMeRequest}
            />
         </Header>
      </>
   );
};

const mapStateToProps = (state) => ({
   user: state.me.user,
});

const mapDispatchToProps = {
   userMeRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLayoutPage);

// export default HeaderLayoutPage;
