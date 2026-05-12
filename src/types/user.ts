// An "interface" is a TypeScript contract.
// It describes the exact shape of a User object.
// If your code tries to create a User without these fields,
// TypeScript will show a red error before you even run the app.
export type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export type Role = "Admin" | "Developer" | "Viewer";
export type Status = "Active" | "Inactive" | "Invited";

export interface User {
  id: number; // unique identifier — never changes
  name: string;
  email: string;
  role: Role; // only "Admin", "Developer", or "Viewer" are allowed
  status: Status; // only "Active", "Inactive", or "Invited" are allowed
  joined: string; // e.g. "Jan 2024"
  avatarColor: string; // Tailwind bg color class
}

// This type describes the form fields when adding/editing a user.
// We omit "id", "joined", and "avatarColor" because the app generates
// those automatically — the user never types them.
export type UserFormData = Pick<User, "name" | "email" | "role" | "status">;
