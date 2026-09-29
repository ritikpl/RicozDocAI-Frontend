import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold">
            Ricoz<span className="text-blue-600">DocAI</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>

            <Link to="/documents" className="hover:text-blue-600">
              Documents
            </Link>
          </nav>

          <Link
            to="/upload"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Upload Document
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            AI-powered document assistant
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Turn business documents into
            <span className="text-blue-600"> structured data.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Upload invoices, bills, receipts, and business documents.
            RicozDocAI uses AI to extract important information, lets you
            review it, and saves everything in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/upload"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Upload a Document
            </Link>

            <Link
              to="/documents"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
            >
              View Documents
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              From document to usable data
            </h2>

            <p className="mt-3 text-slate-600">
              A simple workflow designed to reduce manual document entry.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                01
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Upload
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Upload an invoice, bill, receipt, or supported business
                document.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                02
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Extract
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                AI analyzes the document and extracts useful business
                information into structured fields.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                03
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Review & Save
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review the extracted information, make changes if needed,
                and save it securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-blue-600">
            FEATURES
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Everything you need to manage documents
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-2xl">🤖</div>
            <h3 className="mt-4 font-semibold">AI Extraction</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Extract key information from business documents automatically.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-2xl">✓</div>
            <h3 className="mt-4 font-semibold">Human Review</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Check and edit extracted values before saving.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-2xl">📁</div>
            <h3 className="mt-4 font-semibold">Document History</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Keep your processed documents organized in one place.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="text-2xl">📊</div>
            <h3 className="mt-4 font-semibold">Excel Export</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Export saved document data into an Excel spreadsheet.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Documents */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white">
              Built for everyday business documents
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Process common documents such as invoices, receipts, bills,
              and PDF files with a simple upload workflow.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Invoices", "Bills", "Receipts", "PDF Documents"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Ready to process your first document?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Upload a document and let RicozDocAI turn it into structured,
            reviewable information.
          </p>

          <Link
            to="/upload"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">
              Ricoz<span className="text-blue-600">DocAI</span>
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Smart document processing for modern businesses.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 RicozDocAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home