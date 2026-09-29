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

                const cgstAmount = parseFloat(
                    updatedTaxes.cgst.amount.replace(/,/g, "")
                ) || 0

                const sgstAmount = parseFloat(
                    updatedTaxes.sgst.amount.replace(/,/g, "")
                ) || 0

                const igstAmount = parseFloat(
                    updatedTaxes.igst.amount.replace(/,/g, "")
                ) || 0

                const otherTaxAmount = parseFloat(
                    updatedTaxes.otherTax.amount.replace(/,/g, "")
                ) || 0

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
        "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

    const labelClass =
        "mb-2 block text-sm font-medium text-slate-700"

    if (!documents.length) {
        return (
            <DashboardLayout>
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Review Document
                    </h1>

                    <p className="mt-2 text-sm text-red-500">
                        No extracted document data found.
                    </p>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    Review Documents
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Review and edit all information extracted by RicozDocAI.
                </p>
            </div>

            <div className="mt-8 space-y-8">
                {formData.map((document, documentIndex) => (
                    <div
                        key={documentIndex}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Document {documentIndex + 1}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Review and edit the extracted information.
                                </p>
                            </div>

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                {documentIndex + 1} / {formData.length}
                            </span>
                        </div>

                        {/* Document Information */}
                        <div className="mt-6">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Document Information
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2">
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
                        <div className="mt-8">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Amounts
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                        <div className="mt-8">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Charges
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                        <div className="mt-8">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                GST / Taxes
                            </h3>

                            <div className="space-y-4">
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
                        <div className="mt-8">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Payment Information
                            </h3>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                        <div className="mt-8">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Final Total
                            </h3>

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
                                className={inputClass}
                            />
                        </div>
                    </div>
                ))}

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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