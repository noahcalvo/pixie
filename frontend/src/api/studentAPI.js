import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL,
});

export const getStudents = () => {
  return api.get("/students/");
};

export const deleteStudent = (id) => {
  return api.delete("/students/delete-student/" + id);
};

export const editStudent = (id) => {
  return api.get("/students/update-student/" + id);
};

export const updateStudent = (studentObject) => {
  return api.put("/students/update-student/" + studentObject.id, studentObject);
};

export const createStudent = (studentObject) => {
  return api.post(studentObject);
};

export default api;
