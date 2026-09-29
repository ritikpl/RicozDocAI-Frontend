import { useEffect, useState } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

function Dashboard() {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    processed: 0,
    pendingReview: 0,
  })

  const [loading, setLoading] = useState(true)
  const [recentDocuments, setRecentDocuments] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/documents/stats`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch statistics")
        }

        setStats(data.stats)
      } catch (error) {
        console.error("Dashboard stats error:", error.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchRecentDocuments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/documents/recent`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch recent documents"
          )
        }

        setRecentDocuments(data.documents)
      } catch (error) {
        console.error("Recent documents error:", error.message)
      }
    }

    fetchStats()
    fetchRecentDocuments()
  }, [])

  const statCards = [
    {
      title: "Total Documents",
      value: stats.totalDocuments,
      description: "All saved documents",
    },
    {
      title: "Processed",
      value: stats.processed,
      description: "Successfully extracted",
    },
    {
      title: "Pending Review",
      value: stats.pendingReview,
      description: "Need your verification",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and review your documents with RicozDocAI.
          </p>
        </div>

        <a
          href="/upload"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          + Upload Document
        </a>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              {loading ? "..." : stat.value}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Recent Documents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recently uploaded documents will appear here.
          </p>
        </div>

        {recentDocuments.length === 0 ? (
          <div className="flex min-h-52 items-center justify-center px-5">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
                📄
              </div>

              <h3 className="mt-4 font-medium text-slate-800">
                No documents yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Upload your first document to start.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                    Document
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                    Vendor
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                    Invoice No.
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentDocuments.map((document) => (
                  <tr
                    key={document._id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {document.originalName || "Untitled"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {document.documentType || "Document"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {document.vendorName || "-"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {document.invoiceNumber || "-"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {document.date || "-"}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {document.total || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
