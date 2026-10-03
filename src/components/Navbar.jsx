import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header className="h-16 border-b border-[#E5E5E5] bg-white px-4 sm:px-6 flex items-center justify-between">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-semibold tracking-tight text-[#1A1A1A]"
      >
        Ricoz<span className="text-[#C21820]">DocAI</span>
      </Link>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FDECEC] text-sm font-semibold text-[#C21820]">
          R
        </div>

        <span className="hidden text-sm font-medium text-[#555555] sm:block">
          User
        </span>
      </div>
    </header>
  )
}

export default Navbar