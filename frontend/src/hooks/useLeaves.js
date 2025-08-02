// src/hooks/useLeaves.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveAPI } from "../services/api";
import toast from "react-hot-toast";

// 🔍 Get All Leaves
export const useLeaves = () => {
  return useQuery({
    queryKey: ["leaves"],
    queryFn: () => leaveAPI.getAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

// 🔍 Get Leave by ID
export const useLeaveById = (id) => {
  return useQuery({
    queryKey: ["leave", id],
    queryFn: () => leaveAPI.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

// ➕ Create Leave
export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      toast.success("Leave request created");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create leave");
    },
  });
};

// ✏️ Update Leave
export const useUpdateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => leaveAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      toast.success("Leave updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update leave");
    },
  });
};

// ✅ Update Leave Status (Approve/Reject)
export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, approvedBy, remarks }) =>
      leaveAPI.updateStatus(id, status, approvedBy, remarks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      toast.success("Leave status updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};

// ❌ Delete Leave
export const useDeleteLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      toast.success("Leave deleted");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete leave");
    },
  });
};
