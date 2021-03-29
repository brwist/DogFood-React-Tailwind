import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../assets/images/buttonLoader.svg";
import Button from "../../components/global/button";
import Layout from "../../components/layout";
import ForgetPasswordForm from "../../components/forms/forget-form";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({ newPassword: "", confirmedPassword: "" });
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [authLoading, setAuthLoading] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const otherField = Object.keys(formData).filter((key) => key !== e.target.name);
    if (e.target.value === formData[otherField[0]]) {
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      setPasswordChanged(true);
    }
  };
  return (
    <Layout>
      <div className="login md:mt-28 sm:mt-23 pt-40 sm:pt-0 w-full mb-5 md:mb-12">
        <div className="w-full md:w-3/5 max-w-664 mx-auto">
          <div className="bg-white px-8 py-7 sm:py-1 sm:px-12 sm:py-8 rounded-lg shadow-light">
            <h2
              className={`text-2xl sm:text-4xl ${
                passwordChanged ? "pb-2" : "pb-4 sm:pb-5"
              } font-cooper`}
            >
              {passwordChanged ? "Changes saved" : "Reset Your Password"}
            </h2>
            {passwordChanged ? (
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
            ) : (
              <ForgetPasswordForm
                handleChange={handleChange}
                newPassword={formData.newPassword}
                confirmedPassword={formData.confirmedPassword}
                email={email}
                setEmail={setEmail}
                authLoading={authLoading}
                setAuthLoading={setAuthLoading}
                handleSubmit={handleSubmit}
                error={error}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
