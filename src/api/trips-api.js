import axiosInstance from "./axios";

export const getTrips = async () => {
  const response = await axiosInstance.get("/trips");

  return response.data;
};


export const createTrip = async (tripData) => {
  const response = await axiosInstance.post(
    "/trips",
    tripData
  );

  return response.data;
};


export const updateTrip = async ({ id, ...tripData }) => {
  const response = await axiosInstance.patch(
    `/trips/${id}`,
    tripData
  );

  return response.data;
};


export const deleteTrip = async (id) => {
  const response = await axiosInstance.delete(
    `/trips/${id}`
  );

  return response.data;
};


export const getCities = async () => {
  const response = await axiosInstance.get("/cities");

  return response.data;
};