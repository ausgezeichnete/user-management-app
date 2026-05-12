// This is our starting data — pretend it came from an API.
// In a real app you'd fetch this from a backend with useEffect + fetch().

import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@corp.com",
    role: "Admin",
    status: "Active",
    joined: "Jan 2024",
    avatarColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob@corp.com",
    role: "Developer",
    status: "Active",
    joined: "Mar 2024",
    avatarColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 3,
    name: "Clara Schmidt",
    email: "clara@corp.com",
    role: "Developer",
    status: "Active",
    joined: "May 2024",
    avatarColor: "bg-teal-100 text-teal-800",
  },
  {
    id: 4,
    name: "David Park",
    email: "david@corp.com",
    role: "Viewer",
    status: "Invited",
    joined: "Jul 2024",
    avatarColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma@corp.com",
    role: "Admin",
    status: "Active",
    joined: "Sep 2024",
    avatarColor: "bg-green-100 text-green-800",
  },
  {
    id: 6,
    name: "Frank Müller",
    email: "frank@corp.com",
    role: "Developer",
    status: "Inactive",
    joined: "Nov 2024",
    avatarColor: "bg-amber-100 text-amber-800",
  },
];
