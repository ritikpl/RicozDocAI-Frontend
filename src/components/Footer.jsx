function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold tracking-tight text-[#1A1A1A]">
            Ricoz<span className="text-[#C21820]">DocAI</span>
          </p>

          <p className="mt-1 text-xs text-[#666666] sm:text-sm">
            Smart document processing for modern businesses.
          </p>
        </div>

        <p className="text-xs text-[#888888] sm:text-sm">
          © 2026 RicozDocAI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

