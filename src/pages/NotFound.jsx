function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-xl border border-[#E0E0E0] bg-white p-8 text-center">
        
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FDECEC] text-xl font-bold text-[#C21820]">
          404
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#C21820]">
          Page Not Found
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1A1A1A]">
          This page doesn't exist
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#666666]">
          The page you are looking for may have been moved,
          deleted, or the URL may be incorrect.
        </p>

        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#C21820] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B81D1D]"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}

export default NotFound
