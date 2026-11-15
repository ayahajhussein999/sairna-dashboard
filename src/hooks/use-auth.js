import { useMutation, useQuery } from "@tanstack/react-query";
import { loginRequest, getMe } from "../api/auth-api";

export function useLogin() {
  return useMutation({
    mutationFn: loginRequest,
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
}