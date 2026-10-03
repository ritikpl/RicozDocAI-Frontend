import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 bg-[#FAFAFA] p-4 sm:p-5 lg:p-6">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

