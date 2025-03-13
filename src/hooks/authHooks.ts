import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../apis/authApi";

// Login Hook
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

// // Logout Hook
// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: logoutUser,
//     onSuccess: () => {
//       queryClient.removeQueries(["user"]); // Clear user data
//     },
//   });
// };
