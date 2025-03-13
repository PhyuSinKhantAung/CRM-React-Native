import api from "../utils/axios/axiosSetUp";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    role: string;
    email: string;
  };
}

// Login function
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  await AsyncStorage.setItem("jwt_token", response.data.accessToken);
  await AsyncStorage.setItem("user_id", response.data.user.id);
  await AsyncStorage.setItem("user_role", response.data.user.role);
  await AsyncStorage.setItem("user_email", response.data.user.email);

  return response.data;
};

// Logout function
export const logoutUser = async () => {
  await AsyncStorage.removeItem("jwt_token");
};
