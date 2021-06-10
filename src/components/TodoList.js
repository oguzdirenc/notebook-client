import axios from "axios";
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  Message,
  Modal,
  Popup,
  Segment,
} from "semantic-ui-react";
import {
  deleteItemUrl,
  getTodoItemsUrl,
  saveTodoItemUrl,
  updateItemUrl,
} from "../api/constants";
import "../style/todoList.css";
import LoadButton from "./LoadButton";

class TodoList extends Component {
  state = {
    todoList: {},
    itemDescription: "",
    updateModalOpen: false,
    updatedItem: {},
    errors: {},
    isLoading: false,
    isButtonLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await axios
      .get(getTodoItemsUrl, { params: { todoListId: this.props.todoId } })
      .then((response) => {
        this.setState({ isLoading: false, todoList: response.data });
      });
  }

  handleItemDelete = async (itemId) => {
    let filteredItems = [];

    await axios
      .delete(deleteItemUrl, { params: { itemId: itemId } })
      .then(
        (response) =>
          (filteredItems = this.state.todoList.todoListItems.filter(
            (item) => item.itemId !== itemId
          ))
      );

    this.setState({
      todoList: { ...this.state.todoList, todoListItems: filteredItems },
    });
  };

  handleAddItem = async () => {
    this.setState({ isButtonLoading: true });
    let itemSaveRequest = {
      itemDescription: this.state.itemDescription,
      todoListId: this.props.todoId,
    };
    try {
      await axios.post(saveTodoItemUrl, itemSaveRequest);
      axios
        .get(getTodoItemsUrl, { params: { todoListId: this.props.todoId } })
        .then((response) => {
          this.setState({
            todoList: response.data,
            itemDescription: "",
            errors: {},
            isButtonLoading: false,
          });
        });
    } catch (error) {
      this.setState({
        errors: error.response.data,
      });
    }
  };

  handleUpdateModalClose = () => {
    this.setState({
      updateModalOpen: false,
    });
  };

  handleItemUpdateSubmit = async () => {
    await axios.post(updateItemUrl, this.state.updatedItem);

    axios
      .get(getTodoItemsUrl, { params: { todoListId: this.props.todoId } })
      .then((response) => {
        this.setState({ todoList: response.data, updateModalOpen: false });
      });
  };

  onChangeFollower = (event, data) => {
    this.setState({
      updatedItem: { ...this.state.updatedItem, itemStatus: data.value },
    });
  };

