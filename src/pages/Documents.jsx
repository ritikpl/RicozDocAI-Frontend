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

  <button
    onClick={() =>
      window.location.href = `/documents/${document._id}`
    }
    className="mr-3 text-sm font-medium text-blue-600 transition hover:text-blue-700"
  >
    View
  </button>

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Documents
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your uploaded documents.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 sm:w-auto"
        >
          Export Excel
        </button>
      </div>

      {/* Document History */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Document History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your saved documents appear here.
              </p>
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search documents..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-48 items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading documents...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-5">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* No Documents */}
        {!loading &&
          !error &&
          filteredDocuments.length === 0 && (
            <div className="flex min-h-48 items-center justify-center px-5">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
                  📁
                </div>

                <h2 className="mt-4 font-medium text-slate-800">
                  {search
                    ? "No matching documents"
                    : "No documents found"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
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

                    <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDocuments.map((document) => (
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

                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            window.location.href = `/documents/${document._id}`
                          }
                          className="mr-3 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(document._id)
                          }
                          className="text-sm font-medium text-red-600 transition hover:text-red-700"
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