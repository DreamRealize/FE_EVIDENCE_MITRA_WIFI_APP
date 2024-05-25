import React, { useEffect, useState } from "react";
import MainTemplatePageCountainer from "../templates/MainTemplatePageCountainer";
import { Content } from "antd/es/layout/layout";
import { connect } from "react-redux";
import {
   theme,
   Card,
   Row,
   Col,
   Table,
   Pagination,
   Space,
   Button,
   Modal,
   Input,
   Select,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
   FilterOutlined,
   ColumnWidthOutlined,
   LeftOutlined,
   RightOutlined,
   EditOutlined,
   DeleteOutlined,
} from "@ant-design/icons";
import "../../assets/styles/main.css";
import { fetchMitraRequest } from "../../redux/actions/authActions";

const { Option } = Select;

const CustomPagination = ({ totalItems, pageSize, onPageChange, paging }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [inputPage, setInputPage] = useState(1);

   const handlePrev = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
         onPageChange(currentPage - 1);
      }
   };

   const handleNext = () => {
      const totalPages = Math.ceil(totalItems / pageSize);
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
         onPageChange(currentPage + 1);
      }
   };

   const handleInputChange = (e) => {
      setInputPage(e.target.value);
   };

   // const handleGoToPage = () => {
   //    const pageNumber = parseInt(inputPage);
   //    const totalPages = Math.ceil(totalItems / pageSize);

   //    if (pageNumber >= 1 && pageNumber <= totalPages) {
   //       setCurrentPage(pageNumber);
   //       onPageChange(pageNumber);
   //    }
   // };
   const handleGoToPage = () => {
      const pageNumber = parseInt(inputPage);
      const totalPages = Math.ceil(totalItems / pageSize);

      if (pageNumber >= 1 && pageNumber <= totalPages) {
         setCurrentPage(pageNumber);
         onPageChange(pageNumber);
      }
   };

   const handlePageSizeChange = (value) => {
      onPageChange(1); // Reset to page 1 when changing page size
      setCurrentPage(1); // Reset to page 1 when changing page size
      // You can perform actions here based on the selected page size (value)
   };

   const pageSizeOptions = [10, 20, 30, 40, 50];

   return (
      <Col>
         <Select defaultValue={`${pageSize}`} onChange={handlePageSizeChange}>
            {pageSizeOptions.map((size) => (
               <Option key={size} value={`${size}`}>
                  {size}
               </Option>
            ))}
         </Select>
         <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handlePrev}
            disabled={currentPage === 1}
            // style={{marginLeft:8}}
         />
         <span>
            <Input
               value={paging || "0"}
               style={{
                  width: 40,
                  marginLeft: 8,
                  textAlign: "center",
                  marginRight: 8,
               }}
               onChange={handleInputChange}
            />
            dari
            <Button
               style={{
                  marginLeft: 8,
                  marginRight: 8,
               }}
            >{`${Math.ceil(totalItems / pageSize)}`}</Button>
         </span>
         <Button
            type="text"
            icon={<RightOutlined />}
            onClick={handleNext}
            disabled={currentPage === Math.ceil(totalItems / pageSize)}
         />
         Halaman
         <Input
            style={{
               width: 40,
               marginLeft: 8,
               textAlign: "center",
            }}
            value={inputPage}
            onChange={handleInputChange}
         />
      </Col>
   );
};

// const columns = [
//    {
//       title: "Title",
//       dataIndex: "Title",
//    },
//    {
//       title: "Amount",
//       dataIndex: "InAmount",
//       render: (InAmount) => (
//          <span>
//             {new Intl.NumberFormat("id-ID", {
//                style: "currency",
//                currency: "IDR",
//             }).format(InAmount)}
//          </span>
//       ),
//       sorter: {
//          compare: (a, b) => a.InAmount - b.InAmount,
//       },
//    },
//    {
//       title: "Date",
//       dataIndex: "WaktuPemasukan",
//       render: (WaktuPemasukan) => (
//          <span>{new Date(WaktuPemasukan).toLocaleDateString("id-ID")}</span>
//       ),
//       sorter: {
//          compare: (a, b) =>
//             new Date(a.WaktuPemasukan) - new Date(b.WaktuPemasukan),
//       },
//    },
//    {
//       title: "Description",
//       dataIndex: "Deskripsi",
//       sorter: {
//          compare: (a, b) => a.english - b.english,
//          multiple: 1,
//       },
//    },
//    {
//       title: "Bank",
//       dataIndex: "jenisbankcategory",
//       render: (jenisbankcategory) => jenisbankcategory?.BankCategoryName || "-",
//    },
//    {
//       title: "Action",
//       dataIndex: "PemasukanID",
//       render: (PemasukanID) => (
//          <Space>
//             <Button
//                type="link"
//                icon={<EditOutlined />}
//                onClick={() => handleEdit(PemasukanID)}
//             ></Button>
//             <Button
//                style={{ color: "red" }}
//                type="link"
//                icon={<DeleteOutlined />}
//                onClick={() => handleDelete(PemasukanID)}
//             ></Button>
//          </Space>
//       ),
//    },
// ];

