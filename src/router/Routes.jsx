import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import NotFoundPage from "../components/pages/NotFoundPage";
import LoginPage from "../components/pages/LoginPage";
import DashBoard from "../components/pages/DashBoard";
import DashBoardPage from "../components/pages/DashBoardPage";
import CatgeoryServices from "../components/pages/CatgeoryServices";
import OrderPage from "../components/pages/OrderPage";
import CreateOrderPage from "../components/pages/CreateOrderPage";
import OrderMitraPage from "../components/pages/orderMitraPage";
import UpdateOrderPage from "../components/pages/UpdateOrderPage";
import EvidencePage from "../components/pages/evidencePage";
import CreateEvidenPage from "../components/pages/CreateEvidenPage";
import EvidenceMitraPage from "../components/pages/EvidenceMitraPage";
import MitraPage from "../components/pages/mitraPage";
import CreateMitraPage from "../components/pages/CreateMitraPage";
import UpdateEvidenceAdmin from "../components/pages/UpdateEvidenceAdmin";
const Routes = () => {
   return useRoutes([
      { path: "/404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/login", element: <LoginPage /> },
      {
         path: "/dashboard",
         element: <DashBoardPage />,
         children: [
            {
               path: "Overview",
               element: <DashBoard />,
            },
            {
               path: "Services",
               element: <CatgeoryServices />,
            },
            {
               path: "Order",
               element: <OrderPage />,
            },
            {
               path: "Order/create",
               element: <CreateOrderPage />,
            },
            {
               path: "NewOrder",
               element: <OrderMitraPage />,
            },
            {
               path: "NewOrder/edit/:idOrder",
               element: <UpdateOrderPage />,
            },
            {
               path: "Evidence",
               element: <EvidencePage />,
            },
            {
               path: "Evidence/create",
               element: <CreateEvidenPage />,
            },
            {
               path: "EvidenceMitra",
               element: <EvidenceMitraPage />,
            },
            {
               path: "EvidenceMitra/edit/:idEviden",
               element: <UpdateEvidenceAdmin />,
            },
            {
               path: "Mitra",
               element: <MitraPage />,
            },
            {
               path: "Mitra/create",
               element: <CreateMitraPage />,
            },
         ],
      },
      {
         path: "/",
         element: <Navigate to="/login" replace />,
      },
   ]);
};

export default Routes;
