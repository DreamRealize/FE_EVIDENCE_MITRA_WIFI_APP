// src/components/pages/UpdateOrderPage.jsx
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button, Card, message } from "antd";
import moment from "moment";
import MainTemplatePageContainer from "../templates/MainTemplatePageCountainer";
import {
   getOrderByIdRequest,
   updateOrderRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
} from "../../redux/actions/authActions";

const { Option } = Select;
const { TextArea } = Input;

const UpdateOrderPage = ({
   orderDetails,
   categoriesService,
   categoriesStatus,
   mitra,
   loading,
   getOrderByIdRequest,
   updateOrderRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
}) => {
   const { idOrder } = useParams();
   const navigate = useNavigate();
   const [form] = Form.useForm();

   useEffect(() => {
      getOrderByIdRequest(idOrder);
      fetchCategoryServiceRequest();
      fetchCategoryStatusRequest();
      fetchMitraRequest();
      console.log(orderDetails,"detailwoy");
   }, [
      idOrder,
      getOrderByIdRequest,
      fetchCategoryServiceRequest,
      fetchCategoryStatusRequest,
      fetchMitraRequest,
   ]);

   useEffect(() => {
      if (orderDetails) {
         form.setFieldsValue({
            ...orderDetails,
            waktuOrder: orderDetails.waktuOrder
               ? moment(orderDetails.waktuOrder)
               : null,
         });
      }
   }, [orderDetails, form]);

   const handleFormSubmit = async (values) => {
      try {
         const formattedValues = {
            ...values,
            waktuOrder: values.waktuOrder.toISOString(),
         };
         console.log(formattedValues, "formvalue");
         console.log(idOrder,"idorddd");
         await updateOrderRequest(idOrder, formattedValues);
         message.success("Order updated successfully");
         navigate("/dashboard/NewOrder");
      } catch (error) {
         message.error("Failed to update order");
      }
   };

   return (
      <>
         <MainTemplatePageContainer
            TitleHeaderPage="Edit Order"
            buttonName="Back"
            type="default"
            linked="/dashboard/NewOrder"
         />
         <Card>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
               <Form.Item
                  name="idTiket"
                  label="Tiket"
                  rules={[{ required: true, message: "Please enter a title" }]}
               >
                  <Input disabled />
               </Form.Item>
               <Form.Item
                  name="waktuOrder"
                  label="Date"
                  rules={[{ required: true, message: "Please select a date" }]}
               >
                  <DatePicker style={{ width: "100%" }} disabled />
               </Form.Item>
               <Form.Item
                  name="noted"
                  label="Noted"
                  rules={[
                     { required: true, message: "Please enter a description" },
                  ]}
               >
                  <TextArea rows={4} disabled />
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
                  <Select placeholder="Select category service" disabled>
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
                        message: "Please select category status",
                     },
                  ]}
               >
                  <Select placeholder="Select category status">
                     {categoriesStatus.map((category) => (
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
                  rules={[{ required: true, message: "Please select Mitra" }]}
               >
                  <Select placeholder="Select Mitra" disabled>
                     {mitra.map((mitras) => (
                        <Option key={mitras?.idUsers} value={mitras?.idUsers}>
                           {mitras.nama}
                        </Option>
                     ))}
                  </Select>
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                     Update Order
                  </Button>
               </Form.Item>
            </Form>
         </Card>
      </>
   );
};

const mapStateToProps = (state) => ({
   orderDetails: state.order.order,
   categoriesService: state.catService.categories,
   categoriesStatus: state.catStatus.categories,
   mitra: state.mitra.mitra,
   loading: state.order.loading,
});

const mapDispatchToProps = {
   getOrderByIdRequest,
   updateOrderRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderPage);
