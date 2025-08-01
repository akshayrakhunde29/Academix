import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Events from "./pages/Events";
import Leaves from "./pages/Leaves";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Model from "./components/Model";
import { useSelector } from "react-redux";

function App() {
  const { modalShow, typeModal } = useSelector((state) => state.student);
  console.log({ modalShow, typeModal });
  return (
    <div className="App">
      <Model modalShow={modalShow} typeModal={typeModal} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="events" element={<Events />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
