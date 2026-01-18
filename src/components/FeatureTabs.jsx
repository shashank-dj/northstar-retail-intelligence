export default function FeatureTabs() {
  const features = [
    {
      title: "Area Intelligence",
      desc: "Demographics, income levels, footfall & population density.",
    },
    {
      title: "Retail Analytics",
      desc: "Competition analysis, crowd pullers & retail mix insights.",
    },
    {
      title: "Financial Feasibility",
      desc: "ROI, break-even period & expected sales benchmarks.",
    },
    {
      title: "Benchmark Locations",
      desc: "Compare similar retail markets across cities.",
    },
    {
      title: "Upload Your Data",
      desc: "Enhance insights using your internal sales & store data.",
    },
  ]

  return (
    <section className="mt-32 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-12">
        What Northstar Retail Intelligence Will Do
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xl font-semibold">{f.title}</h4>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-400">
                Coming Soon
              </span>
            </div>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
