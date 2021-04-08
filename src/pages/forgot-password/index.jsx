import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../actions";
import ResetPasswordForm from "../../components/forms/reset-form";
import Layout from "../../components/layout";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const {
    authentication: { forgetPassword },
  } = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [authLoading, setAuthLoading] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticationActions.forgetPassword({ email }));
  };
  return (
    <Layout>
      <div className="login md:mt-28 sm:mt-23 pt-40 sm:pt-0 w-full mb-5 md:mb-12">
        <div className="w-full md:w-3/5 max-w-664 mx-auto">
          <div className="bg-white px-8 py-10 sm:py-1 sm:px-12 sm:py-8 rounded-lg shadow-light">
            <h2 className="text-2xl sm:text-4xl pb-2 font-cooper">
              {forgetPassword.success ? "Please check your email" : "Forgot Your Password?"}
            </h2>
            {forgetPassword.success ? (
              <p className="font-messina text-sm">
                If your email is valid, you will receive a email from us.
              </p>
            ) : (
              <ResetPasswordForm
                email={email}
                setEmail={setEmail}
                authLoading={authLoading}
                setAuthLoading={setAuthLoading}
                handleSubmit={handleSubmit}
                errorMessage={forgetPassword.errorMessage}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
