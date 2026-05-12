// NAV_ITEMS is defined outside the component.
// It doesn't depend on props or state, so it never needs to be re-created.
// Putting data like this outside the component is a small performance habit.
const NAV_ITEMS = [
  { label: "Users", icon: "👥" },
  // { label: "Roles", icon: "🛡️" },
  //{ label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    // "w-52" = fixed width of 13rem. "flex-shrink-0" stops it from squishing
    // when the right panel needs more space.
    <aside className="w-52 bg-white border-r border-gray-200 flex flex-col py-4 flex-shrink-0">
      {/* Logo */}
      <div className="px-4 pb-4 border-b border-gray-100 mb-2">
        <p className="font-semibold text-gray-900 text-sm">⬡ UserTrack</p>
        <p className="text-xs text-gray-400 mt-0.5">Management Portal</p>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-2">
        {NAV_ITEMS.map((item, index) => (
          <div
            key={item.label}
            className={`
              flex items-center gap-2.5 px-3 py-2 rounded-md text-sm cursor-pointer mb-0.5 transition-colors
              ${
                index === 0
                  ? // First item is the active page: blue accent + left border
                    "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* Help link pinned to bottom using "mt-auto" */}
      <div className="px-2 mt-auto">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
          <span>❓</span> Help
        </div>
      </div>
    </aside>
  );
}
