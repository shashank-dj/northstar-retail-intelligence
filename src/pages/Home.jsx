import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">Northstar</h1>
        <button className="bg-white text-black px-5 py-2 rounded-lg">
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center mt-32 px-4">
        <h2 className="text-5xl font-extrabold max-w-4xl">
          Decide Where to Open Your{" "}
          <span className="text-blue-400">Next Store</span>
        </h2>

        <p className="text-gray-400 mt-6 max-w-xl text-lg">
          Location intelligence for retail brands.
          Analyze demand, income, footfall & competition in seconds.
        </p>

        <button
          onClick={() => navigate("/analyze")}
          className="mt-10 bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600"
        >
          Analyze a Location
        </button>
      </section>
    </div>
  )
}
