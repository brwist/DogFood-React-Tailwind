import React, { useState } from "react";
import Loader from "../../assets/images/buttonLoader.svg";
import Button from "../../components/global/button";
import Layout from "../../components/layout";

const ResetPasswordForm = ({
  email, setEmail, authLoading, setAuthLoading, handleSubmit,
}) => (
  <form name="form" data-cy="login-form" onSubmit={handleSubmit}>
    <div className="">
      <div className="w-full">
        <label
          htmlFor="email"
          className="leading-snug text-medium font-messina font-semibold text-black"
        >
          Email
        </label>
        <input
          data-cy="login-email"
          type="email"
          name="email"
          id="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full h-12 px-3 py-2 mt-1 sm:mt-2 border border-solid border-gray-400 rounded-lg"
        />
      </div>
    </div>
    <button
      data-cy="login-submit"
      type="submit"
      className={`w-full h-12 font-cooper bg-primary text-white rounded-xl mt-6 leading-8 text-base font-medium ${
        authLoading ? "flex justify-center items-center" : ""
      }`}
    >
      {authLoading ? <img src={Loader} className="w-9" /> : "Reset Password"}
    </button>
    <div className="flex justify-between">
      <div className="text-sm font-messina bg-lightBlue w-full rounded-lg p-4 mt-5">
        <p>Need help? Email us at </p>
        {" "}
        <a className="text-primary" href="mailto: help@kabo.co">
          help@kabo.co
        </a>
      </div>
    </div>
  </form>
);
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [authLoading, setAuthLoading] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };
  return (
    <Layout>
      <div className="login md:mt-28 sm:mt-23 pt-40 sm:pt-0 w-full mb-5 md:mb-12">
        <div className="w-full md:w-3/5 max-w-664 mx-auto">
          <div className="bg-white px-8 py-10 sm:py-1 sm:px-12 sm:py-8 rounded-lg shadow-formGray">
            <h2 className="text-2xl sm:text-4xl pb-2 font-cooper">Forgot Your Password?</h2>
            {!emailSent && (
              <ResetPasswordForm
                email={email}
                setEmail={setEmail}
                authLoading={authLoading}
                setAuthLoading={setAuthLoading}
                handleSubmit={handleSubmit}
              />
            )}
            {emailSent && <p className="font-messina text-sm">An email has been sent.</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
