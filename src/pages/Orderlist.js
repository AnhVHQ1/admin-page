import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import { getOrders } from "../features/auth/authSlice";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";

const nestedTable = [
  {
    title: "No",
    dataIndex: "pkey",
  },
  {
    title: "Product Name",
    dataIndex: "pname",
    // sorter: (a, b) => a.pname.length - b.pname.length,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    // sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Energy",
    dataIndex: "energy",
    // sorter: (a, b) => a.energy - b.energy,
  },
  // {
  //   title: "Fat",
  //   dataIndex: "fat",
  //   // sorter: (a, b) => a.fat - b.fat,
  // },
  // {
  //   title: "Saturates",
  //   dataIndex: "saturates",
  //   // sorter: (a, b) => a.saturates - b.saturates,
  // },
  // {
  //   title: "Sugar",
  //   dataIndex: "sugar",
  //   // sorter: (a, b) => a.sugar - b.sugar,
  // },
  // {
  //   title: "Salt",
  //   dataIndex: "salt",
  //     // sorter: (a, b) => a.salt - b.salt,
  // },
  {
    title: "Fat",
    dataIndex: "fat",
    render: (value, record) => (
      <span className={`fat-cell ${getClassByValue(value, "fat", record)}`}>
        {value}
      </span>
    ),
    align: "center",
  },
  {
    title: "Saturates",
    dataIndex: "saturates",
    render: (value, record) => (
      <span
        className={`saturates-cell ${getClassByValue(
          value,
          "saturates",
          record
        )}`}
      >
        {value}
      </span>
    ),
    align: "center",
  },
  {
    title: "Sugar",
    dataIndex: "sugar",
    render: (value, record) => (
      <span className={`sugar-cell ${getClassByValue(value, "sugar", record)}`}>
        {value}
      </span>
    ),
    align: "center",
  },
  {
    title: "Salt",
    dataIndex: "salt",
    render: (value, record) => (
      <span className={`salt-cell ${getClassByValue(value, "salt", record)}`}>
        {value}
      </span>
    ),
    align: "center",
  },
];
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Total",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
  },
  // {
  //   //Delivered, Ordered
  //   title: "Status",
  //   dataIndex: "status",
  // },
  {
    title: "Note",
    dataIndex: "note",
    sorter: (a, b) => a.note - b.note,
  },
];
// calculate total lights
// const calculateLightCounts = (nestedData) => {
//   const lightCounts = {
//     fat: { green: 0, yellow: 0, red: 0 },
//     saturates: { green: 0, yellow: 0, red: 0 },
//     sugar: { green: 0, yellow: 0, red: 0 },
//     salt: { green: 0, yellow: 0, red: 0 },
//   };

//   nestedData.forEach((data) => {
//     data.nestedTableData.forEach((item) => {
//       if (!item.isTotal) {
//         ['fat', 'saturates', 'sugar', 'salt'].forEach((nutrient) => {
//           const lightClass = getClassByValue(item[nutrient], nutrient, item);
//           if (lightClass) {
//             lightCounts[nutrient][lightClass]++;
//           }
//         });
//       }
//     });
//   })}

const getClassByValue = (value, nutrient, record) => {
  const isTotal = record && record.isTotal;
  if (!isTotal) {
    if (nutrient === "fat") {
      if (value < 3) return "green";
      else if (value >= 3 && value <= 17.5) return "yellow";
      else return "red";
    } else if (nutrient === "saturates") {
      if (value < 1.5) return "green";
      else if (value >= 1.5 && value <= 5) return "yellow";
      else return "red";
    } else if (nutrient === "sugar") {
      if (value < 5) return "green";
      else if (value >= 5 && value <= 22.5) return "yellow";
      else return "red";
    } else if (nutrient === "salt") {
      if (value < 0.3) return "green";
      else if (value >= 0.3 && value <= 1.5) return "yellow";
      else return "red";
    }
  }
  return "";
};

const Orderlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrders());
  }, []);

  const orderState = useSelector((state) => state.auth.orders);

  const nestedData = orderState.map((order, index) => {
    const nestedTableData = order.orderItems.map((item, idx) => ({
      pkey: idx + 1,
      pname: item.product.title,
      quantity: item.quantity,
      energy: item.product.nutrition.calories,
      fat: item.product.nutrition.fat,
      saturates: item.product.nutrition.saturatedFat,
      sugar: item.product.nutrition.sugar,
      salt: item.product.nutrition.salt,
      isTotal: false,
    }));

    // Calculate total values for each nutrient
    const totalNutrition = {
      energy: nestedTableData
        .reduce((total, item) => total + item.energy * item.quantity, 0)
        .toFixed(1),
      fat: nestedTableData
        .reduce((total, item) => total + item.fat * item.quantity, 0)
        .toFixed(1),
      saturates: nestedTableData
        .reduce((total, item) => total + item.saturates * item.quantity, 0)
        .toFixed(1),
      sugar: nestedTableData
        .reduce((total, item) => total + item.sugar * item.quantity, 0)
        .toFixed(1),
      salt: nestedTableData
        .reduce((total, item) => total + item.salt * item.quantity, 0)
        .toFixed(1),
    };

    // Add separate rows for each total nutritional value
    Object.entries(totalNutrition).forEach(([nutrient, totalValue], index) => {
      nestedTableData.push({
        pname: (
          <span className="total-values">
            Total {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
          </span>
        ),
        quantity: <span className="total-values">{totalValue}</span>,
        energy: "",
        fat: "",
        saturates: "",
        sugar: "",
        salt: "",
        isTotal: true,
      });
    });

    // const lightCounts = calculateLightCounts([{ nestedTableData }]);
    // // Add separate rows for light counts
    // ["fat", "saturates", "sugar", "salt"].forEach((nutrient) => {
    //   nestedTableData.push({
    //     pname: (
    //       <span className="total-values">
    //         {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} Green
    //       </span>
    //     ),
    //     quantity: (
    //       <span className="total-values">{lightCounts[nutrient].green}</span>
    //     ),
    //     energy: "",
    //     fat: "",
    //     saturates: "",
    //     sugar: "",
    //     salt: "",
    //     isTotal: true,
    //   });
    //   nestedTableData.push({
    //     pname: (
    //       <span className="total-values">
    //         {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} Yellow
    //       </span>
    //     ),
    //     quantity: (
    //       <span className="total-values">{lightCounts[nutrient].yellow}</span>
    //     ),
    //     energy: "",
    //     fat: "",
    //     saturates: "",
    //     sugar: "",
    //     salt: "",
    //     isTotal: true,
    //   });
    //   nestedTableData.push({
    //     pname: (
    //       <span className="total-values">
    //         {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} Red
    //       </span>
    //     ),
    //     quantity: (
    //       <span className="total-values">{lightCounts[nutrient].red}</span>
    //     ),
    //     energy: "",
    //     fat: "",
    //     saturates: "",
    //     sugar: "",
    //     salt: "",
    //     isTotal: true,
    //   });
    // });

    return {
      key: index + 1,
      nestedTableData: nestedTableData,
    };
  });
  const customExpandIcon = ({ expanded, onExpand, record }) => (
    <div onClick={(e) => onExpand(record, e)}>
      {expanded ? <CiCircleChevUp /> : <CiCircleChevDown />}
    </div>
  );
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div className="order-table">
        <Table
          columns={columns}
          dataSource={orderState.map((order, index) => ({
            key: index + 1,
            email: order.user.email,
            phone: order.user.mobile,
            address: `${order.shippingInfo.address}, ${order.shippingInfo.district} ${order.shippingInfo.city}, ${order.shippingInfo.country}`,
            total: "$"+order.totalPriceWithShipping,
            status: order.orderStatus,
            note: order.shippingNote,
          }))}
          expandable={{
            rowExpandable: (record) => record,
            expandedRowRender: (record) => (
              <div className="nested-table">
                <Table
                  columns={nestedTable}
                  dataSource={
                    nestedData.find((data) => data.key === record.key)
                      ?.nestedTableData || []
                  }
                  pagination={false}
                />
              </div>
            ),
            expandIcon: customExpandIcon,
          }}
        />
      </div>
    </div>
  );
};

export default Orderlist;
