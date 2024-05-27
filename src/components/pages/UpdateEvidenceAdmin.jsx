// src/components/pages/UpdateEvidenceAdmin.jsx
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button, Card, message } from "antd";
import moment from "moment";
import MainTemplatePageContainer from "../templates/MainTemplatePageCountainer";
import {
   getEvidenceByIdRequest,
   updateEvidenceRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
   fetchStatusEvidenRequest,
} from "../../redux/actions/authActions";

const { Option } = Select;
const { TextArea } = Input;

const UpdateEvidenceAdmin = ({
   evidenceDetail,
   categoriesService,
   categoriesStatus,
   categoriesStatusEviden,
   mitra,
   loading,
   getEvidenceByIdRequest,
   updateEvidenceRequest,
   fetchCategoryServiceRequest,
   fetchCategoryStatusRequest,
   fetchStatusEvidenRequest,
   fetchMitraRequest,
}) => {
   const { idEviden } = useParams();
   const navigate = useNavigate();
   const [form] = Form.useForm();

   useEffect(() => {
      getEvidenceByIdRequest(idEviden);
      fetchCategoryServiceRequest();
      fetchStatusEvidenRequest();
      fetchCategoryStatusRequest();
      fetchMitraRequest();
      console.log(evidenceDetail, "detailwoy");
   }, [
      idEviden,
      getEvidenceByIdRequest,
      fetchCategoryServiceRequest,
      fetchCategoryStatusRequest,
      fetchMitraRequest,
      fetchStatusEvidenRequest,
   ]);

   useEffect(() => {
      if (evidenceDetail) {
         form.setFieldsValue({
            ...evidenceDetail,
            idTiket: evidenceDetail?.order?.idTiket || "",
            waktuEviden: evidenceDetail.waktuEviden
               ? moment(evidenceDetail.waktuEviden)
               : null,
         });
      }
   }, [evidenceDetail, form]);

   const handleFormSubmit = async (values) => {
      try {
         const formattedValues = {
            ...values,
            idTiket: evidenceDetail?.idTiket,
            waktuEviden: values.waktuEviden.toISOString(),
         };
         console.log(formattedValues, "formvalue");
         console.log(idEviden, "idorddd");
         await updateEvidenceRequest(idEviden, formattedValues);
         message.success("eviden updated successfully");
         navigate("/dashboard/EvidenceMitra");
      } catch (error) {
         message.error("Failed to update order");
      }
   };

   return (
      <>
         <MainTemplatePageContainer
            TitleHeaderPage="Edit Order"
            buttonName="Back"
            type="primary"
            linked="/dashboard/EvidenceMitra"
         />
         <Card>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
               <Form.Item
                  name="idTiket"
                  label="Tikets"
                  rules={[{ required: true, message: "Please enter a title" }]}
               >
                  <Input disabled />
               </Form.Item>
               <Form.Item
                  name="waktuEviden"
                  label="Date Evidence"
                  rules={[{ required: true, message: "Please select a date" }]}
               >
                  <DatePicker style={{ width: "100%" }} disabled />
               </Form.Item>
               <Form.Item
                  name="notedEviden"
                  label="Noted Evidence"
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
                  name="idStatusEvidence"
                  label="Status Evidence"
                  rules={[
                     {
                        required: true,
                        message: "Please select category services",
                     },
                  ]}
               >
                  <Select placeholder="Select category service">
                     {categoriesStatusEviden.map((category) => (
                        <Option
                           key={category.idStatusEvidence}
                           value={category.idStatusEvidence}
                        >
                           {category.evidenceName}
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
                  <Select placeholder="Select category status" disabled>
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
   evidenceDetail: state.eviden.eviden,
   categoriesService: state.catService.categories,
   categoriesStatus: state.catStatus.categories,
   categoriesStatusEviden: state.catEviden.categories,
   mitra: state.mitra.mitra,
   loading: state.order.loading,
});

const mapDispatchToProps = {
   getEvidenceByIdRequest,
   updateEvidenceRequest,
   fetchCategoryServiceRequest,
   fetchStatusEvidenRequest,
   fetchCategoryStatusRequest,
   fetchMitraRequest,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(UpdateEvidenceAdmin);
