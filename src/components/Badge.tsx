import type { Role, Status } from "../types/user"; // We import these types to ensure our props are correct

export function RoleBadge({ role }: { role: Role }) {
  // We use the Role type here to ensure that only valid roles can be passed as props
  return <div>{role}</div>;
}

export function StatusBadge({ status }: { status: Status }) {
  return <div>{status}</div>;
}
