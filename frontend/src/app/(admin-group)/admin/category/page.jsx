import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function CategoryTable() {
  const categories = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Electronics",
      slug: "electronics",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Clothing",
      slug: "clothing",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Books",
      slug: "books",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <FaPlus /> <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr
                key={cat.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {cat.name}
                </td>
                <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
                      <FaEdit /> <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
                      <FaTrash />{" "}
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
