import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);

    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
// API functions
export const studentAPI = {
  getAll: () => api.get("/students"),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post("/students", data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  markAttendance: (id, status) =>
    api.post(`/students/${id}/attendance`, { status }),
  bulkAttendance: (data) => api.post("/students/bulk-attendance", data),
};
export const teacherAPI = {
  getAll: () => api.get("/teachers"),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (data) => api.post("/teachers", data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
  markAttendance: (id, status) =>
    api.post(`/teachers/${id}/attendance`, { status }),
  bulkAttendance: (data) => api.post("/teachers/bulk-attendance", data),
};

export const eventAPI = {
  getAll: () => api.get("/events"),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "media" && data[key]) {
        Array.from(data[key]).forEach((file) => {
          formData.append("media", file);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return api.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "media" && data[key]) {
        Array.from(data[key]).forEach((file) => {
          formData.append("media", file);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return api.put(`/events/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: (id) => api.delete(`/events/${id}`),
};

export const leaveAPI = {
  getAll: () => api.get("/leaves"),
  getById: (id) => api.get(`/leaves/${id}`),
  create: (data) => api.post("/leaves", data),
  update: (id, data) => api.put(`/leaves/${id}`, data),
  updateStatus: (id, status, approvedBy, remarks) =>
    api.put(`/leaves/${id}/status`, { status, approvedBy, remarks }),
  delete: (id) => api.delete(`/leaves/${id}`),
};

export const classAPI = {
  getAll: () => api.get("/classes"),
  getById: (id) => api.get(`/classes/${id}`),
  create: (data) => api.post("/classes", data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
};

export const feeAPI = {
  getAll: () => api.get("/fees"),
  getByStudent: (studentId) => api.get(`/fees/student/${studentId}`),
  create: (data) => api.post("/fees", data),
  update: (id, data) => api.put(`/fees/${id}`, data),
  markPaid: (id, paymentData) => api.put(`/fees/${id}/pay`, paymentData),
};

export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
};

export const reportsAPI = {
  getAttendance: (params) => api.get("/reports/attendance", { params }),
  getFees: (params) => api.get("/reports/fees", { params }),
};

export const searchAPI = {
  search: (query, type) => api.get("/search", { params: { query, type } }),
};

export default api;
