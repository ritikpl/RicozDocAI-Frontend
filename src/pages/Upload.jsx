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

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      })

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
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Upload Document
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload an invoice, receipt, or other business document.
        </p>
      </div>

      <div className="mt-8 max-w-3xl rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 text-center hover:border-blue-400">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
            📄
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            Upload your document
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Upload a bill, invoice, receipt, or PDF document.
            RicozDocAI will extract the important information for you.
          </p>

          <label className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            Choose File

            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <p className="mt-3 text-sm font-medium text-slate-700">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>

          {message && (
            <p className="mt-4 text-sm font-medium text-blue-600">
              {message}
            </p>
          )}

          {uploadedData && (
            <div className="mt-5 w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
              <h3 className="font-semibold text-slate-800">
                Uploaded File
              </h3>

              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-800">
                    Name:
                  </span>{" "}
                  {uploadedData.originalName}
                </p>

                <p>
                  <span className="font-medium text-slate-800">
                    Type:
                  </span>{" "}
                  {uploadedData.fileType}
                </p>

                <p>
                  <span className="font-medium text-slate-800">
                    Size:
                  </span>{" "}
                  {uploadedData.fileSize} bytes
                </p>

                <p>
                  <span className="font-medium text-slate-800">
                    Saved:
                  </span>{" "}
                  {uploadedData.fileName}
                </p>
              </div>
            </div>
          )}

          <p className="mt-3 text-xs text-slate-400">
            Supported formats: PDF, JPG, JPEG, PNG
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Upload
