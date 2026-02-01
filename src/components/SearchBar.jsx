import { useState } from "react"

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full"
    >
      <input
        type="text"
        placeholder="Enter Pincode / Area / Street"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-3 rounded-l-lg bg-white text-black focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  )
}
