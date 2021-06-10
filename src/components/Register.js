import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { userRegisterUrl } from "../api/constants";
import { connect } from "react-redux";
import "../style/register.css";

class Register extends Component {
  state = {
    newUser: {
      username: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
    errors: [],
  };

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/allList");
    }
  }

  handleRegister = async () => {
    try {
      await axios.post(userRegisterUrl, this.state.newUser).then((response) => {
        this.props.history.push("/");
        this.setState({
          errors: [],
        });
      });
    } catch (error) {
      this.setState({
        errors: error.response.data,
      });
    }
  };

  render() {
    return (
      <div>
        <Grid
          className="main-color"
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.newUser.username}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        username: event.target.value,
                      },
                    })
                  }
                />

                <Form.Input
                  className="errorInput"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Fullname"
                  value={this.state.newUser.fullName}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        fullName: event.target.value,
                      },
                    })
                  }
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.newUser.password}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        password: event.target.value,
                      },
                    })
                  }
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  value={this.state.newUser.confirmPassword}
                  onChange={(event) =>
                    this.setState({
                      newUser: {
                        ...this.state.newUser,
                        confirmPassword: event.target.value,
                      },
                    })
                  }
                />
                {this.state.errors.message ? (
                  <h5 className="errorMessage">*{this.state.errors.message}</h5>
                ) : (
                  ""
                )}

                <Button
                  className="register-button-color"
                  fluid
                  size="large"
                  onClick={this.handleRegister}
                >
                  Kayıt Ol
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, null)(Register);
