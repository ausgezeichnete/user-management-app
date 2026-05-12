import type { User } from "../types/user";

interface StatCardsProps {
  users: User[];
}

export default function StatCards({ users }: StatCardsProps) {
  // Computed here, not stored in state — they update automatically
  // whenever the users array changes.
  const stats = [
    {
      label: "Total users",
      value: users.length,
    },
    {
      label: "Active",
      // .filter returns a new array — .length gives us the count
      value: users.filter((u) => u.status === "Active").length,
    },
    {
      label: "Admins",
      value: users.filter((u) => u.role === "Admin").length,
    },
    {
      label: "Invited",
      value: users.filter((u) => u.status === "Invited").length,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 px-5 py-4 bg-gray-50 border-b border-gray-200">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg border border-gray-200 px-4 py-3"
        >
          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
