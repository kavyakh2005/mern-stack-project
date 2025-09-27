export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome back, Admin 👋
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Users" value="1,245" />
        <Card title="Orders" value="342" />
        <Card title="Revenue" value="$12,340" />
        <Card title="Tickets" value="89" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>📦 New order received</li>
            <li>👤 User John registered</li>
            <li>💬 New support ticket created</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Add User
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              + Create Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-xl font-bold text-gray-800">{value}</span>
    </div>
  );
}
