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
   createEvidenRequest,
   createOrderRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
   fetchStatusEvidenRequest,
   orderRequest,
   userMeRequest,
} from "../../redux/actions/authActions";

const CreateEvidenPage = ({
   categoriesService,
   categoriesStatus,
   tiketOrder,
   orderRequest,
   categoriesStatusEviden,
   catStatus,
   loading,
   createEvidenRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchStatusEvidenRequest,
   fetchMitraRequest,
   userId,
   mitra,
   createOrderRequest,
}) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const [form] = Form.useForm();
   const [waktuEviden, setwaktuEviden] = useState(null);
   const [idTiket, setIdTiket] = useState("");
   const [tiketFilter, setTiketFilter] = useState([]);

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

   const onFinish = async (values) => {
      try {
         const formattedValues = {
            ...values,
            idUsers: userId?.idUsers,
            waktuEviden: values.waktuEviden.toISOString(),
         };

         await createEvidenRequest(formattedValues);
         console.log("success");
         form.resetFields(); // Reset the form fields after successful submission
         history("/dashboard/Evidence");
      } catch (error) {
         console.error("Failed to create order:", error);
      }
   };
   console.log(userId, "huk");

   useEffect(() => {
      // Fetch category bank data when component mounts
      fetchCategoryServiceRequest();
      fetchCategoryStatusRequest();
      fetchMitraRequest();
      fetchStatusEvidenRequest();
      orderRequest();
      // console.log(userId, "userid");
      // console.log(categories, "ini categories");
   }, [
      fetchCategoryServiceRequest,
      fetchCategoryStatusRequest,
      fetchStatusEvidenRequest,
      orderRequest,
   ]);

   useEffect(() => {
      console.log(categoriesService); // Check the value of categories
      console.log(mitra); // Check the value of
      console.log(categoriesStatusEviden, "evi");
      console.log(tiketOrder, "tiketyach");
      // console.log(catStatus); // Check the value of categories
      // console.log(userId?.user_id);
   }, [
      categoriesService,
      categoriesStatus,
      mitra,
      tiketOrder,
      categoriesStatusEviden,
   ]);
   useEffect(() => {
      if (tiketOrder?.data) {
         const tiketData = tiketOrder.data.filter(
            (tiket) =>
               tiket.idUsers === userId?.idUsers &&
               tiket.statusOrder.statusName === "Finish"
         );
         setTiketFilter(tiketData);
         console.log(tiketData, "tiketfiltrr");
      }
      console.log(tiketFilter, "finale");
      console.log(userId, "useridbos");
   }, [tiketOrder]);

   const assignedStatus = categoriesStatus.filter(
      (category) => category.statusName === "Finish"
   );

   const assignedStatusEvidence = categoriesStatusEviden.filter(
      (category) => category.evidenceName === "Assigned"
   );
   return (
      <>
         <MainTemplatePageCountainer
            TitleHeaderPage={"Create Eviden"}
            buttonName={"back"}
            type={"primary"}
            linked={"/dashboard/Evidence"}
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
               name="CreateEvidenPageForm"
               onFinish={onFinish}
               initialValues={{
                  // user_id: 1,
                  idTiket: null,
                  waktuEviden: null,
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
                     name="idTiket"
                     label="ID TIKET"
                     rules={[
                        {
                           required: true,
                           message: "Please selecT ID TIKET services",
                        },
                     ]}
                  >
                     <Select placeholder="Select categori service">
                        {tiketFilter?.map((tiket) => (
                           <Option key={tiket.idOrder} value={tiket.idOrder}>
                              {tiket.idTiket}
                           </Option>
                        ))}
                     </Select>
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
                     name="waktuEviden"
                     label="Date"
                     rules={[
                        {
                           required: true,
                           message: "Please select a date",
                        },
                     ]}
                  >
                     <DatePicker
                        style={{ width: "100%" }}
                        onChange={handleDatePickerChange}
                     />
                  </Form.Item>
                  <Form.Item
                     name="notedEviden"
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
                     name="idStatusEvidence"
                     label="Status Evidence"
                     rules={[
                        {
                           required: true,
                           message: "Please select status evidence",
                        },
                     ]}
                  >
                     <Select placeholder="Select categori status">
                        {assignedStatusEvidence.map((category) => (
                           <Option
                              key={category.idStatusEvidence}
                              value={category.idStatusEvidence}
                           >
                              {category.evidenceName}
                           </Option>
                        ))}
                     </Select>
                     {/* <Select placeholder="Select status">
                        <Option key={1} value={1}>
                           {"Assigned"}
                        </Option>
                     </Select> */}
                  </Form.Item>
                  <Form.Item>
                     <Button type="primary" htmlType="submit">
                        Create Eviden
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
   tiketOrder: state.order.data,
   categoriesStatusEviden: state.catEviden.categories,
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
   createEvidenRequest,
   fetchStatusEvidenRequest,
   orderRequest,
   userMeRequest,
   //  createPemasukanRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvidenPage);
