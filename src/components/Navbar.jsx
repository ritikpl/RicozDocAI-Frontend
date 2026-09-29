import { Link } from "react-router-dom"
function Navbar() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <Link
        to="/"
        className="text-xl font-semibold text-slate-900"
      >
        Ricoz<span className="text-blue-600">DocAI</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
          R
        </div>

        <span className="text-sm font-medium text-slate-700">
          User
        </span>
      </div>
    </header>
  )
}

export default Navbar