import { getCategories } from "@/library/api-call";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default async function CategoryTable() {
  const categoryJSON = await getCategories();
  console.log(categoryJSON)
  const categories = categoryJSON.data



  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>'
        <Link href="/admin/category/add">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <FaPlus /> <span className="hidden sm:inline">Add Category</span>
          </button>
        </Link>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">S.NO</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr
                key={cat._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }  transition`}
              >
                <td className="px-4">{idx + 1}</td>
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
                <td className="px-4 py-3 text-gray-500">
                  <button className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200">
                    {
                      cat.status ? "Active" : "InActive"
                    }
                  </button>
                </td>
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
