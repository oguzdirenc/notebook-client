import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/securityActions";
import "../style/navbar.css";

class Navbar extends Component {
  state = {};

  handleLogout = () => {
    this.props.logout();
    window.location.href = "/";
  };

  handleHome = () => {
    window.location.href = "/allList";
  };

  render() {
    return (
      <Menu className="navbar-background">
        <Menu.Item name="Home" onClick={this.handleHome}>
          Home
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            className="navbar-text-style"
            onClick={this.handleItemClick}
          >
            Welcome, {this.props.security.user.fullName}
          </Menu.Item>
          <Menu.Item name="logout" onClick={this.handleLogout}>
            Logout
            <Icon
              className="logout-icon"
              size="large"
              name="share square"
            ></Icon>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  const { security } = state;

  return { security: security };
};
export default connect(mapStateToProps, {
  logout,
})(Navbar);
