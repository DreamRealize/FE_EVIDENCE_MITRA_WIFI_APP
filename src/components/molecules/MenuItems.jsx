// components/medium/MenuItems.js
import React, { useEffect } from "react";
import { useState } from "react";
import { Menu, Button, Spin, Card, Space } from "antd";
import {
   DesktopOutlined,
   PieChartOutlined,
   LogoutOutlined,
   WalletOutlined,
   CaretDownOutlined,
   CaretUpOutlined,
   SettingOutlined,
   BookOutlined,
   ProfileOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import {
   logOutRequest,
   logoutSuccessRedirect,
   userMeRequest,
} from "../../redux/actions/authActions";
import { connect } from "react-redux";
import CustomButton from "../atoms/CustomButton";
import "../../assets/styles/main.css";

const getItem = (label, key, icon, children) => ({
   key,
   icon,
   children,
   label,
});


const MenuItems = ({
   logout,
   redirect,
   logoutSuccessRedirect,
   loading,
   userMeRequest,
   user,
}) => {
   const [selectedMenuKey, setSelectedMenuKey] = useState("");
   const [transactionCollapsed, setTransactionCollapsed] = useState(true);

   const userRole = user?.userRole?.idName;
   const getMenuItems = () => {
      if (userRole === "Admin") {
         // For admin, show CategoryServices along with other items
         return [
            getItem("Overview", "1", <PieChartOutlined />),
            getItem("Order", "3", <PieChartOutlined />),
            getItem("EvidenceMitra", "4", <PieChartOutlined />),
            getItem("Mitra", "5", <PieChartOutlined />),
         ];
      } else if (userRole === "Mitra") {
         // For mitra, show only Overview
         return [
            getItem("Overview", "1", <PieChartOutlined />),
            getItem("NewOrder", "2", <PieChartOutlined />),
            getItem("Evidence", "3", <PieChartOutlined />),
         ];
      } else {
         // Default fallback (handle unexpected roles)
         return [];
      }
   };

   const items = getMenuItems();
   const toggleTransactionCollapse = () => {
      setTransactionCollapsed(!transactionCollapsed);
   };

   const navigate = useNavigate();
   const location = useLocation();

   // Fungsi untuk menyimpan status menu yang dipilih di localStorage
   const saveSelectedMenuToLocalStorage = (key) => {
      localStorage.setItem("selectedMenuKey", key);
   };

   // Fungsi untuk mendapatkan status menu yang dipilih dari localStorage
   const getSelectedMenuFromLocalStorage = () => {
      const storedKey = localStorage.getItem("selectedMenuKey");
      if (storedKey) {
         return storedKey;
      }
      return "1"; // Default menu key jika tidak ada yang tersimpan
   };

   const handleLogoutClick = () => {
      localStorage.removeItem("selectedMenuKey");
      // Dispatch the logout action
      console.log("Logout Clicked");
      logout();
   };
   if (logoutSuccessRedirect) {
      // Clear the redirect flag
      // logoutSuccessRedirect();

      // Redirect to "/login"
      navigate("/login");
   }

   useEffect(() => {
      // Mengambil status menu yang dipilih saat komponen dimuat
      setSelectedMenuKey(getSelectedMenuFromLocalStorage());
   }, []); // Efek ini hanya dijalankan saat komponen pertama kali dimuat
   console.log(user?.userRole?.idName, "usersidebar");
   //    useEffect(() => {
   //       // Memperbarui selectedMenuKey berdasarkan URL saat ada perubahan pada URL
   //       const pathname = location.pathname;
   //       console.log(pathname, "pathname"); // Tambahkan baris ini

   //       const capitalizedPathname =
   //          pathname.charAt(0).toUpperCase() + pathname.slice(1);

   //       const menuItem = [...items].find((item) =>
   //          pathname.startsWith(`/dashboard/${item.label}`)
   //       );

   //       if (menuItem) {
   //          setSelectedMenuKey(menuItem.key);
   //          saveSelectedMenuToLocalStorage(menuItem.key);
   //       } else {
   //          setSelectedMenuKey("1"); // Atur ke nilai default jika tidak ada yang sesuai
   //          saveSelectedMenuToLocalStorage("1"); // Simpan nilai default ke localStorage
   //       }
   //    }, [location.pathname]);

   useEffect(() => {
      const pathname = location.pathname;
      const menuItem = items.find((item) =>
         pathname.startsWith(`/dashboard/${item.label}`)
      );

      if (menuItem) {
         setSelectedMenuKey(menuItem.key);
         saveSelectedMenuToLocalStorage(menuItem.key);
      } else {
         setSelectedMenuKey("1"); // Default menu key jika tidak ada yang sesuai
         saveSelectedMenuToLocalStorage("1");
      }
   }, [location.pathname, items]);

   const handleMenuClick = (e) => {
      setSelectedMenuKey(e.key);
      saveSelectedMenuToLocalStorage(e.key);
   };
   return (
      <>
         <div>
            <Menu
               theme="light"
               // defaultSelectedKeys={["1"]}
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
                              selectedMenuKey === item.key
                                 ? "#fafafa"
                                 : "inherit",
                           boxShadow:
                              selectedMenuKey === item.key
                                 ? "0 20px 27px rgb(0 0 0 / 5%)"
                                 : "inherit",
                           color:
                              selectedMenuKey === item.key
                                 ? "#1677ff"
                                 : "inherit", // Ganti warna teks saat diklik
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
               {/* <Space
                  className="menu-item-header"
                  onClick={toggleTransactionCollapse}
                  style={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "space-between",
                     cursor: "pointer",
                  }}
               >
                  <span>Transaction </span>
                  <span>
                     {transactionCollapsed ? (
                        <CaretDownOutlined />
                     ) : (
                        <CaretUpOutlined />
                     )}
                  </span>
               </Space> */}
               {/* {!transactionCollapsed &&
                  transactionItems.map((item) => (
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
                              selectedMenuKey === item.key
                                 ? "#fafafa"
                                 : "inherit",
                           boxShadow:
                              selectedMenuKey === item.key
                                 ? "0 20px 27px rgb(0 0 0 / 5%)"
                                 : "inherit",
                           color:
                              selectedMenuKey === item.key
                                 ? "#1677ff"
                                 : "inherit", // Ganti warna teks saat diklik
                           fontWeight: "500", // Membuat teks tebal
                           textDecoration: "none", // Menghilangkan garis bawah atau decoration
                           marginBottom: "18px",
                           marginTop: "18px",
                        }}
                     >
                        <Link
                           to={`/dashboard/${item.label}`}
                           style={{ textDecoration: "none" }}
                        >
                           {item.label}
                        </Link>
                     </Menu.Item>
                  ))} */}

               {/* <Menu.Item className="menu-item-header">Categorycal</Menu.Item>
               {categorycalItems.map((item) => (
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
               ))} */}
               {/* <Menu.Item className="menu-item-header" key="10">
                  Account Pages
               </Menu.Item> */}
               {/* {profileItem.map((item) => (
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
               ))} */}
               {/* <Menu.Item
                  key="Profile"
                  icon={
                     <ProfileOutlined
                        style={{
                           marginRight: "4px",
                           borderRadius: "4px",
                           boxShadow: " 0 4px 6px rgb(0 0 0 / 12%)",
                           padding: "7px",
                           backgroundColor:
                              selectedMenuKey === "Profile"
                                 ? "#1677ff"
                                 : "inherit",
                           color: selectedMenuKey === "Profile" ? "white" : "",
                        }}
                     />
                  }
                  style={{
                     backgroundColor:
                        selectedMenuKey === "Profile" ? "#fafafa" : "inherit",
                     boxShadow:
                        selectedMenuKey === "Profile"
                           ? "0 20px 27px rgb(0 0 0 / 5%)"
                           : "inherit",
                     color:
                        selectedMenuKey === "Profile" ? "#1677ff" : "inherit", // Ganti warna teks saat diklik
                     fontWeight: "500", // Membuat teks tebal
                     textDecoration: "none", // Menghilangkan garis bawah atau decoration
                  }}
               >
                  <Link
                     to="/dashboard/Profile"
                     style={{ textDecoration: "none" }}
                  >
                     Profile
                  </Link>
               </Menu.Item> */}
            </Menu>
         </div>
         <div>
            <Menu
               theme="light"
               mode="inline"
               selectedKeys={[selectedMenuKey]}
               onClick={handleMenuClick}
            >
               {/* <Menu.Item
                  key="logout"
                  icon={<LogoutOutlined />}
                  // style={{
                  //    background: "transparent",
                  //    color:
                  //       key === selectedMenuKey
                  //          ? "#1677ff"
                  //          : item.textColor, // Ganti warna teks item sesuai keinginan // Ganti warna teks sesuai keinginan
                  //    fontWeight: "500",
                  // }}
               >
                  <Link onClick={handleLogoutClick}>Logout</Link>
               </Menu.Item> */}
               <div
                  style={{
                     marginBottom: "22px",
                     marginRight: "15px",
                     marginLeft: "15px",
                     display: "flex",
                  }}
               >
                  {/* <Button
                     style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        backgroundColor: "#1890ff",
                        border: "1px solid #1890ff", // Menambahkan outline biru
                     }}
                     disabled={loading}
                     onClick={handleLogoutClick}
                  >
                     <LogoutOutlined />
                     {loading ? <Spin size="small" /> : "Logout"}
                  </Button> */}
                  <CustomButton
                     loading={loading}
                     onClick={handleLogoutClick}
                     icon={<LogoutOutlined />}
                  >
                     Logout
                  </CustomButton>
               </div>
            </Menu>
         </div>
      </>
   );
};

const mapStateToProps = (state) => ({
   logoutSuccessRedirect: state.auth.logoutSuccessRedirect,
   loading: state.auth.loading,
   user: state.me.user,
});

const mapDispatchToProps = {
   logout: logOutRequest,
   userMeRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);

// export default MenuItems;
