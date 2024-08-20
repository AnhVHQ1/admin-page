import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#739072", minHeight: "100vh" }}>
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          <CustomInput type="password" label="Email Address" id="email" />
          <br />
          <button
            className="border-0 px-3 py-2 text-white w-100"
            style={{ background: "#739072" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
