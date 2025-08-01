import { Plus, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLeaves, useUpdateLeaveStatus } from "../hooks/useLeaves";
import { useDispatch } from "react-redux";
import { setModalShow, setTypeModal } from "../store/studentSlice";
const LeavesTab = () => {
  const dispatch = useDispatch();
  // const [leaveRequests, setLeaveRequests] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     type: "Student",
  //     reason: "Medical",
  //     from: "2024-08-01",
  //     to: "2024-08-03",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     name: "Prof. Sarah Wilson",
  //     type: "Teacher",
  //     reason: "Personal",
  //     from: "2024-08-05",
  //     to: "2024-08-06",
  //     status: "Approved",
  //   },
  // ]);
  const { data: leaveRequests, isLoading, isError, error } = useLeaves();
  const updateStatus = useUpdateLeaveStatus();

  const openModal = (type, data = {}) => {
    dispatch(setModalShow(true));
    dispatch(setTypeModal(type));
  };

  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Leave Requests Management</h3>
        <button
          onClick={() => openModal("leave")}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700"
        >
          <Plus size={20} />
          <span>New Leave Request</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {leave.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        leave.type === "Student"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {leave.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.from} to {leave.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {leave.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus.mutate({
                                id: leave._id,
                                status: "Approved",
                                approvedBy: "Admin",
                                remarks: "Approved for valid reason",
                              })
                            }
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() =>
                              updateStatus.mutate({
                                id: leave._id,
                                status: "Rejected",
                                approvedBy: "Admin",
                                remarks: "Rejected for valid reason",
                              })
                            }
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      {/* <button
                        onClick={() => deleteItem("leave", leave.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Trash2 size={16} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LeavesTab;
