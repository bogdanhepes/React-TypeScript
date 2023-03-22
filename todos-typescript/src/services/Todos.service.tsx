import axios from "axios";

const API_URL = "https://63034c269eb72a839d7d1f7e.mockapi.io/todos";

const getTodos = () => {
  return axios.get(API_URL);
};

const addTodo = (description: string) => {
  return axios.post(API_URL, {
    description,
    status: false,
    createdAt: new Date(),
  });
};

const getTodo = (id: number) => {
  return axios.get(API_URL + "/" + id);
};

const updateTodo = (
  id: number,
  edits: { description: string; status: boolean }
) => {
  return axios.put(API_URL + "/" + id, edits);
};

const deleteTodo = (id: number) => {
  return axios.delete(API_URL + "/" + id);
};

// eslint-disable-next-line
export default {
  getTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
