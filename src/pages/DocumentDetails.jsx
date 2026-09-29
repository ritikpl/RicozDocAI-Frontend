import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"

function DocumentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/documents/${id}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch document"
          )
        }

        setDocument(data.document)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-64 items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading document...
          </p>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Document Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View the extracted information of this document.
          </p>
        </div>

        <button
          onClick={() => navigate("/documents")}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-50"
        >
          Back to Documents
        </button>
      </div>

      <div className="mt-8 max-w-3xl rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Extracted Information
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Document Type
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.documentType || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Invoice Number
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.invoiceNumber || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Vendor Name
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.vendorName || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Customer Name
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.customerName || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Date
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.date || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Due Date
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.dueDate || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Subtotal
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.subtotal || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Discount
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.discount || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Shipping Charge
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.charges?.shippingCharge || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Delivery Charge
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.charges?.deliveryCharge || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Insurance Charge
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.charges?.insuranceCharge || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Other Charges
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.charges?.otherCharges || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              CGST
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.taxes?.cgst?.amount
                ? `${document.taxes.cgst.amount} (${document.taxes.cgst.rate || "-"})`
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              SGST
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.taxes?.sgst?.amount
                ? `${document.taxes.sgst.amount} (${document.taxes.sgst.rate || "-"})`
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              IGST
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.taxes?.igst?.amount
                ? `${document.taxes.igst.amount} (${document.taxes.igst.rate || "-"})`
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Other Tax
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.taxes?.otherTax?.amount
                ? `${document.taxes.otherTax.amount} (${document.taxes.otherTax.rate || "-"})`
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Tax
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {document.taxes?.totalTax || document.tax || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {document.total || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Advance Paid
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.payment?.advancePaid || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Paid Amount
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.payment?.paidAmount || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Due Amount
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.payment?.dueAmount || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Payment Method
            </p>
            <p className="mt-1 text-sm text-slate-800">
              {document.payment?.paymentMethod || "-"}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-slate-800">
            File Information
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <p>
              <span className="font-medium text-slate-700">
                File Name:
              </span>{" "}
              <span className="text-slate-600">
                {document.originalName || "-"}
              </span>
            </p>

            <p>
              <span className="font-medium text-slate-700">
                File Type:
              </span>{" "}
              <span className="text-slate-600">
                {document.fileType || "-"}
              </span>
            </p>

            <p>
              <span className="font-medium text-slate-700">
                File Size:
              </span>{" "}
              <span className="text-slate-600">
                {document.fileSize
                  ? `${document.fileSize} bytes`
                  : "-"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DocumentDetails