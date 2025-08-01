import { useQuery, useMutation, useQueryClient } from "react-query";
import { studentAPI } from "../services/api";
import toast from "react-hot-toast";

export const useStudents = () => {
  return useQuery(
    "students",
    () => studentAPI.getAll().then((res) => res.data),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation(studentAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success("Student created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create student");
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, data }) => studentAPI.update(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success("Student updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update student");
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation(studentAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success("Student deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete student");
    },
  });
};
