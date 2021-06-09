import axios from "axios";
import React, { Component } from "react";
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
  Modal,
  Popup,
  Segment,
} from "semantic-ui-react";
import {
  deleteItemUrl,
  getTodoItemsUrl,
  saveTodoItemUrl,
} from "../api/constants";
import "../style/todoList.css";

class TodoList extends Component {
  state = {
    todoList: {},
    itemDescription: "",
    updateModalOpen: false,
    updatedItem: {},
  };

  async componentDidMount() {
    await axios
      .get(getTodoItemsUrl, { params: { todoListId: this.props.todoId } })
      .then((response) => {
        this.setState({ todoList: response.data });
        console.log(response.data);
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
    let itemSaveRequest = {
      itemDescription: this.state.itemDescription,
      todoListId: this.props.todoId,
    };

    await axios.post(saveTodoItemUrl, itemSaveRequest);

    axios
      .get(getTodoItemsUrl, { params: { todoListId: this.props.todoId } })
      .then((response) => {
        this.setState({ todoList: response.data, itemDescription: "" });
        console.log(response.data);
      });
  };

  handleUpdateModalClose = () => {
    this.setState({
      updateModalOpen: false,
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
              />
            }
            labelPosition="left"
            placeholder="Enter todo item..."
            value={this.state.updatedItem.itemDescription}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive>Save</Button>
        </Modal.Actions>
      </Modal>
    );
  };

  todoListItems = () => {
    return (
      <Segment>
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
                        <Icon className="delete-icon" name="x"></Icon>
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
                        <Icon className="delete-icon" name="x"></Icon>
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
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <Button
                            onClick={this.handleAddItem}
                            className="add-item-button"
                            icon="plus"
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
