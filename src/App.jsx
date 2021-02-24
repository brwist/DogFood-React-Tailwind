import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./utils";
import { PrivateRoute } from "./route";
import LoginPage from "./pages/login";
import AccountPage from "./pages/account";
import AllOrdersPage from "./pages/order";
import { Navbar } from "./components/navbar";
import { Alert } from "./components/alert";
import ProfilePage from "./pages/profile";
import EditPlan from "./pages/meal-plan";
import OrderDetail from "./pages/order/detail";
import Step1 from "./pages/on-boarding/step-1";
import Step2 from "./pages/on-boarding/step-2";
import Step3 from "./pages/on-boarding/step-3";
import Onboarding from "./pages/onboardings";

function App() {
  return (
    <main className="h-full bg-lightgray">
      <div className="h-full flex flex-col mx-auto ">
        <Navbar onBoarding />
        <Alert />
        <BrowserRouter>
          <Switch>
            <Route path="/onboarding/step-1" component={Step1} />
            <Route path="/onboarding/step-2" component={Step2} />
            <Route path="/onboarding/step-3" component={Step3} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/orders" exact component={AllOrdersPage} />
            <PrivateRoute path="/orders/:id" exact component={OrderDetail} />
            <PrivateRoute path="/edit-plan/:id" component={EditPlan} />
            <PrivateRoute path="/profile" component={ProfilePage} />

            <PrivateRoute component={AccountPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default connect(null, null)(App);
