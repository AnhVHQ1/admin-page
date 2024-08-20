import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, getAProduct, resetState, updateProduct } from "../features/product/productSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title Is Required"),
  description: yup.string().required("Description Is Required"),
  price: yup.number().required("Price Is Required"),
  brand: yup.string().required("Brand Is Required"),
  category: yup.string().required("Category Is Required"),
  tag: yup.string().required("Tag Is Required"),
  quantity: yup.number().required("Quantity Is Required"),
  nutrition: yup.object().shape({
    servingSize: yup.string().required("Serving Size Is Required"),
    calories: yup.number().required("Calories Is Required"),
    fat: yup.number().required("Fat Is Required"),
    saturatedFat: yup.number().required("Saturated Fat Is Required"),
    sugar: yup.number().required("Sugar Is Required"),
    salt: yup.number().required("Salt Is Required"),
  }),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);
  // const getProductId = location.pathname.split("/")[3];


  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  // useEffect(() => {
  //   if (getProductId !== undefined) {
  //     dispatch(getAProduct(getProductId));
  //   } else {
  //     dispatch(resetState());
  //   }
  // }, [getProductId]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    singleProduct,
    updatedProduct,
  } = newProduct;
  //toast
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    // if (isSuccess && updatedProduct !== undefined) {
    //   toast.success("Product Updated Successfullly!");
    //   navigate("/admin/product-list");
    // }
  }, [isSuccess, isError, isLoading, updatedProduct]);

  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tag: "",
      quantity: "",
      nutrition: {
        servingSize: "",
        calories: "",
        fat: "",
        saturatedFat: "",
        sugar: "",
        salt: "",
      },
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getProductId !== undefined) {
      //   const data = { id: getProductId, productData: values };
      //   dispatch(updateProduct(data));
      //   dispatch(resetState());
      // } else {
        // alert(JSON.stringify(values));
        console.log(values);
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  // }
);
  // if (singleProduct && !formik.values.title) {
  //   formik.setValues({
  //     title: singleProduct.title || "",
  //     description: singleProduct.description || "",
  //     price: singleProduct.price || "",
  //     brand: singleProduct.brand || "",
  //     category: singleProduct.category || "",
  //     tag: singleProduct.tag || "",
  //     quantity: singleProduct.quantity || "",
  //     nutrition: {
  //       servingSize: singleProduct.nutrition?.servingSize || "",
  //       calories: singleProduct.nutrition?.calories || "",
  //       fat: singleProduct.nutrition?.fat || "",
  //       saturatedFat: singleProduct.nutrition?.saturatedFat || "",
  //       sugar: singleProduct.nutrition?.sugar || "",
  //       salt: singleProduct.nutrition?.salt || "",
  //     },
  //   });
  // }
  
  return (
    <div>
      <h3 className="mb-4 title">
        {/* {getProductId !== undefined ? "Edit" : "Add"}  */}
        Add Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* Title */}
          <h6 className="mb-0">Product Title</h6>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="title"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          {/* Description */}
          <h6 className="mb-0">Description</h6>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={(value) => formik.setFieldValue("description", value)}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* Price */}
          <h6 className="mb-0">Product Price</h6>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          {/* Brand */}
          <h6 className="mb-0">Product Brand</h6>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
            title="Select Brand"
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          {/* Category */}
          <h6 className="mb-0">Product Category</h6>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
            title="Select Category"
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          {/* Tag */}
          <h6 className="mb-0">Product Tag</h6>
          <select
            name="tag"
            onChange={formik.handleChange("tag")}
            onBlur={formik.handleBlur("tag")}
            value={formik.values.tag}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Featured Deal</option>
            <option value="popular">Popular Picks</option>
            <option value="limited">Limited Stock</option>
            <option value="standard">Standard Products</option>
          </select>
          <div className="error">{formik.touched.tag && formik.errors.tag}</div>
          {/* Nutrition */}
          <div className="mb-3 inline-block">
            <h5 className="mb-0">Nutrition Information</h5>

            {/* Serving size */}
            <p className="mb-0 mt-3">Serving Size</p>
            <CustomInput
              type="text"
              label="Serving Size"
              name="nutrition.servingSize"
              onChng={formik.handleChange("nutrition.servingSize")}
              onBlr={formik.handleBlur("nutrition.servingSize")}
              val={formik.values.nutrition.servingSize}
            />
            <div className="error">
              {formik.touched.nutrition?.servingSize &&
                formik.errors.nutrition?.servingSize}
            </div>
            {/* Calory */}
            <p className="mb-0 mt-3">Calory</p>
            <CustomInput
              type="number"
              label="Calory (kcal)"
              name="nutrition.calories"
              onChng={formik.handleChange("nutrition.calories")}
              onBlr={formik.handleBlur("nutrition.calories")}
              val={formik.values.nutrition.calories}
            />
            <div className="error">
              {formik.touched.nutrition?.calories &&
                formik.errors.nutrition?.calories}
            </div>
            {/* Fat */}
            <p className="mb-0 mt-3">Fat</p>
            <CustomInput
              type="number"
              label="Fat (gram)"
              name="nutrition.fat"
              onChng={formik.handleChange("nutrition.fat")}
              onBlr={formik.handleBlur("nutrition.fat")}
              val={formik.values.nutrition.fat}
            />
            <div className="error">
              {formik.touched.nutrition?.fat && formik.errors.nutrition?.fat}
            </div>
            {/* Saturated Fat */}
            <p className="mb-0 mt-3">Saturated Fat</p>
            <CustomInput
              type="number"
              label="Saturated Fat (gram)"
              name="nutrition.saturatedFat"
              onChng={formik.handleChange("nutrition.saturatedFat")}
              onBlr={formik.handleBlur("nutrition.saturatedFat")}
              val={formik.values.nutrition.saturatedFat}
            />
            <div className="error">
              {formik.touched.nutrition?.saturatedFat &&
                formik.errors.nutrition?.saturatedFat}
            </div>
            {/* Sugar */}
            <p className="mb-0 mt-3">Sugar</p>
            <CustomInput
              type="number"
              label="Sugar (gram)"
              name="nutrition.sugar"
              onChng={formik.handleChange("nutrition.sugar")}
              onBlr={formik.handleBlur("nutrition.sugar")}
              val={formik.values.nutrition.sugar}
            />
            <div className="error">
              {formik.touched.nutrition?.sugar &&
                formik.errors.nutrition?.sugar}
            </div>

            {/* Salt */}
            <p className="mb-0 mt-3">Salt</p>
            <CustomInput
              type="number"
              label="Salt (gram)"
              name="nutrition.salt"
              onChng={formik.handleChange("nutrition.salt")}
              onBlr={formik.handleBlur("nutrition.salt")}
              val={formik.values.nutrition.salt}
            />
            <div className="error">
              {formik.touched.nutrition?.salt && formik.errors.nutrition?.salt}
            </div>
          </div>

          {/* Quantity */}
          <h6 className="mb-0">Quantity</h6>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          {/* Image */}
          <h6 className="mb-0">Image</h6>
          <div className="drop-zone p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              console.log("img Stateffff: " + imgState);
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" className="upload-img" />
                </div>
              );
            })}
          </div>
          <button className="button" type="submit" title="Add Product">
            {/* {getProductId !== undefined ? "Edit" : "Add"}  */}
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
