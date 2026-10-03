import { Link } from "react-router-dom"

function Home() {
  const steps = [
    {
      number: "01",
      title: "Upload",
      description:
        "Upload an invoice, bill, receipt, or supported business document.",
    },
    {
      number: "02",
      title: "Extract",
      description:
        "AI analyzes the document and extracts useful business information.",
    },
    {
      number: "03",
      title: "Review & Save",
      description:
        "Review the extracted information, make changes, and save it securely.",
    },
  ]

  const features = [
    {
      icon: "✦",
      title: "AI Extraction",
      description:
        "Extract key information from business documents automatically.",
    },
    {
      icon: "✓",
      title: "Human Review",
      description:
        "Check and edit extracted values before saving.",
    },
    {
      icon: "▣",
      title: "Document History",
      description:
        "Keep your processed documents organized in one place.",
    },
    {
      icon: "▤",
      title: "Excel Export",
      description:
        "Export saved document data into an Excel spreadsheet.",
    },
  ]

  const documentTypes = [
    "Invoices",
    "Bills",
    "Receipts",
    "PDF Documents",
  ]

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      {/* Header */}
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-[#1A1A1A]"
          >
            Ricoz<span className="text-[#C21820]">DocAI</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link
              to="/"
              className="text-[#C21820]"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="text-[#555555] transition hover:text-[#C21820]"
            >
              Dashboard
            </Link>

            <Link
              to="/documents"
              className="text-[#555555] transition hover:text-[#C21820]"
            >
              Documents
            </Link>

            <Link
              to="/upload"
              className="rounded-lg bg-[#C21820] px-4 py-2 text-white transition hover:bg-[#B81D1D]"
            >
              Upload Document
            </Link>
          </nav>

          <Link
            to="/upload"
            className="rounded-lg bg-[#C21820] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#B81D1D] md:hidden"
          >
            Upload
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-[#E5E5E5] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#E0E0E0] bg-[#F8F8F8] px-3 py-1 text-xs font-semibold text-[#C21820]">
                AI-powered document assistant
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                Turn business documents into{" "}
                <span className="text-[#C21820]">
                  structured data.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#666666] sm:text-lg">
                Upload invoices, bills, receipts, and business documents.
                RicozDocAI uses AI to extract important information, lets you
                review it, and saves everything in one place.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-lg bg-[#C21820] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B81D1D]"
                >
                  Upload a Document
                </Link>

                <Link
                  to="/documents"
                  className="inline-flex items-center justify-center rounded-lg border border-[#E0E0E0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F8F8F8]"
                >
                  View Documents
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
              How it works
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
              From document to usable data
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666]">
              A simple workflow designed to reduce manual document entry.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-[#E0E0E0] bg-white p-5 transition hover:border-[#C21820]"
              >
                <span className="text-xs font-bold text-[#C21820]">
                  {step.number}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-[#1A1A1A]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#666666]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-[#E5E5E5] bg-[#F8F8F8]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
                Features
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
                Everything you need to manage documents
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-[#E0E0E0] bg-white p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEF7E0] text-sm font-bold text-[#C21820]">
                    {feature.icon}
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-[#1A1A1A]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#666666]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Documents */}
        <section className="mx-auto max-w-7xl px-5 py-11 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
                Supported documents
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1A1A1A]">
                Built for everyday business documents
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666]">
                Process common documents such as invoices, receipts, bills,
                and PDF files with a simple upload workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {documentTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-sm font-medium text-[#555555]"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-11 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-xl bg-[#C21820] px-6 py-9 sm:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Ready to process your first document?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                  Upload a document and let RicozDocAI turn it into
                  structured, reviewable information.
                </p>
              </div>

              <Link
                to="/upload"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#C21820] transition hover:bg-[#F8F8F8]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-semibold text-[#1A1A1A]">
            Ricoz<span className="text-[#C21820]">DocAI</span>
          </p>

          <p className="text-sm text-[#666666]">
            Smart document processing for modern businesses.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home


