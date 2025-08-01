import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
const AttendanceTab = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      class: "10-A",
      rollNo: "001",
      attendance: 85,
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Jane Smith",
      class: "10-A",
      rollNo: "002",
      attendance: 92,
      phone: "9876543211",
    },
    {
      id: 3,
      name: "Mike Johnson",
      class: "9-B",
      rollNo: "003",
      attendance: 78,
      phone: "9876543212",
    },
  ]);
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Prof. Sarah Wilson",
      subject: "Mathematics",
      attendance: 95,
      phone: "9876543213",
    },
    {
      id: 2,
      name: "Dr. Robert Brown",
      subject: "Physics",
      attendance: 88,
      phone: "9876543214",
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      subject: "English",
      attendance: 91,
      phone: "9876543215",
    },
  ]);
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Attendance Tracking</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold mb-4">Student Attendance</h4>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-gray-600">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      student.attendance >= 90
                        ? "bg-green-100 text-green-800"
                        : student.attendance >= 75
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.attendance}%
                  </span>
                  <button className="text-green-600 hover:text-green-800">
                    <CheckCircle size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <XCircle size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold mb-4">Teacher Attendance</h4>
          <div className="space-y-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{teacher.name}</p>
                    <p className="text-xs text-gray-600">{teacher.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      teacher.attendance >= 90
                        ? "bg-green-100 text-green-800"
                        : teacher.attendance >= 75
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {teacher.attendance}%
                  </span>
                  <button className="text-green-600 hover:text-green-800">
                    <CheckCircle size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <XCircle size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttendanceTab;
