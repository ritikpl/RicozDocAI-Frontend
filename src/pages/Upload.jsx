import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"

function Upload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [uploadedData, setUploadedData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setFile(selectedFile)
      setMessage("")
      setUploadedData(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please choose a file first.")
      return
    }

    const formData = new FormData()
    formData.append("document", file)

    try {
      setLoading(true)
      setMessage("Uploading...")

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Upload failed")
      }

      setMessage("Document uploaded successfully.")
      setUploadedData(data.file)

      navigate("/review", {
        state: {
          extractedData: data.extractedData,
          file: data.file,
        },
      })

      console.log(data)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
          Documents
        </p>

        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
          Upload Document
        </h1>

        <p className="mt-1.5 text-sm text-[#666666]">
          Upload an invoice, receipt, or other business document.
        </p>
      </div>

      {/* Upload Card */}
      <div className="mt-6 max-w-3xl rounded-xl border border-[#E0E0E0] bg-white p-4 sm:p-5">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D9D9D9] bg-[#FAFAFA] px-5 py-8 text-center transition hover:border-[#C21820]">
          
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FDECEC] text-xl text-[#C21820]">
            📄
          </div>

          <h2 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
            Upload your document
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#666666]">
            Upload a bill, invoice, receipt, or PDF document.
            RicozDocAI will extract the important information for you.
          </p>

          {/* Choose File */}
          <label className="mt-5 cursor-pointer rounded-lg bg-[#C21820] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B81D1D]">
            Choose File

            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </label>

          {/* Selected File */}
          {file && (
            <div className="mt-4 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2.5">
              <p className="max-w-xs truncate text-sm font-medium text-[#555555]">
                Selected: {file.name}
              </p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 rounded-lg border border-[#C21820] bg-white px-5 py-2.5 text-sm font-semibold text-[#C21820] transition hover:bg-[#FDECEC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-sm font-medium ${
                message.includes("successfully")
                  ? "text-[#287D3C]"
                  : message === "Uploading..."
                    ? "text-[#C21820]"
                    : "text-[#C21820]"
              }`}
            >
              {message}
            </p>
          )}

          {/* Uploaded File Details */}
          {uploadedData && (
            <div className="mt-5 w-full max-w-md rounded-lg border border-[#E0E0E0] bg-white p-4 text-left">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">
                Uploaded File
              </h3>

              <div className="mt-3 space-y-2 text-sm text-[#666666]">
                <p>
                  <span className="font-medium text-[#1A1A1A]">
                    Name:
                  </span>{" "}
                  {uploadedData.originalName}
                </p>

                <p>
                  <span className="font-medium text-[#1A1A1A]">
                    Type:
                  </span>{" "}
                  {uploadedData.fileType}
                </p>

                <p>
                  <span className="font-medium text-[#1A1A1A]">
                    Size:
                  </span>{" "}
                  {uploadedData.fileSize} bytes
                </p>

                <p>
                  <span className="font-medium text-[#1A1A1A]">
                    Saved:
                  </span>{" "}
                  {uploadedData.fileName}
                </p>
              </div>
            </div>
          )}

          {/* Supported Formats */}
          <p className="mt-3 text-xs text-[#888888]">
            Supported formats: PDF, JPG, JPEG, PNG
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Upload