// const handleEdit = (PemasukanID) => {
//    // Implement edit logic here
//    console.log("Edit Pemasukan ID:", PemasukanID);
// };

// const handleDelete = (PemasukanID) => {
//    // Implement delete logic here
//    console.log("Delete Pemasukan ID:", PemasukanID);
// };
// const onChange = (pagination, filters, sorter, extra) => {
//    console.log("params", pagination, filters, sorter, extra);
// };

const mitraPage = ({ mitraData, fetchMitraRequest }) => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const [filterModalVisible, setFilterModalVisible] = useState(false);
   const [columnModalVisible, setColumnModalVisible] = useState(false);
   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
   const [selectedPemasukanID, setSelectedPemasukanID] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const pageSize = 10; // Jumlah item per halaman

   const totalItems = mitraData?.pageInfo?.total || 0; // Total jumlah data

   console.log(mitraData, "data");
   // console.log(fetchMitraRequest, "pemasukanreq");
   const handleEdit = (PemasukanID) => {
      // Implement edit logic here
      console.log("Edit Pemasukan ID:", PemasukanID);
   };

   const onChange = (pagination, filters, sorter, extra) => {
      console.log("params", pagination, filters, sorter, extra);
   };

   const onPageChange = (page) => {
      setCurrentPage(page);
      fetchMitraRequest(page);
   };

   const handleFilterClick = () => {
      setFilterModalVisible(true);
   };

   const handleColumnClick = () => {
      setColumnModalVisible(true);
   };

   const handleFilterModalCancel = () => {
      setFilterModalVisible(false);
   };

   //    const handleColumnModalCancel = () => {
   //       setColumnModalVisible(false);
   //    };

   //    const handleDelete = (pemasukanID) => {
   //       setSelectedPemasukanID(pemasukanID);
   //       console.log("Delete Pemasukan ID:", pemasukanID);
   //       setDeleteModalVisible(true);
   //    };

   //    const handleDeleteConfirm = async () => {
   //       await deleteorderRequest(selectedPemasukanID);
   //       setDeleteModalVisible(false);

   //       // Memuat ulang data setelah penghapusan berhasil
   //       // fetchMitraRequest(currentPage);

   //       // After deletion, check if we need to navigate back to the previous page
   //       const newTotalItems = totalItems - 1;
   //       const newTotalPages = Math.ceil(newTotalItems / pageSize);

   //       if (currentPage > newTotalPages) {
   //          // If the current page is beyond the new total pages, navigate back
   //          const newPage = newTotalPages || 1; // Ensure the new page is at least 1
   //          setCurrentPage(newPage);
   //          onPageChange(newPage);
   //       } else {
   //          // Otherwise, refresh the current page
   //          fetchMitraRequest(currentPage);
   //       }
   //    };

   //    const handleDeleteCancel = () => {
   //       setDeleteModalVisible(false);
   //    };

   // useEffect(() => {
   //    setCurrentPage(1); // Atur ulang ke halaman pertama saat terjadi perubahan data pemasukan
   //    fetchMitraRequest(1); // Panggil ulang data untuk halaman pertama
   // }, [mitraData]); // Pantau perubahan data pemasukan

   useEffect(() => {
      fetchMitraRequest(currentPage);
   }, [fetchMitraRequest]);

   //    useEffect(() => {
   //       if (deletePemasukanAct?.message === "Pemasukan deleted successfully") {
   //          // Reload data after successful deletion
   //          fetchMitraRequest(currentPage); // Reload current page
   //       }
   //    }, [currentPage, fetchMitraRequest]);
   // useEffect(() => {
   //    // Reload data after successful deletion
   //    if (selectedPemasukanID) {
   //       fetchMitraRequest(currentPage);
   //    }
   // }, [mitraData]);

   //    console.log(selectedPemasukanID, "tes1");
   console.log(mitraData, "tes2");
   //    console.log(deleteorderRequest, "tes3");
   //    console.log(deletePemasukanAct?.message, "tes4");
   // useEffect(() => {
   //    if (selectedPemasukanID !== null) {
   //      // Memuat ulang data setelah penghapusan berhasil
   //      fetchMitraRequest(currentPage);
   //    }
   //  }, [selectedPemasukanID, currentPage, fetchMitraRequest]);

   const columns = [
      {
         title: "ID Mitra",
         dataIndex: "usernameId",
      },
      {
         title: "Nama Mitra",
         dataIndex: "nama",
      },
      {
         title: "Status Account",
         dataIndex: "userRole",
         render: (userRole) => userRole?.idName || "-",
      },
      {
         title: "Orderan Masuk",
         dataIndex: "Order",
         render: (Order) => Order.length || "-",
      },
      {
         title: "Order with Evidence",
         dataIndex: "Eviden",
         render: (Eviden) => Eviden.length || "-",
      },
      {
         title: "Action",
         dataIndex: "PemasukanID",
         align: "center",
         render: (PemasukanID) => (
            <Space>
               {/* <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(PemasukanID)}
               ></Button> */}
               <Button
                  style={{ color: "red" }}
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(PemasukanID)}
               ></Button>
            </Space>
         ),
      },
   ];
   return (
      <>
         <MainTemplatePageCountainer
            TitleHeaderPage={"Mitra"}
            buttonName={"Create New Mitra"}
	    type={"primary"}
	    linked={"/dashboard/Mitra/create"}
            // type={"primary"}
            // linked={"/dashboard/Order/create"}
            //     linked={"/dashboard/Order"}
            TitleSecondHeaderPage={`total data di temukan ${mitraData.length}`}
         />
         <Content
            style={{
               margin: "24px 16px",
               padding: 0,
               minHeight: "68vh",
               width: "full",
               //        background: colorBgContainer,
               borderRadius: borderRadiusLG,
            }}
         >
            <Card>
               <Row justify="space-between" style={{ padding: "16px 0" }}>
                  <Col span={6}>
                     <Space>
                        <Button
                           icon={<FilterOutlined />}
                           onClick={handleFilterClick}
                        >
                           Filter
                        </Button>
                        <Button
                           icon={<ColumnWidthOutlined />}
                           onClick={handleColumnClick}
                        >
                           Columns
                        </Button>
                     </Space>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                     <CustomPagination
                        totalItems={totalItems}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        paging={mitraData?.pageInfo?.page}
                     />
                  </Col>
               </Row>
               <Table
                  columns={columns}
                  dataSource={mitraData}
                  onChange={onChange}
                  pagination={false}
               />
               <Row justify="end" style={{ padding: "16px 0" }}>
                  <Col span={12} style={{ textAlign: "right" }}>
                     <CustomPagination
                        totalItems={totalItems}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        paging={mitraData?.pageInfo?.page}
                     />
                  </Col>
               </Row>
            </Card>
            <Modal
               title="Filter Options"
               visible={filterModalVisible}
               onCancel={handleFilterModalCancel}
               footer={null}
               bodyStyle={{
                  height: "calc(108vh - 120px)",
                  overflowY: "auto",
               }}
               style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  position: "fixed",
                  width: "50%",
               }}
            >
               {/* Content of Filter Modal */}
               {/* Add your filter options here */}
               <p>Filter options content goes here...</p>
            </Modal>
            <Modal
               title="Column Options"
               visible={columnModalVisible}
               //        onCancel={handleColumnModalCancel}
               footer={null}
            >
               {/* Content of Column Modal */}
               {/* Add your column options here */}
               <p>Column options content goes here...</p>
            </Modal>
            {/* <Modal
               title="Delete Pemasukan"
               visible={deleteModalVisible}
               onOk={handleDeleteConfirm}
               onCancel={handleDeleteCancel}
            >
               <p>Are you sure you want to delete this pemasukan?</p>
            </Modal> */}
         </Content>
      </>
   );
};

const mapStateToProps = (state) => ({
   mitraData: state.mitra.mitra,
});

const mapDispatchToProps = (dispatch) => ({
   fetchMitraRequest: (page) => dispatch(fetchMitraRequest(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(mitraPage);
