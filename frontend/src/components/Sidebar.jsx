import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  UserCheck,
  Calendar,
  Image,
  FileText,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Students", href: "/students", icon: Users },
  { name: "Teachers", href: "/teachers", icon: UserCheck },
  // { name: "Classes", href: "/classes", icon: BookOpen },
  { name: "Attendance", href: "/attendance", icon: Calendar },
  { name: "Events", href: "/events", icon: Image },
  { name: "Leaves", href: "/leaves", icon: FileText },
  // { name: "Fees", href: "/fees", icon: CreditCard },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">EduManage</h1>
            <p className="text-gray-400 text-sm">School Management System</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-6 py-3 text-left text-white hover:bg-gray-800 transition-colors ${
                  isActive ? "bg-blue-600 border-r-4 border-blue-400" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
