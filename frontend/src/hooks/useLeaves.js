// src/hooks/useLeaves.js
import { useQuery, useMutation, useQueryClient } from "react-query";
import { leaveAPI } from "../services/api";
import toast from "react-hot-toast";

// 🔍 Get All Leaves
export const useLeaves = () => {
  return useQuery("leaves", () => leaveAPI.getAll().then((res) => res.data), {
    staleTime: 5 * 60 * 1000,
  });
};

// 🔍 Get Leave by ID
export const useLeaveById = (id) => {
  return useQuery(
    ["leave", id],
    () => leaveAPI.getById(id).then((res) => res.data),
    {
      enabled: !!id,
    }
  );
};

// ➕ Create Leave
export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation(leaveAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("leaves");
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

  return useMutation(({ id, data }) => leaveAPI.update(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leaves");
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

  return useMutation(
    ({ id, status, approvedBy, remarks }) =>
      leaveAPI.updateStatus(id, status, approvedBy, remarks),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("leaves");
        toast.success("Leave status updated");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to update status");
      },
    }
  );
};

// ❌ Delete Leave
export const useDeleteLeave = () => {
  const queryClient = useQueryClient();

  return useMutation(leaveAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries("leaves");
      toast.success("Leave deleted");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete leave");
    },
  });
};
