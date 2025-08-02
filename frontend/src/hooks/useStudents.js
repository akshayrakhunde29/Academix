// src/hooks/useStudents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentAPI } from "../services/api";
import toast from "react-hot-toast";

// 🔍 Get all students
export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: () => studentAPI.getAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

// ➕ Create student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create student");
    },
  });
};

// ✏️ Update student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => studentAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update student");
    },
  });
};

// ❌ Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete student");
    },
  });
};
