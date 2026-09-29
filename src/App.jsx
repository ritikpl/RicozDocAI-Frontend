import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Documents from "./pages/Documents"
import Upload from "./pages/Upload"
import Review from "./pages/Review"
import DocumentDetails from "./pages/DocumentDetails"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentDetails />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/review" element={<Review />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App