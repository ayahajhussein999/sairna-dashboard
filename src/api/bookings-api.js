import axiosInstance from "./axios";

export const getBookings = async () => {
  const response = await axiosInstance.get("/bookings");

  return response.data;
};

export const getBookingById = async (id) => {
  const response = await axiosInstance.get(`/bookings/${id}`);

  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await axiosInstance.post(
    `/bookings/${id}/cancel`
  );

  return response.data;
};