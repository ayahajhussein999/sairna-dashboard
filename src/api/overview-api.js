import axiosInstance from "./axios";

export const getOverview = async () => {
  const response = await axiosInstance.get("/overview");

  return response.data;
};