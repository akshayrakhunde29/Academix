import { Plus, Camera, Video, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalShow, setTypeModal } from "../store/studentSlice";
import { useDeleteEvent, useEvents } from "../hooks/useEvents";
const EventsTab = () => {
  const dispatch = useDispatch();
  // const [events, setEvents] = useState([
  //   {
  //     id: 1,
  //     title: "Science Fair",
  //     date: "2024-08-15",
  //     type: "Academic",
  //     media: [],
  //   },
  //   {
  //     id: 2,
  //     title: "Sports Day",
  //     date: "2024-08-20",
  //     type: "Sports",
  //     media: [],
  //   },
  //   {
  //     id: 3,
  //     title: "Cultural Program",
  //     date: "2024-08-25",
  //     type: "Cultural",
  //     media: [],
  //   },
  // ]);
  const { data: events, isLoading, isError, error } = useEvents();
  const deleteEvent = useDeleteEvent();

  const openModal = (type, data = {}) => {
    dispatch(setModalShow(true));
    dispatch(setTypeModal(type));
  };
  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Events & Media Management</h3>
        <button
          onClick={() => openModal("event")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700"
        >
          <Plus size={20} />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <Camera size={48} className="text-white opacity-50" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{event.date}</p>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {event.type}
              </span>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => openModal("event", event)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteEvent.mutate(event._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex space-x-1">
                  <Camera size={16} className="text-gray-400" />
                  <Video size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EventsTab;
