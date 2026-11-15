import { useQuery } from "@tanstack/react-query";

import {
  getUsers,
  getUserById,
} from "../api/users-api";


export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });
};


export const useUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    retry: false,
  });
};