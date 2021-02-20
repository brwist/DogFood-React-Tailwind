import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { authenticationActions } from '../../actions'

import { ReactComponent as NavbarLogo } from '../../assets/images/kabo-logo-nav.svg'


class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navStep: 0,
      mobileOpen: false
    }
    this.setNav = this.setNav.bind(this)
    this.openMobile = this.openMobile.bind(this)
  }

  setNav(index) {
    this.setState({
      navStep: index
    })
  }

  openMobile() {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    })
  }

  componentDidMount() {
    const urlString = window.location.href
    if (urlString.includes('store')) {
      this.setNav(2)
    } else if (urlString.includes('orders')) {
      this.setNav(3)
    } else if (urlString.includes('profile')) {
      this.setNav(4)
    } else if (urlString.includes('edit-plan')) {
      this.setNav(0)
    }
    else {
      this.setNav(1)
    }
  }

  clickLogout() {
    this.props.logout()
    window.location.replace('https://kabo.co/')
  }

  render() {
    const { user, logout } = this.props
    const { navStep } = this.state

    const active = "bg-primary text-white px-3 py-2 rounded-md text-sm font-medium"
    const inActive = "text-charcoal hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"

    const loggedIn = user && user.token
    return (
      <nav className="bg-white md:h-28">
        <div className="md:py-8 pt-8 pb-4">
          <div className="relative flex items-center justify-between">
            <div className="flex-1 flex-col md:flex-row flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <a href='/'>
                  <NavbarLogo className="block w-auto" />
                </a>
              </div>
              {loggedIn
                && (
                  <div>
                    <div className=" align-center mt-5 md:mt-0 sm:ml-6">
                      <div className="flex space-x-4">
                        <a href="/" className={navStep === 1 ? active : inActive}>My Kabo</a>
                        {/* <a href="/store" className={navStep === 2 ? active : inActive}>Store</a> */}
                        <a href="/orders" className={navStep === 3 ? active : inActive}>Orders</a>
                        <a href="/profile" className={navStep === 4 ? active : inActive}>Account</a>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            {loggedIn
              && (
                <button
                  type="button"
                  onClick={() => this.clickLogout()}
                  className="font-messina hidden md:block font-semibold text-base"
                >
                  Logout
                </button>
              )
            }
          </div>
        </div>
      </nav>
    )
  }
}


const mapDispatchToProps = (dispatch) => (
  {
    login: (email, password) => dispatch(authenticationActions.login({ email, password })),
    logout: () => dispatch(authenticationActions.logout()),
  }
)

const mapStateToProps = (state) => {
  const { user } = state.authentication
  return {
    user,
  }
}

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)
export { connectedNavbar as Navbar }
