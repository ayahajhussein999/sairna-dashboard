import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getBookings,
  getBookingById,
  cancelBooking,
} from "../api/bookings-api";


export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    retry: false,
  });
};


export const useBookingById = (id) => {
  return useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
    retry: false,
  });
};


export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings", id],
      });
    },
  });
};