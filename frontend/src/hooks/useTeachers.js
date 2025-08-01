import { useQuery, useMutation, useQueryClient } from "react-query";
import { teacherAPI } from "../services/api";
import toast from "react-hot-toast";

export const useTeachers = () => {
  return useQuery("teachers", () =>
    teacherAPI.getAll().then((res) => res.data)
  );
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation(teacherAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
      toast.success("Teacher created successfully");
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, data }) => teacherAPI.update(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
      toast.success("Teacher updated successfully");
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation(teacherAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
      toast.success("Teacher deleted successfully");
    },
  });
};
