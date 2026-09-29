function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-900">
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
  )
}

export default Footer