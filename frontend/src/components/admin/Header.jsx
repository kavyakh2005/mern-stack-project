import { FaBars, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Hamburger for mobile */}
        <button className="lg:hidden text-gray-600 text-xl">
          <FaBars />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Middle (search bar) */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <FaBell className="text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>
        <button className="relative text-gray-600 hover:text-gray-800">
          <FaEnvelope className="text-lg" />
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-full">
            5
          </span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-2xl text-gray-600" />
          <span className="hidden md:block text-gray-700 text-sm font-medium">
            Kavya Khandelwal
          </span>
        </div>
      </div>
    </header>
  );
}
