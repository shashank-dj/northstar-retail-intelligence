export default function SearchBar() {
  return (
    <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
      <input
        type="text"
        placeholder="Enter Pincode / Area / Street"
        className="flex-1 px-4 py-3 text-black outline-none"
      />
      <button className="bg-blue-500 px-6 text-white font-semibold hover:bg-blue-600">
        Analyze
      </button>
    </div>
  )
}
