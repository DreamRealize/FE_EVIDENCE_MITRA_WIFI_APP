import React, { useEffect, useState } from "react";
import MainTemplatePageCountainer from "../templates/MainTemplatePageCountainer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
// import {
//    //  createPemasukanRequest,
//    //  fetchCategoryBankRequest,
//    fetchCategoryServiceRequest,
//    fetchCategoryStatusRequest,
// } from "../../redux/actions/authActions"; // Import the Redux action
import {
   theme,
   Button,
   Input,
   Form,
   DatePicker,
   Select,
   Card,
   Spin,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
   registerRequest,
   resetRegisterSuccessRedirect,
} from "../../redux/actions/authActions";

const createMitraPage = ({
   register,
   registerSuccessRedirect,
   loading,
   resetRegisterSuccessRedirect,
}) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const [form] = Form.useForm();
   const [waktuEviden, setwaktuEviden] = useState(null);
   const [idTiket, setIdTiket] = useState("");
   const [tiketFilter, setTiketFilter] = useState([]);
   const [idMitra, setIdMitra] = useState("");
   const handleDatePickerChange = (date) => {
      setwaktuEviden(date);
   };

   let history = useNavigate();

   // const onFinish = (values) => {
   //    if (WaktuPemasukan) {
   //       const formattedValues = {
   //          ...values,
   //          user_id: userId?.user_id,
   //          WaktuPemasukan: WaktuPemasukan.toISOString(),
   //       };
   //       console.log("Payload to be sent:", formattedValues);

   //       createPemasukanRequest(formattedValues);
   //       console.log("success");
   //    } else {
   //       console.error("Invalid form values");
   //    }
   // };

   const onFinish = (values) => {
      const { usernameId, nama, idUserRoles, password } = values;
      console.log("firstname", usernameId);
      register(usernameId, nama, idUserRoles, password);
   };

   const generateTicketId = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      const count = 1; // This should ideally be fetched from a server to ensure uniqueness

      return `Mitra - ${year}${month}${day}${hours}${minutes}${seconds}${count}`;
   };

   useEffect(() => {
      const newMitraId = generateTicketId();
      setIdMitra(newMitraId);
      form.setFieldsValue({ usernameId: newMitraId });
      if (registerSuccessRedirect) {
         resetRegisterSuccessRedirect(); // Dispatch the action to reset registersuccessredirect
         history("/dashboard/Mitra");
      }
   }, [registerSuccessRedirect, resetRegisterSuccessRedirect]);

   return (
      <>
         <MainTemplatePageCountainer
            TitleHeaderPage={"Create Mitra"}
            buttonName={"back"}
            type={"primary"}
            linked={"/dashboard/Mitra"}
         />
         <Content
            style={{
               margin: "24px 16px",
               padding: 0,
               minHeight: "68vh",
               width: "full",
               // background: colorBgContainer,
               borderRadius: borderRadiusLG,
            }}
         >
            <Form
               form={form}
               layout="vertical"
               name="register"
               onFinish={onFinish}
               //  initialValues={{
               //     // user_id: 1,
               //     idTiket: null,
               //     waktuEviden: null,
               //     noted: "",
               //     idService: undefined,
               //     idStatusOrder: undefined,
               //     idUsers: undefined,
               //  }}
            >
               <Card>
                  {/* <Form.Item
                     name="user_id"
                     label="User"
                     rules={[
                        {
                           required: true,
                           message: "Please enter the income amount",
                        },
                     ]}
                  >
                     <Input type="number" />
                  </Form.Item> */}
                  {/* <Form.Item
							name='idTiket'
							label='ID Tiket'
							rules={[
								{
									required: true,
									message: "Please enter a title",
								},
							]}>
							<Input disabled />
						</Form.Item> */}
                  <Form.Item
                     name="usernameId"
                     label="Mitra ID"
                     initialValue={idMitra}
                     rules={[
                        {
                           required: true,
                           message: "Please enter the income amount",
                        },
                     ]}
                  >
                     <Input placeholder="Mitra ID" disabled />
                  </Form.Item>
                  <Form.Item
                     name="nama"
                     label="Nama Mitra"
                     rules={[
                        {
                           required: true,
                           message: "Please input your first name!",
                        },
                     ]}
                  >
                     <Input placeholder="Nama Mitra" />
                  </Form.Item>
                  <Form.Item
                     name="idUserRoles"
                     label="Role Mitra"
                     initialValue={2}
                     rules={[
                        {
                           required: true,
                           message: "Please enter the income amount",
                        },
                     ]}
                  >
                     <Input type="number" disabled />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     label="Password"
                     rules={[
                        {
                           required: true,
                           message: "Please input your first name!",
                        },
                     ]}
                  >
                     <Input placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                     <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                     >
                        {loading ? <Spin size="small" /> : "Create Mitra"}
                     </Button>
                  </Form.Item>
               </Card>
            </Form>
         </Content>
      </>
   );
};

const mapStateToProps = (state) => ({
   //  categoriesService: state.catService.categories,
   //  categoriesStatus: state.catStatus.categories,
   //  tiketOrder: state.order.data,
   //  categoriesStatusEviden: state.catEviden.categories,
   //  mitra: state.mitra.mitra,
   //  userId: state.me.user,
   registerSuccessRedirect: state.auth.registerSuccessRedirect,
   loading: state.auth.loadingcreatemitra,
});

// const mapDispatchToProps = (dispatch) => ({
//    fetchCategoryBankRequest: () => dispatch(fetchCategoryBankRequest()),
// });

const mapDispatchToProps = (dispatch) => ({
   //  fetchCategoryServiceRequest,
   //  fetchCategoryStatusRequest,
   //  fetchMitraRequest,
   //  createOrderRequest,
   //  createEvidenRequest,
   //  fetchStatusEvidenRequest,
   //  orderRequest,
   //  userMeRequest,
   //  createPemasukanRequest,
   register: (first_name, last_name, gaji, email, password) =>
      dispatch(registerRequest(first_name, last_name, gaji, email, password)),
   resetRegisterSuccessRedirect: () => dispatch(resetRegisterSuccessRedirect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(createMitraPage);
