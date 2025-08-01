import { Users, Calendar, UserCheck, Clock } from "lucide-react";
import { useState } from "react";
import { useStudents } from "../hooks/useStudents";

const Dashboard = () => {
  const { data: students, isLoading, isError, error } = useStudents();

  console.log({ students, isLoading, isError, error });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [student, setStudents] = useState([
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

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Science Fair",
      date: "2024-08-15",
      type: "Academic",
      media: [],
    },
    {
      id: 2,
      title: "Sports Day",
      date: "2024-08-20",
      type: "Sports",
      media: [],
    },
    {
      id: 3,
      title: "Cultural Program",
      date: "2024-08-25",
      type: "Cultural",
      media: [],
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      type: "Student",
      reason: "Medical",
      from: "2024-08-01",
      to: "2024-08-03",
      status: "Pending",
    },
    {
      id: 2,
      name: "Prof. Sarah Wilson",
      type: "Teacher",
      reason: "Personal",
      from: "2024-08-05",
      to: "2024-08-06",
      status: "Approved",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});

  const openModal = (type, data = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">
                {students.length}
              </p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Teachers</p>
              <p className="text-3xl font-bold text-green-600">
                {teachers.length}
              </p>
            </div>
            <UserCheck className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Events</p>
              <p className="text-3xl font-bold text-purple-600">
                {events.length}
              </p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Leaves</p>
              <p className="text-3xl font-bold text-orange-600">
                {leaveRequests.filter((l) => l.status === "Pending").length}
              </p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
          <div className="space-y-3">
            {events?.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Students Average</span>
              <span className="font-semibold text-blue-600">
                {Math.round(
                  students.reduce((acc, s) => acc + s.attendance, 0) /
                    students.length
                )}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Teachers Average</span>
              <span className="font-semibold text-green-600">
                {Math.round(
                  teachers.reduce((acc, t) => acc + t.attendance, 0) /
                    teachers.length
                )}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
