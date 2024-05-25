// components/large/Sidebar.js
import { Layout } from "antd";
import MenuItems from "../molecules/MenuItems";

const SideBarPage = ({ titleContent }) => {
   //    const titleContent = collapsed ? (
   //       <MoneyCollectOutlined style={{ fontSize: "16px", color: "black" }} />
   //    ) : (
   //       " Pengeluaranku"
   //    );
   return (
      <>
         <div
            className=""
            style={{
               color: "",
               fontWeight: "600",
               marginLeft: "40px",
               marginTop: "35px",
            }}
         >
            {titleContent}
         </div>

         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               flexDirection: "column",
               minHeight: "88vh",
            }}
         >
            <MenuItems />
         </div>
      </>
   );
};

export default SideBarPage;
