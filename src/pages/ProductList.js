import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";



const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Tag",
    dataIndex: "tag",
    sorter: (a, b) => a.tag.length - b.tag.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  // {
  //   title: "Edit",
  //   dataIndex: "edit",
  // },
  {
    title: "Delete",
    dataIndex: "delete",
  },
  // {
  //   title: "Energy",
  //   dataIndex: "energy",
  // },
  // {
  //   title: "Fat",
  //   dataIndex: "fat",
  // },
  // {
  //   title: "Saturates",
  //   dataIndex: "saturates",
  // },
  // {
  //   title: "Sugar",
  //   dataIndex: "sugar",
  // },
  // {
  //   title: "Salt",
  //   dataIndex: "salt",
  // },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      tag: productState[i].tag,
      price: `${productState[i].price}`,
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
      // edit: (
      //   <>
      //     <Link to={`/admin/product/${productState[i]._id}`}>
      //       <FiEdit3 size={"1.3em"} className="icon" />
      //     </Link>
      //   </>
      // ),
      delete: (
        <button
          className="bg-transparent border-0"
          onClick={() => showModal(productState[i]._id)}
        >
          <MdDeleteOutline size={"1.5em"} className="icon" />
        </button>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
