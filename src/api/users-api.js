import axiosInstance from "./axios";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);

  return response.data;
};