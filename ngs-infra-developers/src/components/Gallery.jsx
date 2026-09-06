import config from '../config'

export default function Gallery() {
  return (
    <section className="section section-dark" id="gallery">
      <div className="container">
        <p className="eyebrow">Site photographs</p>
        <h2 style={{ color: 'var(--ivory)' }}>See the site as it stands</h2>

        <div className="gallery-grid">
          {config.sitePhotos.map((photo, i) => (
            <div className={`gallery-item ${i === 0 ? 'large' : ''}`} key={photo.id}>
              {photo.src ? (
                <img src={photo.src} alt={photo.label} />
              ) : (
                <div className="gallery-placeholder">{photo.label}<br />photo pending</div>
              )}
              <div className="gallery-caption">{photo.label}</div>
            </div>
          ))}
        </div>
        <p className="gallery-note" style={{ color: 'var(--ivory-dim)' }}>
          Photos are added as the site is documented. Only genuine, unedited site photography is
          published here — no illustrative or AI-generated imagery is shown as completed
          infrastructure.
        </p>
      </div>
    </section>
  )
}
