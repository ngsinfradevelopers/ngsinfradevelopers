import config from '../config'

export default function Hero() {
  return (
    <section className="hero" id="home">
      {config.projectVideoURL ? (
        <video
          className="hero-media"
          src={config.C:\BALA PRASAN\FREELANCE 3\ngs-infra-developers\ngs-infra-developers\public\assets\ngsinfradevelopers.mp4}
          autoPlay
          muted
          loop
          playsInline
          poster={config.heroImage}
        />
      ) : (
        <img className="hero-media" src={config.heroImage} alt="" aria-hidden="true" />
      )}
      <div className="hero-scrim" />
      <div className="hero-content">
        <img className="hero-crest" src={config.logo} alt={`${config.businessName} crest`} />
        <h1>Residential plots, right opposite JNTUK Narasaraopet</h1>
        <p className="hero-sub">
          {config.projectName} is a plotted development on the JNTUK–Narasaraopet road, laid out
          with 30 ft roads and clear plot numbering, close to the NH 544-D corridor.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-solid" href="#layout">View the layout</a>
          <a className="btn btn-outline" href={`tel:+91${config.phoneNumberPrimary}`}>Call now</a>
        </div>
      </div>
    </section>
  )
}
