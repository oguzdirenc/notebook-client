import axios from "axios";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Item,
  Label,
  List,
  Message,
  Modal,
  Popup,
  Segment,
} from "semantic-ui-react";
import { todoId } from "../redux/actions/todoIdAction";
import {
  errorMessage,
  getUserTodoListsUsrl,
  saveTodoListUrl,
} from "../api/constants";
import "../style/allLists.css";

class AllLists extends Component {
  state = {
    saveModalOpen: false,
    todoListHeader: "",
    todoListDescription: "",
    sharedUsers: [],
    sharedUsersName: "",
    errors: [],
    errorMessage: "",
    todoLists: [],
  };

  componentDidMount() {
    axios
      .get(getUserTodoListsUsrl)
      .then((response) => this.setState({ todoLists: response.data }));
  }

  handleSaveButton = async () => {
    if (!_.isEmpty(this.state.sharedUsersName)) {
      await this.setState({
        sharedUsers: [...this.state.sharedUsers, this.state.sharedUsersName],
      });
    }

    let saveList = {
      todoListName: this.state.todoListHeader,
      todoListDescription: this.state.todoListDescription,
      usernameList: this.state.sharedUsers,
    };

    await axios
      .post(saveTodoListUrl, saveList)
      .then((response) => {
        console.log("res");
        this.setState({
          saveModalOpen: false,
          sharedUsersName: "",
          sharedUsers: [],
          todoListDescription: "",
          todoListHeader: "",
          errors: [],
        });
        response
          ? console.log(response.data)
          : this.setState({ errorMessage: errorMessage });
      })
      .catch((error) => {
        this.setState({ errors: error.response.data, sharedUsersName: "" });
      });

    axios
      .get(getUserTodoListsUsrl)
      .then((response) => this.setState({ todoLists: response.data }));
  };

  handleSaveModalClose = () => {
    this.setState({
      saveModalOpen: false,
      sharedUsersName: "",
      sharedUsers: [],
      todoListDescription: "",
      todoListHeader: "",
      errors: [],
    });
  };

  hadleSaveListModal = () => {
    return (
      <Modal
        size="small"
        closeIcon
        open={this.state.saveModalOpen}
        onClose={this.handleSaveModalClose}
      >
        <Header content="Create new todo list" />
        <Modal.Content>
          <Form>
            <div className="input">
              <label className="label-list">Header</label>
              <Input
                className={"input-width"}
                value={this.state.todoListHeader}
                onChange={(event) =>
                  this.setState({ todoListHeader: event.target.value })
                }
                placeholder="Enter todo list header..."
              />
            </div>
            {this.state.errors.todoListName ? (
              <h6 className="todoList-validation-error">
                Header field cannot be blank
              </h6>
            ) : (
              ""
            )}
            <div className="input">
              <label className="label-list">Description</label>
              <Input
                className={"input-width"}
                value={this.state.todoListDescription}
                onChange={(event) =>
                  this.setState({ todoListDescription: event.target.value })
                }
                placeholder="Enter todo list description..."
              />
            </div>
            <div className="input">
              <label className="label-list">Shared users</label>
              <Input
                className={"input-width"}
                value={this.state.sharedUsersName}
                onChange={(event) =>
                  this.setState({
                    sharedUsersName: event.target.value,
                  })
                }
                placeholder="Enter users to share..."
              />

              <Button
                onClick={() => {
                  this.setState({
                    sharedUsers: [
                      ...this.state.sharedUsers,
                      this.state.sharedUsersName,
                    ],
                    sharedUsersName: "",
                  });
                }}
              >
                +
              </Button>
            </div>
            {this.state.sharedUsers.map((user) => (
              <Label key={user} as="a">
                {user}
                <Icon
                  onClick={() => {
                    let filteredUsers = this.state.sharedUsers.filter(
                      (username) => username !== user
                    );
                    this.setState({ sharedUsers: filteredUsers });
                  }}
                  name="delete"
                />
              </Label>
            ))}
          </Form>
        </Modal.Content>
        <Button
          positive
          className="save-list-button"
          onClick={this.handleSaveButton}
        >
          Save
        </Button>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={9}>
              <Segment raised className="all-list-segment">
                <Button
                  primary
                  className="create-list-button"
                  onClick={() => this.setState({ saveModalOpen: true })}
                >
                  <Icon name="plus" />
                  New Todo List
                </Button>

                {_.isEmpty(this.state.todoLists) ? (
                  <Message className="todoList-empty-message">
                    <Message.Header className="emptyList-message-header">
                      <Icon name="attention" size="large"></Icon>To do list is
                      empty
                    </Message.Header>
                    <p className="emptyList-message-p">
                      To add some item in the list use the button above
                    </p>
                  </Message>
                ) : (
                  <Item.Group className="todoList-item-group">
                    {this.state.todoLists.map((todoList) => (
                      <Item
                        as={Link}
                        onClick={() => this.props.todoId(todoList.todoListId)}
                        to="/todoList"
                        className="todoList-card"
                      >
                        <Item.Content>
                          <Item.Header className="todoList-header" as="a">
                            {todoList.todoListHeader}
                          </Item.Header>
                          <Item.Meta className="todoList-description">
                            {todoList.todoListDescription}
                          </Item.Meta>
                          <Item.Extra>
                            <Grid>
                              <Grid.Row>
                                <Grid.Column width={8}>
                                  <Item.Meta className="todoList-itemCount todoList-description">
                                    {todoList.listItemCount} item(s)
                                  </Item.Meta>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <Item.Meta className="todoList-usernames">
                                    <Popup trigger={<Icon name="share" />}>
                                      <List>
                                        {todoList.usernameList.map(
                                          (username) => (
                                            <List.Item>{username}</List.Item>
                                          )
                                        )}
                                      </List>
                                    </Popup>
                                  </Item.Meta>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                    ))}
                  </Item.Group>
                )}

                {this.hadleSaveListModal()}
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}> </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(null, { todoId })(AllLists);
