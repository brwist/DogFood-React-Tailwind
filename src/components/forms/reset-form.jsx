import React from "react";

const ResetPasswordForm = ({
  email, setEmail, authLoading, setAuthLoading, handleSubmit,
}) => (
  <form name="form" data-cy="login-form" onSubmit={handleSubmit}>
    <div>
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
          required
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full h-12 px-3 py-2 mt-1 sm:mt-2 border border-solid border-gray-400 rounded-lg"
        />
      </div>
    </div>
    <button
      data-cy="login-submit"
      type="submit"
      className={`w-full h-12 font-cooper bg-primary text-white rounded-xl mt-6 leading-8 text-base font-medium ${authLoading ? "flex justify-center items-center" : ""}`}
    >
      {authLoading ? <img src={Loader} className="w-9" /> : "Reset Password"}
    </button>
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

export default ResetPasswordForm;
