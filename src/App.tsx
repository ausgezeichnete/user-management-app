import { useState } from "react";
import type { User, UserFormData } from "./types/user";
import { mockUsers } from "./data/mockUsers";

// We import components that don't exist yet — that's fine.
// TypeScript/Vite will error until we create them, but the structure is clear.
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import StatCards from "./components/StatCards";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

export default function App() {
  // ── STATE ─────────────────────────────────────────────────────────────
  //
  // useState(initialValue) returns two things:
  //   1. The current value
  //   2. A function to update it (triggers a re-render)
  //
  // Syntax: const [value, setValue] = useState<Type>(initialValue)

  // The master list of users — starts with our mock data
  const [users, setUsers] = useState<User[]>(mockUsers);

  // A counter for generating unique IDs for new users
  const [nextId, setNextId] = useState(mockUsers.length + 1);

  // Search box text
  const [search, setSearch] = useState("");

  // Dropdown filter values — empty string means "show all"
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Modal state — is it open? and which user are we editing (null = Add mode)
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Toast notification text — null means no toast visible
  const [toast, setToast] = useState<string | null>(null);

  // ── DERIVED DATA ──────────────────────────────────────────────────────
  //
  // "Derived" means calculated from existing state — not stored separately.
  // This runs on every render automatically. No useEffect needed.
  // Rule: if you can compute it from state, don't store it in state.

  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();

    // If search is empty (!q), skip the check and return true for everyone.
    // Otherwise check if name or email includes the search text.
    const matchesSearch =
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q);

    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;

    // All three conditions must be true for a user to appear
    return matchesSearch && matchesRole && matchesStatus;
  });

  // ── HELPERS ───────────────────────────────────────────────────────────

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500); // auto-hide after 2.5 seconds
  }

  // ── MODAL HANDLERS ────────────────────────────────────────────────────

  function handleOpenAdd() {
    setEditUser(null); // null tells the modal we are in Add mode
    setModalOpen(true);
  }

  function handleOpenEdit(user: User) {
    setEditUser(user); // passing a user tells the modal we are in Edit mode
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditUser(null);
  }

  // ── CRUD OPERATIONS ───────────────────────────────────────────────────

  function handleSave(formData: UserFormData) {
    if (editUser) {
      // EDIT MODE
      // .map() loops through the array and returns a new array.
      // For the user that matches, we spread the old user and override with new data.
      // { ...editUser, ...formData } = copy all old fields, then overwrite the changed ones.
      // For everyone else, return them unchanged.
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, ...formData } : u)),
      );
      showToast("User updated ✓");
    } else {
      // ADD MODE
      // Build a complete User object from the form data + generated fields
      const newUser: User = {
        id: nextId,
        ...formData, // spreads name, email, role, status from the form
        joined: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        avatarColor: pickColor(nextId),
      };
      // [...prev, newUser] = copy the old array and add the new user at the end
      setUsers((prev) => [...prev, newUser]);
      setNextId((n) => n + 1);
      showToast("User added ✓");
    }
    handleClose();
  }

  function handleDelete(id: number) {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    if (!window.confirm(`Delete ${user.name}?`)) return;
    // .filter() returns a new array keeping only users that do NOT match the id
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User deleted");
  }

  // ── RENDER ────────────────────────────────────────────────────────────
  //
  // This is what gets drawn on screen.
  // Notice how we pass state DOWN as props, and pass handler functions DOWN
  // so children can trigger changes that bubble back UP to this component.

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Left panel — no props needed, it's purely decorative */}
      <Sidebar />

      {/* Right panel — fills remaining space */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar — receives filter state + setters */}
        <TopBar
          search={search}
          filterRole={filterRole}
          filterStatus={filterStatus}
          onSearch={setSearch}
          onFilterRole={setFilterRole}
          onFilterStatus={setFilterStatus}
          onAddUser={handleOpenAdd}
        />

        {/* Summary numbers — receives the full unfiltered user list */}
        <StatCards users={users} />

        {/* Main content area — scrollable */}
        <main className="flex-1 overflow-auto bg-white">
          <UserTable
            users={filteredUsers}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {/* Modal — rendered outside the layout so it overlays everything */}
      <UserModal
        isOpen={modalOpen}
        editUser={editUser}
        onSave={handleSave}
        onClose={handleClose}
      />

      {/* Toast notification — only renders when toast has a value */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

// Small helper — picks a stable avatar color based on user id
const COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-orange-100 text-orange-800",
  "bg-teal-100 text-teal-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-amber-100 text-amber-800",
];

function pickColor(id: number) {
  return COLORS[id % COLORS.length];
}
