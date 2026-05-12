import { useState } from "react";
import type { User, UserFormData, Role, Status } from "../types/user";

interface UserModalProps {
  isOpen: boolean;
  editUser: User | null;
  onSave: (data: UserFormData) => void;
  onClose: () => void;
}

const EMPTY_FORM: UserFormData = {
  name: "",
  email: "",
  role: "Developer",
  status: "Active",
};

export default function UserModal({
  isOpen,
  editUser,
  onSave,
  onClose,
}: UserModalProps) {
  // Local state — only this component cares about these while the user is typing
  const [form, setForm] = useState<UserFormData>(
    editUser
      ? {
          name: editUser.name,
          email: editUser.email,
          role: editUser.role,
          status: editUser.status,
        }
      : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  // Generic handler for any field — "keyof UserFormData" means only valid field names allowed
  function handleChange(field: keyof UserFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field as soon as the user starts correcting it
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  // Validate before saving — returns true if everything is OK
  function validate(): boolean {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return; // stop here if there are errors
    onSave(form); // send the form data up to App.tsx
  }

  // Close when clicking the dark backdrop (not the modal panel itself)
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  // Render nothing when closed — avoids unnecessary DOM nodes
  if (!isOpen) return null;

  return (
    // Backdrop — "fixed inset-0" covers the full screen. "z-50" puts it on top of everything.
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      {/* Modal panel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-96 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            {editUser ? "Edit user" : "Add user"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <FormField label="Full name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Alice Johnson"
              className={inputClass(!!errors.name)}
            />
          </FormField>

          <FormField label="Email address" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="alice@company.com"
              className={inputClass(!!errors.email)}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Role">
              <select
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value as Role)}
                className={inputClass(false)}
              >
                <option>Admin</option>
                <option>Developer</option>
                <option>Viewer</option>
              </select>
            </FormField>

            <FormField label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  handleChange("status", e.target.value as Status)
                }
                className={inputClass(false)}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Invited</option>
              </select>
            </FormField>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {editUser ? "Save changes" : "Add user"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Small helpers to keep the JSX above clean ──────────────────────────

// Returns a Tailwind class string for the input based on whether it has an error
function inputClass(hasError: boolean): string {
  return [
    "w-full px-3 py-2 text-sm border rounded-lg",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
    hasError
      ? "border-red-400 bg-red-50"
      : "border-gray-200 bg-gray-50 focus:bg-white",
  ].join(" ");
}

// FormField wraps a label, an input (passed as children), and an error message.
// "children" is a special React prop — it's whatever you put between the tags:
//   <FormField>  ← this content becomes "children"  </FormField>
interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
