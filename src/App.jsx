import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import AccountPage from "./pages/account";
import LoginPage from "./pages/login";
import EditPlan from "./pages/meal-plan";
import OnboardingVersionA from "./pages/onboardings/combined-version";
import OnboardingVersionB from "./pages/onboardings/separate-version";
import CheckoutStep from "./pages/onboardings/steps/checkout";
import AllOrdersPage from "./pages/order";
import OrderDetail from "./pages/order/detail";
import ProfilePage from "./pages/profile";
import ManageSubscription from "./pages/profile/manage-subscription";
import ReactivationPage from "./pages/reactivation";
import AuthRoute from "./route/AuthRoute";


function App() {
  const [navHeight, setNav] = useState(0);
  const isSubcriptionPage = window.location.pathname.includes("manage-subscription");
  useEffect(() => {
    let findNavHeight = (document.getElementById("outer-container")
        && document.getElementById("outer-container").clientHeight + 20)
      || "2rem";
    if (findNavHeight > 200 && !isSubcriptionPage) {
      findNavHeight = "2rem";
    } else {
      findNavHeight = 0;
    }
    setNav(findNavHeight);
  }, []);

  return (
    <div className="bg-container min-h-screen">
      <BrowserRouter>
        <Switch>
          <AuthRoute navHeight={navHeight} noHeader path="/checkout/:checkout_token" component={CheckoutStep} />
          <AuthRoute navHeight={navHeight} noHeader path="/a/signup" exact component={OnboardingVersionA} />
          <AuthRoute navHeight={navHeight} noHeader path="/b/signup" exact component={OnboardingVersionB} />
          <AuthRoute navHeight={navHeight} isHorizontalNav noHeader path="/login" component={LoginPage} />
          <AuthRoute navHeight={navHeight} isPrivate path="/orders" exact component={AllOrdersPage} />
          <AuthRoute navHeight={navHeight} isPrivate path="/orders/:id" exact component={OrderDetail} />
          <AuthRoute navHeight={navHeight} isPrivate path="/edit-plan/:id" component={EditPlan} />
          <AuthRoute navHeight={navHeight} isPrivate path="/profile" component={ProfilePage} />
          <AuthRoute navHeight={navHeight} isHorizontalNav noHeader isPrivate path="/manage-subscription" exact component={ManageSubscription} />
          <AuthRoute navHeight={navHeight} isPrivate path="/reactivate/:dog_id" exact component={ReactivationPage} />
          <AuthRoute navHeight={navHeight} isPrivate path="/unpause/:dog_id" exact component={ReactivationPage} />
          <AuthRoute navHeight={navHeight} isPrivate component={AccountPage} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, null)(App);
