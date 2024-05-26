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
import { theme, Button, Input, Form, DatePicker, Select, Card } from "antd";

const { Option } = Select;
const { TextArea } = Input;
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
   createOrderRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
} from "../../redux/actions/authActions";

const CreateOrderPage = ({
   categoriesService,
   categoriesStatus,
   catStatus,
   loading,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
   userId,
   mitra,
   createOrderRequest,
}) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const [form] = Form.useForm();
   const [WaktuOrder, setWaktuOrder] = useState(null);
   const [idTiket, setIdTiket] = useState("");

   const handleDatePickerChange = (date) => {
      setWaktuOrder(date);
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

   const onFinish = async (values) => {
      try {
         const formattedValues = {
            ...values,
            waktuOrder: values.waktuOrder.toISOString(),
         };

         await createOrderRequest(formattedValues);
         console.log("success");
         form.resetFields(); // Reset the form fields after successful submission
         history("/dashboard/Order");
      } catch (error) {
         console.error("Failed to create order:", error);
      }
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

      return `Tiket${year}${month}${day}${hours}${minutes}${seconds}${count}`;
   };

   useEffect(() => {
      // Fetch category bank data when component mounts
      console.log(idTiket, "tiket");
      const newIdTiket = generateTicketId();
      setIdTiket(newIdTiket);
      form.setFieldsValue({ idTiket: newIdTiket });
      fetchCategoryServiceRequest();
      fetchCategoryStatusRequest();
      fetchMitraRequest();
      // console.log(userId, "userid");
      // console.log(categories, "ini categories");
   }, [fetchCategoryServiceRequest, fetchCategoryStatusRequest]);

   useEffect(() => {
      console.log(categoriesService); // Check the value of categories
      console.log(mitra); // Check the value of categories
      // console.log(catStatus); // Check the value of categories
      // console.log(userId?.user_id);
   }, [categoriesService, categoriesStatus, mitra]);

   const assignedStatus = categoriesStatus.filter(
      (category) => category.statusName === "Assigned"
   );
   return (
      <>
         <MainTemplatePageCountainer
            TitleHeaderPage={"Create Order"}
            buttonName={"dashboard/order/create"}
            TitleSecondHeaderPage={
               <Link to={"/dashboard/Order"}>
                  {<ArrowLeftOutlined />} Back to Order
               </Link>
            }
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
               name="CreateOrderPageForm"
               onFinish={onFinish}
               initialValues={{
                  // user_id: 1,
                  idTiket: idTiket,
                  waktuOrder: null,
                  noted: "",
                  idService: undefined,
                  idStatusOrder: undefined,
                  idUsers: undefined,
               }}
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
                  <Form.Item
                     name="idTiket"
                     label="Tiket"
                     rules={[
                        { required: true, message: "Please enter a title" },
                     ]}
                  >
                     <Input disabled />
                  </Form.Item>
                  {/* <Form.Item
                     name="InAmount"
                     label="Amount"
                     rules={[
                        {
                           required: true,
                           message: "Please enter the income amount",
                        },
                     ]}
                  >
                     <Input type="number" />
                  </Form.Item> */}
                  <Form.Item
                     name="waktuOrder"
                     label="Date"
                     rules={[
                        { required: true, message: "Please select a date" },
                     ]}
                  >
                     <DatePicker
                        style={{ width: "100%" }}
                        onChange={handleDatePickerChange}
                     />
                  </Form.Item>
                  <Form.Item
                     name="noted"
                     label="Noted"
                     rules={[
                        {
                           required: true,
                           message: "Please enter a description",
                        },
                     ]}
                  >
                     <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item
                     name="idService"
                     label="Category Services"
                     rules={[
                        {
                           required: true,
                           message: "Please select category services",
                        },
                     ]}
                  >
                     <Select placeholder="Select categori service">
                        {categoriesService.map((category) => (
                           <Option
                              key={category.idService}
                              value={category.idService}
                           >
                              {category.serviceName}
                           </Option>
                        ))}
                     </Select>
                  </Form.Item>
                  <Form.Item
                     name="idStatusOrder"
                     label="Category Status"
                     rules={[
                        {
                           required: true,
                           message: "Please select category Status",
                        },
                     ]}
                  >
                     <Select placeholder="Select categori status">
                        {assignedStatus.map((category) => (
                           <Option
                              key={category.idStatusOrder}
                              value={category.idStatusOrder}
                           >
                              {category.statusName}
                           </Option>
                        ))}
                     </Select>
                  </Form.Item>
                  <Form.Item
                     name="idUsers"
                     label="Sign ticket to"
                     rules={[
                        {
                           required: true,
                           message: "Please select Mitra",
                        },
                     ]}
                  >
                     <Select placeholder="Select Mitra">
                        {mitra?.map((mitras) => (
                           <Option key={mitras.idUsers} value={mitras.idUsers}>
                              {mitras.nama}
                           </Option>
                        ))}
                     </Select>
                  </Form.Item>
                  <Form.Item>
                     <Button type="primary" htmlType="submit">
                        Create Order
                     </Button>
                  </Form.Item>
               </Card>
            </Form>
         </Content>
      </>
   );
};

const mapStateToProps = (state) => ({
   categoriesService: state.catService.categories,
   categoriesStatus: state.catStatus.categories,
   mitra: state.mitra.mitra,
   userId: state.me.user,
});

// const mapDispatchToProps = (dispatch) => ({
//    fetchCategoryBankRequest: () => dispatch(fetchCategoryBankRequest()),
// });

const mapDispatchToProps = {
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
   createOrderRequest,
   //  createPemasukanRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderPage);
