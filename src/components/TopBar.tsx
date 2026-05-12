import type { Role, Status } from "../types/user";

// Prop types — copy these exactly from how we called <TopBar ... /> in App.tsx
interface TopBarProps {
  search: string;
  filterRole: string;
  filterStatus: string;
  onSearch: (value: string) => void;
  onFilterRole: (value: string) => void;
  onFilterStatus: (value: string) => void;
  onAddUser: () => void;
}

const ROLES: Role[] = ["Admin", "Developer", "Viewer"];
const STATUSES: Status[] = ["Active", "Inactive", "Invited"];

export default function TopBar({
  search,
  filterRole,
  filterStatus,
  onSearch,
  onFilterRole,
  onFilterStatus,
  onAddUser,
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3 bg-white border-b border-gray-200">
      <h1 className="text-sm font-semibold text-gray-900">Users</h1>

      <div className="flex items-center gap-2">
        {/* Search — controlled input */}
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search users..."
            value={search} // always shows what React state says
            onChange={(e) => onSearch(e.target.value)} // updates state on every keystroke
            className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-44"
          />
        </div>

        {/* Role filter dropdown */}
        <select
          value={filterRole}
          onChange={(e) => onFilterRole(e.target.value)}
          className="text-xs border border-gray-200 rounded-md bg-gray-50 px-2 py-1.5
                     text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All roles</option>
          {/* value="" means "no filter" — App.tsx checks for empty string */}
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Status filter dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => onFilterStatus(e.target.value)}
          className="text-xs border border-gray-200 rounded-md bg-gray-50 px-2 py-1.5
                     text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Add user button — calls the function passed down from App */}
        <button
          onClick={onAddUser}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700
                     text-white text-xs font-medium rounded-md transition-colors"
        >
          + Add user
        </button>
      </div>
    </div>
  );
}
