import { AxiosResponse } from "axios";
import { Todo } from "../../@types/Todo.type";
import axios from "./axiosClient";

export type ResponseListTodos = AxiosResponse<Todo[], any>;
export type ResponseTodo = AxiosResponse<Todo, any>;
interface dataInput {
  _page: any;
  _per_page: any;
}

export const apiGetListTodos = (data: dataInput) => {
  const { _page, _per_page } = data;
  return axios.get<Todo[]>("/todos", {
    params: {
      _page: _page || 1,
      _per_page: _per_page || 2,
    },
  });
};

export const apiGetTodo = (id: string) => {
  return axios.get<Todo>("/todos", {
    params: {
      id,
    },
  });
};

export const apiAddTodo = (data: Todo) => {
  const { name, status } = data;
  return axios.post<Todo>("/todos", { name, status: status || false });
};

export const apiUpdateTodo = (data: Todo) => {
  const { id, name, status } = data;
  return axios.put<Todo>(`/todos/${id}`, {
    name,
    status: JSON.parse(status) || false,
  });
};

export const apiDeleteTodo = (id: string | number) => {
  return axios.delete<{}>(`/todos/${id}`);
};
