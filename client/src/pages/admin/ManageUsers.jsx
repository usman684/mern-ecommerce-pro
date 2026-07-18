import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function ManageUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Change this user's role to "${newRole}"?`)) {
      return;
    }

    try {
      await api.put(`/auth/users/${userId}/role`, { role: newRole });
      toast.success("User role updated");
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Users</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {user.name}
                  {user._id === currentUser._id && (
                    <span className="text-xs text-gray-400 ml-2">(You)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {user._id !== currentUser._id && (
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user._id,
                          user.role === "admin" ? "user" : "admin",
                        )
                      }
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-8">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
