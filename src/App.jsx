import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Analyze from "./pages/Analyze"
import Recommend from "./pages/Recommend"
import Financials from "./pages/Financials"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/financials" element={<Financials />} />
      </Routes>
    </BrowserRouter>
  )
}
