import { Todo } from "../@types/Todo.type";

export const getListTodosFromLocalStorage = () => {
  const list = localStorage.getItem("listTodos");

  if (list) return list;

  return null;
};

export const setListTodosFromLocalStorage = (todo: Todo[]): void => {
  localStorage.setItem("listTodos", JSON.stringify(todo));
};
