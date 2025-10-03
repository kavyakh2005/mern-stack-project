import {
  FaHome, FaShoppingCart, FaPhone, FaTasks, FaSuitcase,
  FaDollarSign, FaComments, FaEnvelope, FaCalendarAlt,
  FaProjectDiagram, FaUsers
} from "react-icons/fa";
import { MdOutlineViewTimeline } from "react-icons/md"; // For Gantt chart
import Link from "next/link";

export default function SideMenu() {
  return (
    <div className="w-64 h-screen bg-white  flex flex-col">


      {/* Home */}
      <Link href="/admin">
        <div className="px-4 py-3 text-gray-700 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaHome className="text-lg" />
          <span className="text-blue-600">Home</span>
        </div>
      </Link>


      {/* Apps section */}
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
        Apps
      </div>

      <div className="flex flex-col text-gray-700">
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaShoppingCart className="text-lg" />
          <span className="">E commerce</span>
        </div>

        <Link href="/admin/category">
          <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer w-full">
            <FaPhone className="text-lg" />
            <span>Category</span>
          </div>
        </Link>

        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaTasks className="text-lg" />
          <span>Project management</span>
        </div>
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaSuitcase className="text-lg" />
          <span>Travel agency</span>
        </div>
        <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-3">
            <FaDollarSign className="text-lg" />
            <span>Stock</span>
          </div>
          <span className="bg-yellow-200 text-yellow-800 text-[10px] font-semibold px-2 py-0.5 rounded">
            NEW
          </span>
        </div>
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaComments className="text-lg" />
          <span>Chat</span>
        </div>
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaEnvelope className="text-lg" />
          <span>Email</span>
        </div>
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaCalendarAlt className="text-lg" />
          <span>Events</span>
        </div>
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaProjectDiagram className="text-lg" />
          <span>Kanban</span>
        </div>
        <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-3">
            <MdOutlineViewTimeline className="text-lg" />
            <span>Gantt chart</span>
          </div>
          <span className="bg-yellow-200 text-yellow-800 text-[10px] font-semibold px-2 py-0.5 rounded">
            NEW
          </span>
        </div>
        <div className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
          <FaUsers className="text-lg" />
          <span>Social</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-4 py-3 text-gray-600 text-sm hover:bg-gray-100 cursor-pointer">
        ⬅ Collapsed View
      </div>
    </div>
  );
}
