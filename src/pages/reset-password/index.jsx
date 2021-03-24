import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../assets/images/buttonLoader.svg";
import Button from "../../components/global/button";
import Layout from "../../components/layout";

const ForgetPasswordForm = ({
  handleChange,
  newPassword,
  confirmedPassword,
  authLoading,
  setAuthLoading,
  handleSubmit,
}) => (
  <form name="form" data-cy="login-form" onSubmit={handleSubmit}>
    <div className="">
      <div className="w-full">
        <label
          htmlFor="new-password"
          className="leading-snug text-medium font-messina font-semibold text-black"
        >
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          id="new-password"
          value={newPassword}
          onChange={handleChange}
          className="block w-full h-12 px-3 py-2 sm:mt-3 border border-solid border-gray-400 rounded-lg"
        />
      </div>
      <div className="w-full pt-6">
        <label
          htmlFor="confirm-new-password"
          className="leading-snug text-medium font-messina font-semibold text-black"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmedPassword"
          id="confirm-new-password"
          value={confirmedPassword}
          onChange={handleChange}
          className="block w-full h-12 px-3 py-2  sm:mt-3 border border-solid border-gray-400 rounded-lg"
        />
        <p className="text-xs pt-1 hidden sm:block">Must match previous entry</p>
      </div>
    </div>
    <button
      data-cy="login-submit"
      type="submit"
      className={`w-full h-12 font-cooper bg-primary text-white rounded-xl mt-6 leading-8 text-base font-medium ${
        authLoading ? "flex justify-center items-center" : ""
      }`}
    >
      {authLoading ? <img src={Loader} className="w-9" /> : "Save Changes"}
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
const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({ newPassword: "", confirmedPassword: "" });
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [authLoading, setAuthLoading] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordChanged(true);
  };
  return (
    <Layout>
      <div className="login md:mt-28 sm:mt-23 pt-40 sm:pt-0 w-full mb-5 md:mb-12">
        <div className="w-full md:w-3/5 max-w-664 mx-auto">
          <div className="bg-white px-8 py-7 sm:py-1 sm:px-12 sm:py-8 rounded-lg shadow-formGray">
            <h2 className={`text-2xl sm:text-4xl ${passwordChanged ? "pb-2" : "pb-4 sm:pb-5"} font-cooper`}>
              {passwordChanged ? "Changes saved" : "Reset Your Password"}
            </h2>
            {!passwordChanged && (
              <ForgetPasswordForm
                handleChange={handleChange}
                newPassword={formData.newPassword}
                confirmedPassword={formData.confirmedPassword}
                email={email}
                setEmail={setEmail}
                authLoading={authLoading}
                setAuthLoading={setAuthLoading}
                handleSubmit={handleSubmit}
              />
            )}
            {passwordChanged && (
              <div>
                <p className="font-messina text-sm font-normal">Your Password has been reset.</p>
                <button
                  onClick={() => history.push("/login")}
                  type="button"
                  className="w-full h-12 font-cooper bg-primary text-white rounded-xl mt-7 leading-8 text-base font-medium"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
