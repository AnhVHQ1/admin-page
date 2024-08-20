import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import productReducer from "../features/product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";
// import customerReducer from "../features/customers/customerSlice";
// import bCategoryReducer from "../features/bcategory/bcategorySlice";
// import blogReducer from "../features/blogs/blogSlice";
// import enquiryReducer from "../features/enquiry/enquirySlice";
// import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    product: productReducer,
    upload: uploadReducer,
    // customer: customerReducer,
    // bCategory: bCategoryReducer,
    // blogs: blogReducer,
    // enquiry: enquiryReducer,
    // coupon: couponReducer,
  },
});
