import { useNavigate } from "react-router-dom"
import FeatureTabs from "../components/FeatureTabs"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">Northstar Retail Intelligence</h1>
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

        {/* Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/analyze")}
            className="bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition"
          >
            Analyze a Location
          </button>

          <button
            onClick={() => navigate("/recommend")}
            className="bg-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border border-gray-700 hover:border-gray-500 transition"
          >
            Find Best Locations
          </button>
        </div>
      </section>

      {/* Planned Features */}
      <FeatureTabs />

      {/* Footer */}
      <footer className="mt-32 bg-gray-900 border-t border-gray-800 py-8">
        <div className="text-center text-sm text-gray-400">
          <p className="font-medium text-gray-300">
            © {new Date().getFullYear()} Northstar
          </p>
          <p className="mt-1">
            Retail Location Intelligence Platform · All rights reserved
          </p>
        </div>
      </footer>

    </div>
  )
}
