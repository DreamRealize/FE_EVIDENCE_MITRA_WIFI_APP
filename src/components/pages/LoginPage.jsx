import React from "react";
import { Layout } from "antd";
import DefaultLayout from "../templates/MainTemplate";
import LoginPageContent from "../organisms/LoginPage";

const { Content } = Layout;

const LoginPage = () => {
   return (
      <DefaultLayout>
         <LoginPageContent />
      </DefaultLayout>
   );
};

export default LoginPage;
