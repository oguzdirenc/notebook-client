const rootUrl = "http://localhost:8080/api";

const userUrl = rootUrl + "/users";

const todolistUrl = rootUrl + "/todoList";
export const saveTodoListUrl = todolistUrl + "/save";
export const getUserTodoListsUsrl = todolistUrl + "/user";

const itemUrl = rootUrl + "/item";
export const getTodoItemsUrl = itemUrl + "/get";
export const saveTodoItemUrl = itemUrl + "/save";
export const deleteItemUrl = itemUrl + "/delete";

export const errorMessage = "An error occurred";
