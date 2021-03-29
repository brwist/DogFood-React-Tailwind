import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Alert } from "../components/alert";
import { LoginNav } from "../components/navbar/login-nav";
import { HorizontalNav } from "../components/navbar/horizontal-nav";
import { Navbar } from "../components/navbar";

const AuthRoute = ({
  isPrivate,
  noHeader,
  loginNav,
  Component,
  isHorizontalNav,
  navHeight,
  ...rest
}) => {
  const user = !!localStorage.getItem("user");

  if (isPrivate && !user) return <Redirect to="/login" />;
  if (!isPrivate && user) return <Redirect to="/" />;

  return (
    <>
      {isHorizontalNav && <HorizontalNav isPrivate={isPrivate} />}
      <div className="container flex mx-auto">
        {!noHeader && <Navbar />}
        <Alert />
        <div
          style={{ marginTop: navHeight }}
          className="page-content w-full md:ml-10 bg-container relative"
        >
          <div className="page-routing">
            {!isPrivate && <Route {...rest} render={(props) => <Component {...props} />} />}
            {isPrivate && <Route {...rest} render={(props) => <Component {...props} />} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRoute;
