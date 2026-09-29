import { NavLink } from "react-router-dom"

function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Documents", path: "/documents" },
    { name: "Upload", path: "/upload" },
  ]

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-gray-200 bg-white p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar