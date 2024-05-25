/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Row, Col, Typography, Button, Divider, Form } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../redux/actions/authActions";
import LoginForm from "../molecules/LoginForm";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import loginImage from "../../../src/assets/bg-signup.jpg";
import { toast } from "react-toastify";

const { Title } = Typography;

const LoginPage = ({
   login,
   isAuthenticated,
   validationErrors,
   messageErrorToast,
   loading,
   redirect,
}) => {
   const navigate = useNavigate();

   const onFinish = (values) => {
      const { usernameId, password } = values;
      login(usernameId, password);
   };

   useEffect(() => {
      console.log(isAuthenticated, "auth");
      console.log(redirect, "redirect");
      if (isAuthenticated && redirect) {
         // Gunakan useNavigate untuk melakukan navigasi setelah login
         navigate("/dashboard/overview");
      }
      if (messageErrorToast && messageErrorToast.status === 422) {
         toast.error(messageErrorToast.message);
      }
   }, [isAuthenticated, redirect, navigate, messageErrorToast]);
   return (
      <Row style={{ height: "100vh" }} align="middle" justify="center">
         <Col
            span={16}
            style={{
               overflow: "hidden",
               height: "100vh",
               borderRadius: "0 10px 10px 0",
            }}
         >
            <img
               src={loginImage} // Ganti dengan URL gambar Anda
               alt="Background"
               style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
               style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white", // Ganti warna teks sesuai keinginan
               }}
            >
               <Title level={2} style={{ color: "white" }}>
                  Login
               </Title>
               <Title level={5} style={{ color: "white" }}>
                  Use these awesome forms to login or create new account in{" "}
                  <br />
                  your project for free.
               </Title>
            </div>
         </Col>
         <Col span={8} style={{ padding: "20px" }}>
            <Title level={5} style={{ fontWeight: "700", fontSize: "large" }}>
               <span style={{}}>Hi</span> there !
            </Title>
            <Title
               level={5}
               style={{
                  marginBottom: "20px",
                  fontWeight: "500",
                  fontSize: "small",
               }}
            >
               Have we meet before?
            </Title>
            <Row justify={"center"} align={"middle"}>
               <Col span={24}>
                  <Form.Item style={{ margin: "0" }}>
                     <Button
                        type="default"
                        htmlType="button"
                        icon={<GoogleOutlined />}
                        block
                     >
                        Login with Google
                     </Button>
                  </Form.Item>
               </Col>
            </Row>
            <Row justify="center" style={{ alignItems: "center" }}>
               <Col span={8}>
                  <Divider
                     style={{ height: "1px", backgroundColor: "#d9d9d9" }}
                  />
               </Col>
               <Col span={8} style={{ textAlign: "center" }}>
                  <Typography.Text
                     type="secondary"
                     style={{ fontSize: "12px", display: "inline-block" }}
                  >
                     Or Sign In with usernameId
                  </Typography.Text>
               </Col>
               <Col span={8}>
                  <Divider
                     style={{ height: "1px", backgroundColor: "#d9d9d9" }}
                  />
               </Col>
            </Row>
            <LoginForm
               onFinish={onFinish}
               loading={loading}
               validationErrors={validationErrors}
            />
            {/* <Button
               type="default"
               htmlType="button"
               icon={<GoogleOutlined />}
               block
            >
               Login with Google
            </Button> */}
            {/* <Form.Item>
               <span>
                  No registered ? <Link to="/register">Create An Account</Link>
               </span>
            </Form.Item> */}
         </Col>
      </Row>
   );
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   redirect: state.auth.redirect,
   validationErrors: state.auth.validationErrors,
   messageErrorToast: state.auth.messageErrorToast,
   loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
   login: (usernameId, password) =>
      dispatch(loginRequest(usernameId, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
