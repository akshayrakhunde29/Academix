// src/hooks/useEvents.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventAPI } from "../services/api";
import toast from "react-hot-toast";

// 🔍 Get All Events
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventAPI.getAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// 🎯 Get Single Event by ID
export const useEventById = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => eventAPI.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

// ➕ Create Event
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create event");
    },
  });
};

// ✏️ Update Event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => eventAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update event");
    },
  });
};

// ❌ Delete Event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete event");
    },
  });
};
