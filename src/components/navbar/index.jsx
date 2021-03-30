import React from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import { authenticationActions, userActions } from "../../actions";
import cartImage from "../../assets/images/cart-icon.svg";
import bellImage from "../../assets/images/notification-icon.svg";
import "./style.css";

import { ReactComponent as NavbarLogo } from "../../assets/images/kabo-logo-nav.svg";
import NotificationsList from "../../pages/notifications/NotificationsList";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navStep: 0,
      mobileOpen: false,
      notificationsOpen: false,
    };
    this.setNav = this.setNav.bind(this);
    this.openMobile = this.openMobile.bind(this);
  }

  setNav(index) {
    this.setState({
      navStep: index,
    });
  }

  openMobile() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  }
  closeNotifications = () => {
    this.setState({ notificationsOpen: false });
  };

  componentDidMount() {
    const urlString = window.location.href;
    if (urlString.includes("store")) {
      this.setNav(2);
    } else if (urlString.includes("orders")) {
      this.setNav(3);
    } else if (urlString.includes("profile")) {
      this.setNav(4);
    } else if (urlString.includes("edit-plan")) {
      this.setNav(0);
    } else {
      if (urlString.includes("checkout/success")) return;
      this.setNav(1);
    }
    // this.props.getUserNotifications();
  }

  clickLogout() {
    this.props.logout();
    window.location.replace("/");
  }

  render() {
    const { user, logout } = this.props;
    const { navStep } = this.state;

    const active =
      "text-primary font-cooper font-bold text-white py-1 sm:py-2 rounded-md text-4xl font-medium";
    const inActive =
      "text-charcoal font-cooper hover:text-primary py-1 sm:py-2 rounded-md text-4xl font-medium";
    const mobileActive =
      "bg-primary text-white text-center px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium";
    const mobileInactive =
      "text-charcoal hover:bg-green-500 bg-mobileNav text-center  hover:text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm  font-medium";

    const loggedIn = user && user.token;
    console.log(navStep);

    return (
      <div className="md:w-4/12">
        <div className="flex md:flex-col items-center md:justify-between sm:items-stretch">
          <div className="md:hidden top-3 right-4 absolute">
            <Menu
              pageWrapId={"page-wrap"}
              noTransition={true}
              outerContainerId={"outer-container"}
              right
            >
              {loggedIn && (
                <>
                  <a id="home" className={navStep === 1 ? active : inActive} href="/">
                    My Kabo
                  </a>
                  <br />
                  <a id="orders" className={navStep === 3 ? active : inActive} href="/orders">
                    Orders
                  </a>
                  <br />
                  <a id="account" className={navStep === 4 ? active : inActive} href="/profile">
                    Account
                  </a>
                </>
              )}
              <a id="support" className={inActive} href="https://kabo.zendesk.com/hc/en-us">
                Support
              </a>
              <a id="blog" className={inActive} href="https://kabo.co/blog">
                Blog
              </a>

              {loggedIn && (
                <a
                  onClick={() => this.clickLogout()}
                  className="menu-item font-semibold text-sm"
                  href=""
                >
                  Logout
                </a>
              )}
            </Menu>
          </div>

          <nav
            className={`sticky p-7 mt-8 hidden md:block md:mr-5 lg:mr-10 w-full w-max-navbar max-h-navbar inset-x-0 top-0 py-4 px-6  md:top-12 left-9 bg-white z-50  md:rounded-xl md:shadow-lg`}
            id="outer-container"
          >
            <div className="flex-shrink-0 flex flex-col flex-wrap md:w-full left-0" id="page-wrap">
              <a href="/" className="self-start">
                <NavbarLogo className="block w-auto" />
              </a>
              {loggedIn && (
                <div className="hidden md:flex flex-col mt-2">
                  <a href="/" className={navStep === 1 ? active : inActive}>
                    My Kabo
                  </a>
                  {/* <a href="/store" className={navStep === 2 ? active : inActive}>Store</a> */}
                  <a href="/orders" className={navStep === 3 ? active : inActive}>
                    Orders
                  </a>
                  <a href="/profile" className={navStep === 4 ? active : inActive}>
                    Account
                  </a>
                  <a id="blog" className={inActive} href="https://kabo.co/blog">
                    Blog
                  </a>
                  <a
                    href="https://kabo.zendesk.com/hc/en-us"
                    className={`hidden md:block ${inActive}`}
                    target="_blank"
                  >
                    Support
                  </a>
                </div>
              )}
            </div>
            {loggedIn && (
              <div className="flex flex-row center md:mr-20 sm:mr-0">
                {this.props.user_notifications && this.props.user_notifications.length > 0 && (
                  <div
                    className="profile-box-icon"
                    onClick={() => this.setState({ notificationsOpen: true })}
                  >
                    <img src={bellImage} />
                    <span
                      className={
                        true ? "profile-box-unread-amount got-unread" : "profile-box-unread-amount"
                      }
                    >
                      2
                    </span>
                    {this.state.notificationsOpen && (
                      <NotificationsList
                        closeNotifications={this.closeNotifications}
                        loading_notifications={this.props.loading_notifications}
                        user_notifications={this.props.user_notifications}
                      />
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => this.clickLogout()}
                  className="hidden md:block font-messina font-semibold text-base md:pb-2 md:mt-6"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
        <div className="md:hidden pt-16 py-10 grid grid-cols-3 gap-4">
          <a href="/" className={navStep === 1 ? mobileActive : mobileInactive}>
            My Kabo
          </a>
          {/* <a href="/store" className={navStep === 2 ? active : inActive}>Store</a> */}
          <a href="/orders" className={navStep === 3 ? mobileActive : mobileInactive}>
            Orders
          </a>
          <a href="/profile" className={navStep === 4 ? mobileActive : mobileInactive}>
            Account
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(authenticationActions.login({ email, password })),
  logout: () => dispatch(authenticationActions.logout()),
  getNotifications: async () => dispatch(userActions.getNotificationsData()),
  getUserNotifications: () => dispatch(userActions.getUserNotifications()),
});

const mapStateToProps = (state) => {
  const { user, loading_notifications, user_notifications } = state.authentication;
  return {
    user,
    user_notifications,
    loading_notifications,
  };
};

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export { connectedNavbar as Navbar };
