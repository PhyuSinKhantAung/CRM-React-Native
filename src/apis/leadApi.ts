import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/axios/axiosSetUp";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  estimatedRevenue: string;
  forecastedRevenue: string;
  actualRevenue: string;
  status: string;
};

export type CreateLeadPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  estimatedRevenue: string;
};

export type UpdateLeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  estimatedRevenue?: string;
  status?: string;
};

type LeadResponse = {
  status: number;
  message: string;
};

export const addLead = async (
  data: CreateLeadPayload
): Promise<LeadResponse> => {
  const response = await api.post("/leads/create", data);

  return response.data;
};

export const getLeads = async (): Promise<{ data: Lead[]; count: number }> => {
  const userRole = await AsyncStorage.getItem("user_role");
  if (userRole === "SALE_PERSON") {
    const response = await api.get("/users/me/leads", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("jwt_token")}`,
      },
    });
    return response.data;
  } else {
    const response = await api.get("/leads", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("jwt_token")}`,
      },
    });

    return response.data;
  }
};

export const getLeadById = async (id: string): Promise<Lead> => {
  const response = await api.get(`/leads/${id}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("jwt_token")}`,
    },
  });

  return response.data;
};

export const updateLead = async (
  id: string,
  data: UpdateLeadPayload
): Promise<Lead> => {
  const response = await api.put(`/leads/${id}`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("jwt_token")}`,
    },
  });
  return response.data;
};

export const deleteLead = async (id: string): Promise<Lead> => {
  const response = await api.delete(`/leads/${id}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("jwt_token")}`,
    },
  });
  return response.data;
};
