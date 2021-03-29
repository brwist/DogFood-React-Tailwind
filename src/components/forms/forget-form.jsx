import React from "react";

const ForgetPasswordForm = ({
  handleChange,
  newPassword,
  confirmedPassword,
  authLoading,
  setAuthLoading,
  handleSubmit,
  errorMessage,
}) => (
  <form name="form" data-cy="login-form" onSubmit={handleSubmit}>
    <div>
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
          required
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
          required
          className="block w-full h-12 px-3 py-2  sm:mt-3 border border-solid border-gray-400 rounded-lg"
        />
        <p className="text-xs pt-1 hidden sm:block">Must match previous entry</p>
      </div>
    </div>
    <button
      data-cy="login-submit"
      type="submit"
      className={`w-full h-12 font-cooper bg-primary text-white rounded-xl mt-6 leading-8 text-base font-medium ${authLoading ? "flex justify-center items-center" : ""}`}
    >
      {authLoading ? <img src={Loader} className="w-9" /> : "Save Changes"}
    </button>
    <p className="text-red-700 text-center pt-2">{errorMessage}</p>
    <div className="flex justify-between">
      <div className="text-sm font-messina bg-lightBluePad w-full rounded-lg p-4 mt-5">
        <p>Need help? We're here for you </p>
        {" "}
        <a className="text-primary" href="mailto: help@kabo.co">
          help@kabo.co
        </a>
      </div>
    </div>
  </form>
);

export default ForgetPasswordForm;
