import React, { useState } from "react";
import { Menu, Space } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import MenuItem from "../molecules/MenuItem";
import CustomButton from "../atoms/CustomButton";
import { logoutSuccessRedirect } from "../../../redux/actions/authActions";
import { connect } from "react-redux";

const MenuComponent = ({
   items,
   selectedMenuKey,
   handleMenuClick,
   handleLogoutClick,
   loading,
}) => {
   const [transactionCollapsed, setTransactionCollapsed] = useState(true);

   const toggleTransactionCollapse = () => {
      setTransactionCollapsed(!transactionCollapsed);
   };

   return (
      <div>
         <Menu
            theme="light"
            selectedKeys={[selectedMenuKey]}
            onClick={handleMenuClick}
            mode="inline"
            style={{
               paddingTop: "20px",
               paddingLeft: "1px",
               paddingRight: "10px",
            }}
         >
            {items.map((item) =>
               item.children ? (
                  <Menu.SubMenu
                     key={item.key}
                     icon={
                        <span
                           style={{
                              marginRight: "4px",
                              borderRadius: "4px",
                              boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                              padding: "7px",
                              backgroundColor:
                                 item.key === selectedMenuKey
                                    ? "#1677ff"
                                    : "inherit",
                              color:
                                 item.key === selectedMenuKey ? "white" : "",
                           }}
                        >
                           {item.icon}
                        </span>
                     }
                     title={item.label}
                     style={{
                        background: "none",
                        color:
                           item.key === selectedMenuKey
                              ? "red"
                              : item.textColor, // Ganti warna teks submenu sesuai keinginan
                        fontWeight: "500",
                        marginBottom: "18px",
                     }}
                  >
                     {item.children.map((subItem) => (
                        <Menu.Item
                           key={subItem.key}
                           icon={subItem.icon}
                           style={{
                              background: "transparent",
                              color:
                                 subItem.key === selectedMenuKey
                                    ? "#1677ff"
                                    : item.textColor, // Ganti warna teks submenu item sesuai keinginan
                              fontWeight: "500",
                           }}
                        >
                           <Link
                              to={`/dashboard/${subItem.label}`}
                              style={{ textDecoration: "none" }}
                           ></Link>
                           {subItem.label}
                           {/* <p>{item.label}</p> */}
                        </Menu.Item>
                     ))}
                  </Menu.SubMenu>
               ) : (
                  <Menu.Item
                     key={item.key}
                     icon={
                        <span
                           style={{
                              marginRight: "4px",
                              borderRadius: "4px",
                              boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                              padding: "7px",
                              backgroundColor:
                                 item.key === selectedMenuKey
                                    ? "#1677ff"
                                    : "inherit",
                              color:
                                 item.key === selectedMenuKey ? "white" : "",
                           }}
                        >
                           {item.icon}
                        </span>
                     }
                     // style={{
                     //    background: "transparent",
                     //    color:
                     //       item.key === selectedMenuKey
                     //          ? "#1677ff"
                     //          : item.textColor, // Ganti warna teks item sesuai keinginan
                     //    fontWeight: "500",
                     // }}
                     style={{
                        backgroundColor:
                           selectedMenuKey === item.key ? "#fafafa" : "inherit",
                        boxShadow:
                           selectedMenuKey === item.key
                              ? "0 20px 27px rgb(0 0 0 / 5%)"
                              : "inherit",
                        color:
                           selectedMenuKey === item.key ? "#1677ff" : "inherit", // Ganti warna teks saat diklik
                        fontWeight: "500", // Membuat teks tebal
                        textDecoration: "none", // Menghilangkan garis bawah atau decoration
                        marginBottom: "18px",
                     }}
                  >
                     <Link
                        to={`/dashboard/${item.label}`}
                        style={{ textDecoration: "none" }}
                     >
                        {item.label}
                     </Link>
                  </Menu.Item>
               )
            )}
            <Space
               className="menu-item-header"
               onClick={toggleTransactionCollapse}
               style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  cursor: "pointer",
               }}
            >
               <span>Transaction</span>
               <span>
                  {transactionCollapsed ? (
                     <CaretDownOutlined />
                  ) : (
                     <CaretUpOutlined />
                  )}
               </span>
            </Space>
            {/* Render Transaction Items based on transactionCollapsed state */}
            {/* ... */}
         </Menu>
         <div>
            <CustomButton
               loading={loading}
               onClick={handleLogoutClick}
               icon={<LogoutOutlined />}
            >
               Logout
            </CustomButton>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   logoutSuccessRedirect: state.auth.logoutSuccessRedirect,
   loading: state.auth.loading,
});

const mapDispatchToProps = {
   logout: logoutSuccessRedirect,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
