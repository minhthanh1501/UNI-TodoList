import axios from "./axiosClient";

export const apiGetListTodos = () => {
  axios.get("/todos");
};
