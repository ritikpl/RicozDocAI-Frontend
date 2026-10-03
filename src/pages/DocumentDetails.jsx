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
          <p className="text-sm text-[#666666]">
            Loading document...
          </p>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-[#F1C4C4] bg-[#FDECEC] p-5">
          <p className="text-sm font-medium text-[#C21820]">
            {error}
          </p>
        </div>
      </DashboardLayout>
    )
  }

  const DetailItem = ({ label, value, strong = false }) => (
    <div className="rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#777777]">
        {label}
      </p>

      <p
        className={`mt-1.5 text-sm ${
          strong
            ? "font-semibold text-[#1A1A1A]"
            : "text-[#555555]"
        }`}
      >
        {value || "-"}
      </p>
    </div>
  )

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
            Document
          </p>

          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Document Details
          </h1>

          <p className="mt-1.5 text-sm text-[#666666]">
            View the extracted information of this document.
          </p>
        </div>

        <button
          onClick={() => navigate("/documents")}
          className="w-full rounded-lg border border-[#D9D9D9] bg-white px-5 py-2.5 text-sm font-semibold text-[#555555] transition hover:border-[#C21820] hover:bg-[#FDECEC] hover:text-[#C21820] sm:w-auto"
        >
          Back to Documents
        </button>
      </div>

      {/* Main Card */}
      <div className="mt-6 max-w-5xl overflow-hidden rounded-xl border border-[#E0E0E0] bg-white">
        {/* Card Header */}
        <div className="border-b border-[#E5E5E5] bg-[#FAFAFA] px-5 py-4">
          <h2 className="text-base font-semibold text-[#1A1A1A]">
            Extracted Information
          </h2>

          <p className="mt-0.5 text-sm text-[#666666]">
            Information extracted from your uploaded document.
          </p>
        </div>

        <div className="p-5">
          {/* Document Information */}
          <section>
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              Document Information
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Document Type"
                value={document.documentType}
              />

              <DetailItem
                label="Invoice Number"
                value={document.invoiceNumber}
              />

              <DetailItem
                label="Vendor Name"
                value={document.vendorName}
              />

              <DetailItem
                label="Customer Name"
                value={document.customerName}
              />

              <DetailItem
                label="Date"
                value={document.date}
              />

              <DetailItem
                label="Due Date"
                value={document.dueDate}
              />
            </div>
          </section>

          {/* Amounts */}
          <section className="mt-7 border-t border-[#EEEEEE] pt-6">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              Amounts
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Subtotal"
                value={document.subtotal}
              />

              <DetailItem
                label="Discount"
                value={document.discount}
              />

              <DetailItem
                label="Total"
                value={document.total}
                strong
              />
            </div>
          </section>

          {/* Charges */}
          <section className="mt-7 border-t border-[#EEEEEE] pt-6">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              Charges
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem
                label="Shipping Charge"
                value={document.charges?.shippingCharge}
              />

              <DetailItem
                label="Delivery Charge"
                value={document.charges?.deliveryCharge}
              />

              <DetailItem
                label="Insurance Charge"
                value={document.charges?.insuranceCharge}
              />

              <DetailItem
                label="Other Charges"
                value={document.charges?.otherCharges}
              />
            </div>
          </section>

          {/* Taxes */}
          <section className="mt-7 border-t border-[#EEEEEE] pt-6">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              GST / Taxes
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="CGST"
                value={
                  document.taxes?.cgst?.amount
                    ? `${document.taxes.cgst.amount} (${document.taxes.cgst.rate || "-"})`
                    : "-"
                }
              />

              <DetailItem
                label="SGST"
                value={
                  document.taxes?.sgst?.amount
                    ? `${document.taxes.sgst.amount} (${document.taxes.sgst.rate || "-"})`
                    : "-"
                }
              />

              <DetailItem
                label="IGST"
                value={
                  document.taxes?.igst?.amount
                    ? `${document.taxes.igst.amount} (${document.taxes.igst.rate || "-"})`
                    : "-"
                }
              />

              <DetailItem
                label="Other Tax"
                value={
                  document.taxes?.otherTax?.amount
                    ? `${document.taxes.otherTax.amount} (${document.taxes.otherTax.rate || "-"})`
                    : "-"
                }
              />

              <DetailItem
                label="Total Tax"
                value={
                  document.taxes?.totalTax ||
                  document.tax ||
                  "-"
                }
                strong
              />
            </div>
          </section>

          {/* Payment */}
          <section className="mt-7 border-t border-[#EEEEEE] pt-6">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              Payment Information
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem
                label="Advance Paid"
                value={document.payment?.advancePaid}
              />

              <DetailItem
                label="Paid Amount"
                value={document.payment?.paidAmount}
              />

              <DetailItem
                label="Due Amount"
                value={document.payment?.dueAmount}
              />

              <DetailItem
                label="Payment Method"
                value={document.payment?.paymentMethod}
              />
            </div>
          </section>

          {/* Final Total */}
          <section className="mt-7 border-t border-[#EEEEEE] pt-6">
            <div className="flex flex-col gap-3 rounded-lg border border-[#E5E5E5] bg-[#F8F8F8] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#777777]">
                  Final Total
                </p>

                <p className="mt-1 text-sm text-[#666666]">
                  Total amount of this document
                </p>
              </div>

              <p className="text-xl font-semibold text-[#C21820]">
                {document.total || "-"}
              </p>
            </div>
          </section>

          {/* File Information */}
          <section className="mt-7 border-t border-[#EEEEEE] pt-6">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              File Information
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="File Name"
                value={document.originalName}
              />

              <DetailItem
                label="File Type"
                value={document.fileType}
              />

              <DetailItem
                label="File Size"
                value={
                  document.fileSize
                    ? `${document.fileSize} bytes`
                    : "-"
                }
              />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DocumentDetails
