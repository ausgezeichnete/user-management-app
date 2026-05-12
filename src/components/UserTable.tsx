import type { User } from "../types/user";
// We import these but will create them in the next steps
//import Avatar from "./Avatar";
import { RoleBadge, StatusBadge } from "./Badge";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}
const TableHeaders = ["User", "Role", "Status", "Joined", "Actions"];

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  // Empty state — shown when search/filter returns no results
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <span className="text-4xl mb-3">🙈</span>
        <p className="text-sm font-medium">No users match your filters</p>
        <p className="text-xs mt-1">Try adjusting the search or filter</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        {/* sticky top-0 keeps the header visible while scrolling */}
        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
          <tr>
            {TableHeaders.map((heading) => (
              <th
                key={heading}
                className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        {/* divide-y adds a border between each row */}
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            // key must be unique and stable — user.id is perfect
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              {/* Name + email column */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Avatar component — we create this next */}
                  {/* <Avatar name={user.name} colorClass={user.avatarColor} />*/}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
              </td>

              {/* Badge components — we create these next */}

              <td className="px-4 py-3">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={user.status} />
              </td>

              <td className="px-4 py-3 text-xs text-gray-400">{user.joined}</td>

              {/* Action buttons — call the functions from App.tsx via props */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 rounded hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors"
                    title="Edit user"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1.5 rounded hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors"
                    title="Delete user"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
