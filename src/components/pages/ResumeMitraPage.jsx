import React, { useEffect, useState } from "react";
import MainTemplatePageCountainer from "../templates/MainTemplatePageCountainer";
import { theme, Row, Col, Card, Typography } from "antd";
import { connect } from "react-redux";
import {
   fetchMitraRequest,
   orderRequest,
   evidenRequest,
   userMeRequest,
} from "../../redux/actions/authActions";
import { DownloadOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const { Title, Text } = Typography;

const ResumeMitraPage = ({
   mitraData,
   fetchMitraRequest,
   orderData,
   orderRequest,
   evidenData,
   evidenRequest,
   userMeRequest,
   user,
}) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const [filterOrder, setFilterOrder] = useState();
   const [filterEvidence, setFilterEvidence] = useState();

   useEffect(() => {
      fetchMitraRequest();
      orderRequest();
      evidenRequest();
   }, [fetchMitraRequest, orderRequest, evidenRequest]);

   console.log(mitraData, "carimitra");
   console.log(orderData, "caridata");
   console.log(evidenData, "carieviden");

   useEffect(() => {
      //       console.log(user.idUsers, "userbos");
      //       let getId = user.idUsers;
      //       console.log(getId, "kikuk");
      if (orderData?.data) {
         const mitraData = orderData.data.filter(
            (order) => order.user?.idUsers === user?.idUsers // Assuming 2 is the role ID for "Mitra"
         );
         setFilterOrder(mitraData);
      }
      if (evidenData?.data) {
         const dataEviden = evidenData.data.filter(
            (order) => order.user?.idUsers === user?.idUsers // Assuming 2 is the role ID for "Mitra"
         );
         setFilterEvidence(dataEviden);
      }
   }, [orderData, user, evidenData]);

   console.log(filterOrder, "ini filter order");
   console.log(filterEvidence, "ini filter eviden");

   const troubleShootOrders = filterOrder?.filter(
      (order) => order.service.serviceName === "Trouble Shoot"
   ).length;

   const pasangBaruOrders = filterOrder?.filter(
      (order) => order.service.serviceName === "Pasang Baru"
   ).length;

   const finishOrders = filterOrder?.filter(
      (order) => order.statusOrder.statusName === "Finish"
   ).length;
   const unfinishOrders = filterOrder?.filter(
      (order) => order.statusOrder.statusName === "Assigned"
   ).length;

   console.log(`Total Trouble Shoot Orders: ${troubleShootOrders}`);
   console.log(`Total Pasang Baru Orders: ${pasangBaruOrders}`);
   console.log(`Total Finish Orders: ${finishOrders}`);

   const evidenceApproved = filterEvidence?.filter(
      (eviden) => eviden.statusEviden.evidenceName === "Approved"
   ).length;

   const evidenceAssigned = filterEvidence?.filter(
      (eviden) => eviden.statusEviden.evidenceName === "Assigned"
   ).length;

   const evidenceCancelled = filterEvidence?.filter(
      (eviden) => eviden.statusEviden.evidenceName === "Cancelled"
   ).length;

   console.log(`Total approved evidence: ${evidenceApproved}`);
   console.log(`Total assigned evidence: ${evidenceAssigned}`);
   console.log(`Total assigned evidence: ${evidenceCancelled}`);

   const calculateCompletionPercentage = (orders, evidences) => {
      if (orders === 0) return "0";
      return ((evidences / orders) * 100).toFixed(2);
   };

   const totalOrders = filterOrder?.length || 0;
   const totalEvidences = filterEvidence?.length || 0;
   const completionPercentage = calculateCompletionPercentage(
      totalOrders,
      totalEvidences
   );

   const getCompletionTextColor = (percentage) => {
      return percentage === "100.00" ? "green" : "red";
   };

   const cardData = [
      // { title: "Jumlah Mitra", value: `${mitraData?.length || 0} Mitra` },
      {
         title: "Order Categories",
         value: (
            <>
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     fontWeight: "500",
                  }}
               >
                  {/* <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "green",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div> */}
                  Total Orders: {totalOrders}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#FF5733",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Trouble Shoot: {troubleShootOrders}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#C70039",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Pasang Baru: {pasangBaruOrders}
               </div>
            </>
         ),
      },
      {
         title: "Evidence Status",
         value: (
            <>
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     fontWeight: "500",
                  }}
               >
                  {/* <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "green",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div> */}
                  Total Evidence: {totalEvidences}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#FF5733",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Approved: {evidenceApproved}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#C70039",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Assigned: {evidenceAssigned}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#641E16",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Cancelled: {evidenceCancelled}
               </div>
            </>
         ),
      },
      {
         title: "Order Status",
         value: (
            <>
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     fontWeight: "500",
                     color: getCompletionTextColor(completionPercentage),
                  }}
               >
                  {/* <div
                         style={{
                            width: 10,
                            height: 10,
                            backgroundColor: "green",
                            borderRadius: "50%",
                            marginRight: 5,
                         }}
                      ></div> */}
                  Progress Order: {completionPercentage + "%"}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#FF5733",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Order Finish: {finishOrders}
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#C70039",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
                  Order Unfinished: {unfinishOrders}
               </div>
            </>
         ),
      },
   ];

   // Data for Pie chart
   const pieData = [
      { name: "Order Finish", value: finishOrders },
      { name: "Order Unfinish", value: unfinishOrders },
   ];

   const pieDataEvidence = [
      { name: "Approved", value: evidenceApproved },
      { name: "Assigned", value: evidenceAssigned },
      { name: "Cancelled", value: evidenceCancelled },
   ];

   const COLORS = ["#F1C40F", "#FF5733"];

   const COLORSEVIDENCE = ["#F1C40F", "#FF5733", "#641E16"];

   const pieDataOrder = [
      // { name: "Orders", value: totalOrders },
      { name: "Trouble Shoots", value: troubleShootOrders },
      { name: "Pasang Baru", value: pasangBaruOrders },
   ];

   const COLORORDER = ["#FF5733", "#C70039"];

   const RADIAN = Math.PI / 180;
   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
   }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
         <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      );
   };

   return (
      <>
         <MainTemplatePageCountainer
            TitleHeaderPage={"Overview Dashboard"}
            icon={<DownloadOutlined />}
            buttonName={"Download"}
            type={"primary"}
            TitleSecondHeaderPage={"Lets see overview dashboard"}
         />
         <Content
            style={{
               margin: "24px 16px",
               padding: 0,
               minHeight: "68vh",
               width: "full",
               overflow: "hidden",
               borderRadius: borderRadiusLG,
            }}
         >
            <div style={{ textAlign: "center" }}>
               <h1>Resume Laporan WIFI Mitra</h1>
            </div>
            <Row gutter={16} style={{ padding: "20px" }}>
               {cardData.map((card, index) => (
                  <Col span={8} key={index}>
                     <Card>
                        <Title level={4}>{card.title}</Title>
                        <div style={{ display: "flex", alignItems: "center" }}>
                           {card.title === "Order Categories" && (
                              <div style={{ width: "50%" }}>
                                 <ResponsiveContainer width="100%" height={100}>
                                    <PieChart>
                                       <Pie
                                          data={pieDataOrder}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={20}
                                          outerRadius={40}
                                          fill="#8884d8"
                                          labelLine={false}
                                          paddingAngle={5}
                                          dataKey="value"
                                          label={renderCustomizedLabel}
                                       >
                                          {pieDataOrder.map((entry, index) => (
                                             <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                   COLORORDER[
                                                      index % COLORORDER.length
                                                   ]
                                                }
                                             />
                                          ))}
                                       </Pie>
                                       <Tooltip />
                                    </PieChart>
                                 </ResponsiveContainer>
                              </div>
                           )}
                           {card.title === "Evidence Status" && (
                              <div style={{ width: "50%" }}>
                                 <ResponsiveContainer width="100%" height={100}>
                                    <PieChart>
                                       <Pie
                                          data={pieDataEvidence}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={20}
                                          outerRadius={40}
                                          fill="#8884d8"
                                          labelLine={false}
                                          paddingAngle={5}
                                          dataKey="value"
                                          label={renderCustomizedLabel}
                                       >
                                          {pieDataEvidence.map(
                                             (entry, index) => (
                                                <Cell
                                                   key={`cell-${index}`}
                                                   fill={
                                                      COLORSEVIDENCE[
                                                         index %
                                                            COLORSEVIDENCE.length
                                                      ]
                                                   }
                                                />
                                             )
                                          )}
                                       </Pie>
                                       <Tooltip />
                                    </PieChart>
                                 </ResponsiveContainer>
                              </div>
                           )}
                           {card.title === "Order Status" && (
                              <div style={{ width: "50%" }}>
                                 <ResponsiveContainer width="100%" height={100}>
                                    <PieChart>
                                       <Pie
                                          data={pieData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={20}
                                          outerRadius={40}
                                          fill="#8884d8"
                                          labelLine={false}
                                          paddingAngle={5}
                                          dataKey="value"
                                          label={renderCustomizedLabel}
                                       >
                                          {pieData.map((entry, index) => (
                                             <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                   COLORS[index % COLORS.length]
                                                }
                                             />
                                          ))}
                                       </Pie>
                                       <Tooltip />
                                    </PieChart>
                                 </ResponsiveContainer>
                              </div>
                           )}
                           <Text
                              style={{
                                 color: card.color || "black",
                                 marginLeft: "20px",
                              }}
                           >
                              {card.value}
                           </Text>
                        </div>
                     </Card>
                  </Col>
               ))}
            </Row>
         </Content>
      </>
   );
};

const mapStateToProps = (state) => ({
   mitraData: state.mitra.mitra,
   orderData: state.order.data,
   evidenData: state.eviden.data,
   user: state.me.user,
});

const mapDispatchToProps = (dispatch) => ({
   fetchMitraRequest: (page) => dispatch(fetchMitraRequest(page)),
   orderRequest: (page) => dispatch(orderRequest(page)),
   evidenRequest: (page) => dispatch(evidenRequest(page)),
   userMeRequest,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeMitraPage);
