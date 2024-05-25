import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

const HeaderPageLayout = ({
   TitleHeaderPage,
   icon,
   onClick,
   buttonName,
   TitleSecondHeaderPage,
   type,
   linked,
}) => {
   return (
      <>
         <Header
            style={{
               background: "white",
               boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
               padding: 24,
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
            }}
         >
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 0,
                  margin: 0,
               }}
            >
               <span
                  style={{
                     fontWeight: "500",
                     fontSize: "20px",
                     color: "#1677ff",
                     padding: 0,
                     margin: 0,
                     lineHeight: "20px",
                  }}
               >
                  {TitleHeaderPage}
               </span>
               <span
                  style={{
                     fontWeight: "100",
                     fontSize: "12px",
                     color: "#1677ff",
                     padding: 0,
                     margin: 0,
                     lineHeight: "20px",
                  }}
               >
                  {TitleSecondHeaderPage}
               </span>
            </div>
            <div>
               <Link to={linked}>
                  <Button
                     type={type}
                     icon={icon}
                     onClick={onClick}
                     style={{ border: "none", boxShadow: "none" }}
                  >
                     {buttonName}
                  </Button>
               </Link>
            </div>
         </Header>
      </>
   );
};

export default HeaderPageLayout;
