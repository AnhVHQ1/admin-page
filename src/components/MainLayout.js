import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { TbBrandMcdonalds } from "react-icons/tb";
import { PiBowlFoodFill } from "react-icons/pi";
import { SlDirection } from "react-icons/sl";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoMdRestaurant } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";


const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#ffffff"; // Example color
  const borderRadiusLG = "8px"; // Example border radius
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="lg-logo">Gusteau</div>
        <div>
          <IoMdRestaurant className="sm-logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard />,
              label: "Dashboard",
            },
            {
              key: "category-menu",
              icon: <SlDirection />,
              label: "Category",
              children: [
                {
                  key: "category",
                  icon: <IoMdAddCircleOutline />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <CiViewList />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "brand-menu",
              icon: <TbBrandMcdonalds />,
              label: "Brand",
              children: [
                {
                  key: "brand",
                  icon: <IoMdAddCircleOutline />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <CiViewList />,
                  label: "Brand List",
                },
              ],
            },
            {
              key: "product-menu",
              icon: <PiBowlFoodFill />,
              label: "Product",
              children: [
                {
                  key: "product",
                  icon: <IoMdAddCircleOutline />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <CiViewList />,
                  label: "Product List",
                },
              ],
            },
            {
              key: "order",
              icon: <IoBagCheckOutline />,
              label: "Orders",
            },
            {
              key: "signout",
              icon: <VscSignOut />,
              label: "Signout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <FaAnglesRight /> : <FaAnglesLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "var(--color-3)",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <ToastContainer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
