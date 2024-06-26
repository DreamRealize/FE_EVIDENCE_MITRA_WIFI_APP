import React, { useEffect } from "react";
import MainTemplatePageCountainer from "../templates/MainTemplatePageCountainer";
import { theme, Row, Col, Card, Typography } from "antd";
import { connect } from "react-redux";
import {
   fetchMitraRequest,
   orderRequest,
   evidenRequest,
} from "../../redux/actions/authActions";
import { DownloadOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const { Title, Text } = Typography;

const DashBoard = ({
   mitraData,
   fetchMitraRequest,
   orderData,
   orderRequest,
   evidenData,
   evidenRequest,
}) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   useEffect(() => {
      fetchMitraRequest();
      orderRequest();
      evidenRequest();
   }, [fetchMitraRequest, orderRequest, evidenRequest]);

   console.log(mitraData, "carimitra");
   console.log(orderData, "caridata");
   console.log(evidenData, "carieviden");

   const troubleShootOrders = orderData?.data?.filter(
      (order) => order.service.serviceName === "Trouble Shoot"
   ).length;

   const pasangBaruOrders = orderData?.data?.filter(
      (order) => order.service.serviceName === "Pasang Baru"
   ).length;

   console.log(`Total Trouble Shoot Orders: ${troubleShootOrders}`);
   console.log(`Total Pasang Baru Orders: ${pasangBaruOrders}`);

   const evidenceApproved = evidenData?.data?.filter(
      (eviden) => eviden.statusEviden.evidenceName === "Approved"
   ).length;

   const evidenceAssigned = evidenData?.data?.filter(
      (eviden) => eviden.statusEviden.evidenceName === "Assigned"
   ).length;

   const evidenceCancelled = evidenData?.data?.filter(
      (eviden) => eviden.statusEviden.evidenceName === "Cancelled"
   ).length;

   console.log(`Total approved evidence: ${evidenceApproved}`);
   console.log(`Total assigned evidence: ${evidenceAssigned}`);
   console.log(`Total assigned evidence: ${evidenceCancelled}`);

   const calculateCompletionPercentage = (orders, evidences) => {
      if (orders === 0) return "0";
      return ((evidences / orders) * 100).toFixed(2);
   };

   const totalOrders = orderData?.data?.length || 0;
   const totalEvidences = evidenData?.data?.length || 0;
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
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "green",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
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
               <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                     style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "green",
                        borderRadius: "50%",
                        marginRight: 5,
                     }}
                  ></div>
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
                        backgroundColor: "##641E16",
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
         value: `${completionPercentage}%`,
         color: getCompletionTextColor(completionPercentage),
      },
   ];

   // Data for Pie chart
   const pieData = [
      { name: "Evidence", value: totalEvidences },
      { name: "Orders", value: totalOrders },
   ];

   const pieDataEvidence = [
      { name: "Approved", value: evidenceApproved },
      { name: "Assigned", value: evidenceAssigned },
      { name: "Cancelled", value: evidenceCancelled },
   ];

   const COLORS = ["#F1C40F", "#FF5733"];

   const COLORSEVIDENCE = ["#F1C40F","#FF5733","#641E16"];

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
               <h1>TELKOM WIFI LAPORAN APP</h1>
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
});

const mapDispatchToProps = (dispatch) => ({
   fetchMitraRequest: (page) => dispatch(fetchMitraRequest(page)),
   orderRequest: (page) => dispatch(orderRequest(page)),
   evidenRequest: (page) => dispatch(evidenRequest(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
