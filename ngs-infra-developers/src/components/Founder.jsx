import config from '../config'

export default function Founder() {
  const { founder } = config
  const initial = founder.name.trim().charAt(0)

  return (
    <section className="section" id="founder">
      <div className="container founder-grid">
        <div className="founder-photo-wrap">
          {founder.photo ? (
            <img className="founder-photo" src={founder.photo} alt={founder.name} />
          ) : (
            <div className="founder-photo-fallback" aria-hidden="true">{initial}</div>
          )}
        </div>
        <div>
          <p className="eyebrow">From the founder</p>
          <h2 className="founder-name">{founder.name}</h2>
          <p className="founder-role">{founder.role}</p>
          <p style={{ maxWidth: '58ch', color: '#4a433a' }}>{founder.bio}</p>
        </div>
      </div>
    </section>
  )
}
