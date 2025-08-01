import { useDispatch } from "react-redux";
import { setModalShow, setTypeModal } from "../store/studentSlice";
import { useState } from "react";
import { useCreateStudent } from "../hooks/useStudents";
import { useCreateTeacher } from "../hooks/useTeachers";

const Model = ({ modalShow, typeModal }) => {
  if (!modalShow) return null;
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const createStudent = useCreateStudent();
  const createTeacher = useCreateTeacher();

  const closeModal = () => {
    dispatch(setModalShow(false));
    dispatch(setTypeModal(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on typeModal
    switch (typeModal) {
      case "student":
        if (
          formData.name &&
          formData.phone &&
          formData.rollNo &&
          formData.class &&
          formData.attendance
        ) {
          createStudent.mutate(formData);
          // console.log(formData);
        } else {
          console.log("creating student error");
        }
        break;
      case "teacher":
        if (
          formData.attendance &&
          formData.name &&
          formData.phone &&
          formData.subject
        ) {
          createTeacher.mutate(formData);
        } else {
          console.log("creating teacher error");
        }
        break;
      case "event":
        if (formData.id) {
          setEvents(events.map((e) => (e.id === formData.id ? formData : e)));
        } else {
          setEvents([...events, { ...formData, id: Date.now() }]);
        }
        break;
      case "leave":
        if (formData.id) {
          setLeaveRequests(
            leaveRequests.map((l) => (l.id === formData.id ? formData : l))
          );
        } else {
          setLeaveRequests([
            ...leaveRequests,
            { ...formData, id: Date.now(), status: "Pending" },
          ]);
        }
        break;
    }
    closeModal();
  };

  const getModalTitle = () => {
    switch (typeModal) {
      case "student":
        return formData.id ? "Edit Student" : "Add Student";
      case "teacher":
        return formData.id ? "Edit Teacher" : "Add Teacher";
      case "event":
        return formData.id ? "Edit Event" : "Add Event";
      case "leave":
        return formData.id ? "Edit Leave Request" : "New Leave Request";
      default:
        return "";
    }
  };
  console.log(formData);
  const renderFormFields = () => {
    switch (typeModal) {
      case "student":
        return (
          <>
            <input
              type="text"
              placeholder="Student Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Class"
              value={formData.class || ""}
              onChange={(e) =>
                setFormData({ ...formData, class: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={formData.rollNo || ""}
              onChange={(e) =>
                setFormData({ ...formData, rollNo: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Attendance %"
              value={formData.attendance || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  attendance: parseInt(e.target.value),
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              required
            />
          </>
        );
      case "teacher":
        return (
          <>
            <input
              type="text"
              placeholder="Teacher Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject || ""}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              placeholder="Attendance %"
              value={formData.attendance || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  attendance: parseInt(e.target.value),
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              min="0"
              max="100"
              required
            />
          </>
        );
      case "event":
        return (
          <>
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="date"
              placeholder="Event Date"
              value={formData.date || ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <select
              value={formData.type || ""}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Event Type</option>
              <option value="Academic">Academic</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Other">Other</option>
            </select>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Photos/Videos
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </>
        );
      case "leave":
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <select
              value={formData.type || ""}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Type</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <input
              type="text"
              placeholder="Reason for Leave"
              value={formData.reason || ""}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="date"
              placeholder="From Date"
              value={formData.from || ""}
              onChange={(e) =>
                setFormData({ ...formData, from: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="date"
              placeholder="To Date"
              value={formData.to || ""}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">{getModalTitle()}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {formData.id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Model;
