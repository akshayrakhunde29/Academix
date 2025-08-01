import { useState } from "react";
import { Download } from "lucide-react";

const ReportsTab = () => {
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
      <h3 className="text-xl font-semibold mb-6">Reports & Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold mb-4">Attendance Summary</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Overall Student Attendance</span>
              <span className="font-bold text-2xl text-blue-600">
                {Math.round(
                  students.reduce((acc, s) => acc + s.attendance, 0) /
                    students.length
                )}
                %
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Overall Teacher Attendance</span>
              <span className="font-bold text-2xl text-green-600">
                {Math.round(
                  teachers.reduce((acc, t) => acc + t.attendance, 0) /
                    teachers.length
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
              <Download size={16} />
              <span>Download Student Report</span>
            </button>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
              <Download size={16} />
              <span>Download Teacher Report</span>
            </button>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2">
              <Download size={16} />
              <span>Download Attendance Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsTab;
