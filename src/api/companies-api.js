import axiosInstance from "./axios";


export const getCompanies = async () => {
  const response = await axiosInstance.get("/companies");

  return response.data;
};


export const createCompany = async (companyData) => {
  const response = await axiosInstance.post(
    "/companies",
    companyData
  );

  return response.data;
};


export const updateCompany = async ({ id, ...companyData }) => {
  const response = await axiosInstance.patch(
    `/companies/${id}`,
    companyData
  );

  return response.data;
};


export const deleteCompany = async (id) => {
  const response = await axiosInstance.delete(
    `/companies/${id}`
  );

  return response.data;
};