export default function RecyclePage() {
  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>

      <h1 style={{ textAlign: "center" }}>RECYCLE</h1>

      <p>
        Recycling of e-waste means safely collecting and processing discarded
        electronic devices such as mobile phones, computers, televisions,
        batteries, and electronic accessories.
      </p>

      <p>
        These devices contain valuable materials like copper, aluminum, gold,
        and plastics, along with harmful substances such as lead, mercury,
        and cadmium. Proper e-waste recycling separates useful materials from
        toxic components using safe methods.
      </p>

      <p>
        Recyclable parts are reused to manufacture new products, while
        hazardous materials are treated and disposed of responsibly to prevent
        environmental pollution.
      </p>

      <p>
        Recycling reduces landfill burden, prevents chemical leakage, and saves
        energy by reducing the need for raw material mining.
      </p>

      <h3><u>Benefits of Recycling E-Waste</u></h3>

      <p><b>1. Environmental Protection</b><br/>
      Prevents toxic pollution and protects ecosystems.</p>

      <p><b>2. Resource Conservation</b><br/>
      Recovers valuable metals and reduces mining needs.</p>

      <p><b>3. Energy Saving</b><br/>
      Uses less energy than manufacturing from raw materials.</p>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <img src="/recycle1/images1.jfif" alt="Recycle symbol" width={250} />
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <h3>Video on Recycling</h3>

        <iframe
          width="420"
          height="236"
          src="https://www.youtube.com/embed/FcnaYdGdthg"
          allowFullScreen
        />
      </div>

    </div>
  )
}
