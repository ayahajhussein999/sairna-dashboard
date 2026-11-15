import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
  getCities,
} from "../api/trips-api";


export function useTrips() {
  return useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
    retry: false,
  });
}


export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    retry: false,
  });
}


export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
  });
}


export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
  });
}


export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
  });
}