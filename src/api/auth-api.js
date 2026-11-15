import axiosInstance from "./axios";

export const loginRequest = async (formData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    formData
  );

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};