  handleItemUpdate = () => {
    const options = [
      { key: 0, text: "Not Started", value: 0 },
      { key: 1, text: "In progress", value: 1 },
      { key: 2, text: "Done", value: 2 },
    ];
    return (
      <Modal
        size="small"
        closeIcon
        open={this.state.updateModalOpen}
        onClose={this.handleUpdateModalClose}
      >
        <Modal.Header>Update Item</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            onChange={(event) =>
              this.setState({
                updatedItem: {
                  ...this.state.updatedItem,
                  itemDescription: event.target.value,
                },
              })
            }
            label={
              <Dropdown
                defaultValue={this.state.updatedItem.itemStatus}
                options={options}
                onChange={this.onChangeFollower}
              />
            }
            labelPosition="left"
            placeholder="Enter todo item..."
            value={this.state.updatedItem.itemDescription}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={this.handleItemUpdateSubmit}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  todoListItems = () => {
    return (
      <Segment>
        {_.isEmpty(this.state.todoList.todoListItems) ? (
          <Message warning className="todoList-empty-message">
            <Message.Header className="emptyList-message-header">
              To do list is empty
            </Message.Header>
            <p className="emptyList-message-p">
              To add some item in the list use the button above
            </p>
          </Message>
        ) : (
          <div>
            {this.state.todoList.todoListItems
              ? this.state.todoList.todoListItems.map((item) => (
                  <div>
                    {item.itemStatus === 0 ? (
                      <Grid>
                        <Grid.Row className="todoList-item-align">
                          <Grid.Column width={2}>
                            <Popup
                              content="Not Started"
                              trigger={<Icon name="pin" color="red" />}
                            />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            <h3 className="item-description-font">
                              {item.itemDescription}
                            </h3>
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Label
                              onClick={() =>
                                this.setState({
                                  updateModalOpen: true,
                                  updatedItem: item,
                                })
                              }
                              as="a"
                            >
                              <Icon name="pencil" />
                              Edit
                            </Label>
                          </Grid.Column>
                          <Grid.Column width={1}>
                            <Icon
                              className="delete-icon"
                              onClick={() => this.handleItemDelete(item.itemId)}
                              name="x"
                            ></Icon>
                          </Grid.Column>
                        </Grid.Row>
                        <Divider></Divider>
                      </Grid>
                    ) : item.itemStatus === 1 ? (
                      <Grid>
                        <Grid.Row className="todoList-item-align">
                          <Grid.Column width={2}>
                            <Popup
                              content="In Progress"
                              trigger={<Icon name="fire" color="yellow" />}
                            />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            <h3 className="item-description-font">
                              {item.itemDescription}
                            </h3>
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Label
                              onClick={() =>
                                this.setState({
                                  updateModalOpen: true,
                                  updatedItem: item,
                                })
                              }
                              as="a"
                            >
                              <Icon name="pencil" />
                              Edit
                            </Label>
                          </Grid.Column>
                          <Grid.Column width={1}>
                            <Icon
                              className="delete-icon"
                              onClick={() => this.handleItemDelete(item.itemId)}
                              name="x"
                            ></Icon>
                          </Grid.Column>
                        </Grid.Row>
                        <Divider></Divider>
                      </Grid>
                    ) : item.itemStatus === 2 ? (
                      <Grid>
                        <Grid.Row className="todoList-item-align">
                          <Grid.Column width={2}>
                            <Popup
                              content="Done"
                              trigger={<Icon name="check" color="green" />}
                            />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            <h3 className="item-description-font">
                              {item.itemDescription}
                            </h3>
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Label
                              onClick={() =>
                                this.setState({
                                  updateModalOpen: true,
                                  updatedItem: item,
                                })
                              }
                              as="a"
                            >
                              <Icon name="pencil" />
                              Edit
                            </Label>
                          </Grid.Column>
                          <Grid.Column width={1}>
                            <Icon
                              className="delete-icon"
                              onClick={() => this.handleItemDelete(item.itemId)}
                              name="x"
                            ></Icon>
                          </Grid.Column>
                        </Grid.Row>
                        <Divider></Divider>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </div>
                ))
              : ""}
          </div>
        )}
      </Segment>
    );
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <Segment className="todoList-segment" raised>
                <Grid>
                  <Grid.Row></Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={12}>
                      <Header className="todoList-request-header">
                        {this.state.todoList.todoListHeader}
                      </Header>
                      <Grid>
                        <Grid.Column width={14}>
                          <Input
                            value={this.state.itemDescription}
                            onChange={(event) =>
                              this.setState({
                                itemDescription: event.target.value,
                              })
                            }
                            fluid
                            placeholder="Add something to do ..."
                          />
                          {this.state.errors.itemDescription ? (
                            <h6 className="addItem-validation-error">
                              {this.state.errors.itemDescription}
                            </h6>
                          ) : (
                            ""
                          )}
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <LoadButton
                            isButtonLoading={this.state.isButtonLoading}
                            onClick={this.handleAddItem}
                            className={"add-item-button"}
                            icon={"plus"}
                          />
                        </Grid.Column>
                      </Grid>
                      <Divider className="divider-align"></Divider>
                      {this.todoListItems()}
                      {this.handleItemUpdate()}
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todoId: state.todoId,
});

export default connect(mapStateToProps, null)(TodoList);
