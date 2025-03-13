import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addLead,
  getLeadById,
  getLeads,
  updateLead,
  UpdateLeadPayload,
} from "../apis/leadApi";

export const useAddLead = () => {
  return useMutation({
    mutationFn: addLead,
  });
};

export const useGetLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });
};

export const useGetLeadById = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getLeadById(id),
  });
};

export const useUpdateLead = (id: string) => {
  return useMutation({
    mutationFn: (data: UpdateLeadPayload) => updateLead(id, data),
  });
};
