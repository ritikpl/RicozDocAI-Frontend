import { useEffect, useState } from "react"
import DashboardLayout from "../layouts/DashboardLayout"

function Documents() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const handleExportExcel = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/api/documents/export/excel`,
      "_blank"
    )
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents/${id}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete document")
      }

      setDocuments((prevDocuments) =>
        prevDocuments.filter((document) => document._id !== id)
      )
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/documents`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch documents"
          )
        }

        setDocuments(data.documents)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const filteredDocuments = documents.filter((document) => {
    const searchText = search.toLowerCase()

    return (
      document.originalName?.toLowerCase().includes(searchText) ||
      document.vendorName?.toLowerCase().includes(searchText) ||
      document.invoiceNumber?.toLowerCase().includes(searchText) ||
      document.documentType?.toLowerCase().includes(searchText)
    )
  })

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
            Records
          </p>

          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Documents
          </h1>

          <p className="mt-1.5 text-sm text-[#666666]">
            View and manage your uploaded documents.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="w-full rounded-lg bg-[#C21820] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B81D1D] sm:w-auto"
        >
          Export Excel
        </button>
      </div>

      {/* Document History */}
      <div className="mt-6 overflow-hidden rounded-xl border border-[#E0E0E0] bg-white">
        <div className="border-b border-[#E5E5E5] px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#1A1A1A]">
                Document History
              </h2>

              <p className="mt-0.5 text-sm text-[#666666]">
                Your saved documents appear here.
              </p>
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search documents..."
              className="w-full rounded-lg border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#999999] focus:border-[#C21820] focus:ring-2 focus:ring-[#FDECEC] sm:w-64"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-48 items-center justify-center">
            <p className="text-sm text-[#666666]">
              Loading documents...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-5">
            <div className="rounded-lg border border-[#F1C4C4] bg-[#FDECEC] px-4 py-3">
              <p className="text-sm font-medium text-[#C21820]">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* No Documents */}
        {!loading &&
          !error &&
          filteredDocuments.length === 0 && (
            <div className="flex min-h-48 items-center justify-center px-5">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-[#E0E0E0] bg-[#F8F8F8] text-xl text-[#C21820]">
                  📁
                </div>

                <h2 className="mt-3 font-semibold text-[#1A1A1A]">
                  {search
                    ? "No matching documents"
                    : "No documents found"}
                </h2>

                <p className="mt-1 text-sm text-[#666666]">
                  {search
                    ? "Try a different search."
                    : "Uploaded documents will appear here."}
                </p>
              </div>
            </div>
          )}

        {/* Documents Table */}
        {!loading &&
          !error &&
          filteredDocuments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
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

                    <th className="border-b border-[#E5E5E5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#666666]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDocuments.map((document) => (
                    <tr
                      key={document._id}
                      className="border-b border-[#EEEEEE] last:border-0 hover:bg-[#FAFAFA]"
                    >
                      <td className="px-5 py-3.5">
                        <p className="max-w-[220px] truncate text-sm font-semibold text-[#1A1A1A]">
                          {document.originalName || "Untitled"}
                        </p>

                        <p className="mt-0.5 text-xs text-[#888888]">
                          {document.documentType || "Document"}
                        </p>
                      </td>

                      <td className="px-5 py-3.5 text-sm text-[#555555]">
                        {document.vendorName || "-"}
                      </td>

                      <td className="px-5 py-3.5 text-sm text-[#555555]">
                        {document.invoiceNumber || "-"}
                      </td>

                      <td className="px-5 py-3.5 text-sm text-[#555555]">
                        {document.date || "-"}
                      </td>

                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">
                        {document.total || "-"}
                      </td>

                      <td className="px-5 py-3.5">
                        <button
                          onClick={() =>
                            window.location.href = `/documents/${document._id}`
                          }
                          className="mr-4 text-sm font-semibold text-[#C21820] transition hover:text-[#B81D1D]"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(document._id)
                          }
                          className="text-sm font-medium text-[#B42318] transition hover:text-[#8F1D14]"
                        >
                          Delete
                        </button>
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

export default Documents
