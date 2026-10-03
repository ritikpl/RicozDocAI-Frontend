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
      icon: "▣",
      iconBg: "bg-[#F8F8F8]",
      iconColor: "text-[#C21820]",
    },
    {
      title: "Processed",
      value: stats.processed,
      description: "Successfully extracted",
      icon: "✓",
      iconBg: "bg-[#E6F4EA]",
      iconColor: "text-[#287D3C]",
    },
    {
      title: "Pending Review",
      value: stats.pendingReview,
      description: "Need your verification",
      icon: "!",
      iconBg: "bg-[#FEF7E0]",
      iconColor: "text-[#9A6700]",
    },
  ]

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
            Overview
          </p>

          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1.5 text-sm text-[#666666]">
            Manage and review your documents with RicozDocAI.
          </p>
        </div>

        <a
          href="/upload"
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#C21820] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B81D1D] sm:w-auto"
        >
          <span className="mr-2 text-base">+</span>
          Upload Document
        </a>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-[#E0E0E0] bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#666666]">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                  {loading ? "..." : stat.value}
                </h2>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor} text-sm font-bold`}
              >
                {stat.icon}
              </div>
            </div>

            <p className="mt-2.5 text-xs text-[#888888]">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="mt-6 overflow-hidden rounded-xl border border-[#E0E0E0] bg-white">
        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-[#E5E5E5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1A1A1A]">
              Recent Documents
            </h2>

            <p className="mt-0.5 text-sm text-[#666666]">
              Your recently uploaded documents.
            </p>
          </div>

          {recentDocuments.length > 0 && (
            <a
              href="/documents"
              className="text-sm font-semibold text-[#C21820] transition hover:text-[#B81D1D]"
            >
              View all →
            </a>
          )}
        </div>

        {/* Empty State */}
        {recentDocuments.length === 0 ? (
          <div className="flex min-h-56 items-center justify-center px-5 py-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-[#E0E0E0] bg-[#F8F8F8] text-lg text-[#C21820]">
                ▣
              </div>

              <h3 className="mt-3 text-sm font-semibold text-[#1A1A1A]">
                No documents yet
              </h3>

              <p className="mt-1 text-sm text-[#666666]">
                Upload your first document to start.
              </p>

              <a
                href="/upload"
                className="mt-4 inline-flex items-center rounded-lg bg-[#C21820] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#B81D1D]"
              >
                Upload Document
              </a>
            </div>
          </div>
        ) : (
          /* Documents Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-[#F8F8F8]">
                <tr>
                  <th className="border-b border-[#E5E5E5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    Document
                  </th>

                  <th className="border-b border-[#E5E5E5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    Vendor
                  </th>

                  <th className="border-b border-[#E5E5E5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    Invoice No.
                  </th>

                  <th className="border-b border-[#E5E5E5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    Date
                  </th>

                  <th className="border-b border-[#E5E5E5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentDocuments.map((document) => (
                  <tr
                    key={document._id}
                    className="border-b border-[#EEEEEE] last:border-0 hover:bg-[#FAFAFA]"
                  >
                    {/* Document */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F8F8F8] text-sm text-[#C21820]">
                          ▣
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[220px] truncate text-sm font-semibold text-[#1A1A1A]">
                            {document.originalName || "Untitled"}
                          </p>

                          <p className="mt-0.5 text-xs text-[#888888]">
                            {document.documentType || "Document"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Vendor */}
                    <td className="px-5 py-3.5 text-sm text-[#555555]">
                      {document.vendorName || "-"}
                    </td>

                    {/* Invoice */}
                    <td className="px-5 py-3.5 text-sm text-[#555555]">
                      {document.invoiceNumber || "-"}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 text-sm text-[#555555]">
                      {document.date || "-"}
                    </td>

                    {/* Total */}
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">
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



