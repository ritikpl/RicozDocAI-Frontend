import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"

function Review() {
  const navigate = useNavigate()
  const location = useLocation()

  const extractedData = location.state?.extractedData
  const file = location.state?.file || {}

  const documents = Array.isArray(extractedData)
    ? extractedData
    : extractedData
      ? [extractedData]
      : []

  const createFormData = (document) => ({
    documentType: document.documentType || "",
    invoiceNumber: document.invoiceNumber || "",
    vendorName: document.vendorName || "",
    customerName: document.customerName || "",
    date: document.date || "",
    dueDate: document.dueDate || "",

    items: Array.isArray(document.items)
      ? document.items.map((item) => ({
          description: item.description || "",
          quantity: item.quantity || "",
          unit: item.unit || "",
          unitPrice: item.unitPrice || "",
          amount: item.amount || "",
          discount: item.discount || "",
          cgstRate: item.cgstRate || "",
          cgstAmount: item.cgstAmount || "",
          sgstRate: item.sgstRate || "",
          sgstAmount: item.sgstAmount || "",
          igstRate: item.igstRate || "",
          igstAmount: item.igstAmount || "",
          otherTaxRate: item.otherTaxRate || "",
          otherTaxAmount: item.otherTaxAmount || "",
        }))
      : [],

    subtotal: document.subtotal || "",
    discount: document.discount || "",

    charges: {
      shippingCharge: document.charges?.shippingCharge || "",
      deliveryCharge: document.charges?.deliveryCharge || "",
      insuranceCharge: document.charges?.insuranceCharge || "",
      otherCharges: document.charges?.otherCharges || "",
    },

    taxes: {
      cgst: {
        rate: document.taxes?.cgst?.rate || "",
        amount: document.taxes?.cgst?.amount || "",
      },
      sgst: {
        rate: document.taxes?.sgst?.rate || "",
        amount: document.taxes?.sgst?.amount || "",
      },
      igst: {
        rate: document.taxes?.igst?.rate || "",
        amount: document.taxes?.igst?.amount || "",
      },
      otherTax: {
        rate: document.taxes?.otherTax?.rate || "",
        amount: document.taxes?.otherTax?.amount || "",
      },
      totalTax: document.taxes?.totalTax || "",
    },

    payment: {
      totalAmount: document.payment?.totalAmount || "",
      advancePaid: document.payment?.advancePaid || "",
      paidAmount: document.payment?.paidAmount || "",
      dueAmount: document.payment?.dueAmount || "",
      paymentMethod: document.payment?.paymentMethod || "",
    },

    total: document.total || "",
  })

  const [formData, setFormData] = useState(
    documents.map(createFormData)
  )

  const [loading, setLoading] = useState(false)

  const handleChange = (index, event) => {
    const { name, value } = event.target

    setFormData((prev) =>
      prev.map((document, documentIndex) =>
        documentIndex === index
          ? {
              ...document,
              [name]: value,
            }
          : document
      )
    )
  }

  const handleNestedChange = (index, section, field, value) => {
    setFormData((prev) =>
      prev.map((document, documentIndex) =>
        documentIndex === index
          ? {
              ...document,
              [section]: {
                ...document[section],
                [field]: value,
              },
            }
          : document
      )
    )
  }

  const handleTaxChange = (index, taxName, field, value) => {
    setFormData((prev) =>
      prev.map((document, documentIndex) => {
        if (documentIndex !== index) {
          return document
        }

        const updatedTaxes = {
          ...document.taxes,
          [taxName]: {
            ...document.taxes[taxName],
            [field]: value,
          },
        }

        const cgstAmount =
          parseFloat(updatedTaxes.cgst.amount.replace(/,/g, "")) || 0

        const sgstAmount =
          parseFloat(updatedTaxes.sgst.amount.replace(/,/g, "")) || 0

        const igstAmount =
          parseFloat(updatedTaxes.igst.amount.replace(/,/g, "")) || 0

        const otherTaxAmount =
          parseFloat(updatedTaxes.otherTax.amount.replace(/,/g, "")) || 0

        const totalTax =
          cgstAmount +
          sgstAmount +
          igstAmount +
          otherTaxAmount

        return {
          ...document,
          taxes: {
            ...updatedTaxes,
            totalTax: totalTax.toFixed(2),
          },
        }
      })
    )
  }

  const handleSave = async () => {
    try {
      setLoading(true)

      for (const document of formData) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/documents`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...document,
              ...file,
            }),
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to save document"
          )
        }
      }

      alert(
        formData.length > 1
          ? `${formData.length} documents saved successfully`
          : "Document saved successfully"
      )

      navigate("/documents")
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#D9D9D9] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#999999] focus:border-[#C21820] focus:ring-2 focus:ring-[#FDECEC]"

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-[#555555]"

  const sectionClass =
    "mt-7 border-t border-[#EEEEEE] pt-6"

  if (!documents.length) {
    return (
      <DashboardLayout>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
            Review
          </p>

          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Review Document
          </h1>

          <div className="mt-5 rounded-lg border border-[#F1C4C4] bg-[#FDECEC] px-4 py-3">
            <p className="text-sm font-medium text-[#C21820]">
              No extracted document data found.
            </p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
          AI Extraction
        </p>

        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
          Review Documents
        </h1>

        <p className="mt-1.5 text-sm text-[#666666]">
          Review and edit all information extracted by RicozDocAI.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {formData.map((document, documentIndex) => (
          <div
            key={documentIndex}
            className="overflow-hidden rounded-xl border border-[#E0E0E0] bg-white"
          >
            {/* Document Header */}
            <div className="flex flex-col gap-3 border-b border-[#E5E5E5] bg-[#FAFAFA] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#1A1A1A]">
                  Document {documentIndex + 1}
                </h2>

                <p className="mt-0.5 text-sm text-[#666666]">
                  Review and edit the extracted information.
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#FDECEC] px-3 py-1 text-xs font-semibold text-[#C21820]">
                {documentIndex + 1} / {formData.length}
              </span>
            </div>

            <div className="p-5">
              {/* Document Information */}
              <div>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                  Document Information
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Document Type
                    </label>

                    <input
                      type="text"
                      name="documentType"
                      value={document.documentType}
                      onChange={(event) =>
                        handleChange(documentIndex, event)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Invoice Number
                    </label>

                    <input
                      type="text"
                      name="invoiceNumber"
                      value={document.invoiceNumber}
                      onChange={(event) =>
                        handleChange(documentIndex, event)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Vendor Name
                    </label>

                    <input
                      type="text"
                      name="vendorName"
                      value={document.vendorName}
                      onChange={(event) =>
                        handleChange(documentIndex, event)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Customer Name
                    </label>

                    <input
                      type="text"
                      name="customerName"
                      value={document.customerName}
                      onChange={(event) =>
                        handleChange(documentIndex, event)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Invoice Date
                    </label>

                    <input
                      type="text"
                      name="date"
                      value={document.date}
                      onChange={(event) =>
                        handleChange(documentIndex, event)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Due Date
                    </label>

                    <input
                      type="text"
                      name="dueDate"
                      value={document.dueDate}
                      onChange={(event) =>
                        handleChange(documentIndex, event)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Amounts */}
              <div className={sectionClass}>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                  Amounts
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["subtotal", "Subtotal"],
                    ["discount", "Discount"],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className={labelClass}>
                        {label}
                      </label>

                      <input
                        type="text"
                        name={field}
                        value={document[field]}
                        onChange={(event) =>
                          handleChange(documentIndex, event)
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Charges */}
              <div className={sectionClass}>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                  Charges
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["shippingCharge", "Shipping Charge"],
                    ["deliveryCharge", "Delivery Charge"],
                    ["insuranceCharge", "Insurance Charge"],
                    ["otherCharges", "Other Charges"],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className={labelClass}>
                        {label}
                      </label>

                      <input
                        type="text"
                        value={document.charges[field]}
                        onChange={(event) =>
                          handleNestedChange(
                            documentIndex,
                            "charges",
                            field,
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* GST / Taxes */}
              <div className={sectionClass}>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                  GST / Taxes
                </h3>

                <div className="mt-4 space-y-4">
                  {[
                    ["cgst", "CGST"],
                    ["sgst", "SGST"],
                    ["igst", "IGST"],
                    ["otherTax", "Other Tax"],
                  ].map(([taxName, label]) => (
                    <div
                      key={taxName}
                      className="grid gap-4 sm:grid-cols-2"
                    >
                      <div>
                        <label className={labelClass}>
                          {label} Rate
                        </label>

                        <input
                          type="text"
                          value={document.taxes[taxName].rate}
                          onChange={(event) =>
                            handleTaxChange(
                              documentIndex,
                              taxName,
                              "rate",
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          {label} Amount
                        </label>

                        <input
                          type="text"
                          value={document.taxes[taxName].amount}
                          onChange={(event) =>
                            handleTaxChange(
                              documentIndex,
                              taxName,
                              "amount",
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className={labelClass}>
                      Total Tax
                    </label>

                    <input
                      type="text"
                      value={document.taxes.totalTax}
                      onChange={(event) =>
                        handleNestedChange(
                          documentIndex,
                          "taxes",
                          "totalTax",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className={sectionClass}>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">
                  Payment Information
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["totalAmount", "Total Amount"],
                    ["advancePaid", "Advance Paid"],
                    ["paidAmount", "Paid Amount"],
                    ["dueAmount", "Due Amount"],
                    ["paymentMethod", "Payment Method"],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className={labelClass}>
                        {label}
                      </label>

                      <input
                        type="text"
                        value={document.payment[field]}
                        onChange={(event) =>
                          handleNestedChange(
                            documentIndex,
                            "payment",
                            field,
                            event.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Total */}
              <div className={sectionClass}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1A1A1A]">
                      Final Total
                    </h3>

                    <p className="mt-0.5 text-xs text-[#888888]">
                      Final amount extracted from the document.
                    </p>
                  </div>

                  <div className="w-48 max-w-[45%]">
                    <input
                      type="text"
                      value={document.total}
                      onChange={(event) =>
                        handleChange(documentIndex, {
                          target: {
                            name: "total",
                            value: event.target.value,
                          },
                        })
                      }
                      className={`${inputClass} text-right font-semibold`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="w-full rounded-lg bg-[#C21820] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B81D1D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading
              ? "Saving..."
              : formData.length > 1
                ? `Save All ${formData.length} Documents`
                : "Save Document"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Review

