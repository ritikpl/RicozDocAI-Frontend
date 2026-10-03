import { NavLink } from "react-router-dom"

function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Documents", path: "/documents" },
    { name: "Upload", path: "/upload" },
  ]

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-[#E5E5E5] bg-white p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#FDECEC] text-[#C21820]"
                  : "text-[#555555] hover:bg-[#F8F8F8] hover:text-[#1A1A1A]"
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
