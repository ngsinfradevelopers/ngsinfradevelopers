import config from '../config'

export default function CTABand() {
  return (
    <section className="cta-band">
      <h2>Find your plot near JNTUK</h2>
      <p>
        Talk to {config.businessName} about layout availability, pricing and plot sizes at{' '}
        {config.projectName}.
      </p>
      <div className="cta-ctas">
        <a className="btn btn-solid" href={`tel:+91${config.phoneNumberPrimary}`}>Call now</a>
        <a className="btn btn-outline" href="#contact">Enquire now</a>
      </div>
    </section>
  )
}
