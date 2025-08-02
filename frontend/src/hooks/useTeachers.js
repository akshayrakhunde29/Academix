// src/hooks/useTeachers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherAPI } from "../services/api";
import toast from "react-hot-toast";

// 🔍 Get all teachers
export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => teacherAPI.getAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

// ➕ Create teacher
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teacherAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create teacher");
    },
  });
};

// ✏️ Update teacher
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => teacherAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update teacher");
    },
  });
};

// ❌ Delete teacher
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teacherAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Teacher deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete teacher");
    },
  });
};
