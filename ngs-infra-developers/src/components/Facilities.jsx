import config from '../config'

export default function Facilities() {
  return (
    <section className="section" id="facilities">
      <div className="container">
        <p className="eyebrow">Facilities</p>
        <h2>What the location gives you</h2>

        <div className="facility-strip">
          {config.facilities.map((f) => (
            <div className="facility-row" key={f.title}>
              <span className="facility-dot" aria-hidden="true" />
              <div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
