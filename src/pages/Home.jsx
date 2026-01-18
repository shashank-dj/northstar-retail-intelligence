import SearchBar from "../components/SearchBar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">Northstar</h1>
        <button className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-24 px-4">
        <h2 className="text-5xl font-extrabold leading-tight max-w-3xl">
          Decide Where to Open Your <span className="text-blue-400">Next Store</span>
        </h2>

        <p className="text-gray-400 mt-6 max-w-xl text-lg">
          Location intelligence for retail brands.  
          Analyze demand, income, footfall & competition in seconds.
        </p>

        <div className="mt-10 w-full max-w-xl">
          <SearchBar />
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Try: <span className="text-white">560102</span> or <span className="text-white">HSR Layout</span>
        </p>
      </section>

      {/* Trust Section */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 px-10 text-center">
        <div>
          <h3 className="text-xl font-semibold">📍 Location Intelligence</h3>
          <p className="text-gray-400 mt-2">
            Pincode & street-level retail insights
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">📊 Data-Driven</h3>
          <p className="text-gray-400 mt-2">
            Demographics, spending & competition
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">⚡ Fast Decisions</h3>
          <p className="text-gray-400 mt-2">
            Insights in seconds, not weeks
          </p>
        </div>
      </section>

    </div>
  )
}
