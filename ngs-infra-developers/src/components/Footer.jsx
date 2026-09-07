import config from '../config'
import EnquiryForm from './EnquiryForm'
import { InstagramIcon, YoutubeIcon, FacebookIcon, PhoneIcon } from './icons'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container section">
        <div className="footer-top">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 style={{ color: 'var(--ivory)' }}>{config.businessName}</h2>
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', marginTop: '0.4rem' }}>
              {config.tagline}
            </p>

            <ul className="contact-list">
              <li>
                <PhoneIcon width="20" height="20" />
                <a href={`tel:+91${config.phoneNumberPrimary}`}>{config.phoneNumberPrimary}</a>
                {' / '}
                <a href={`tel:+91${config.phoneNumberSecondary}`}>{config.phoneNumberSecondary}</a>
              </li>
              <li>
                <span>✉</span>
                <a href={`mailto:${config.email}`}>{config.email}</a>
              </li>
              <li>
                <span>📍</span>
                <span>{config.exactAddress}</span>
              </li>
            </ul>

            <span className="badge">{config.registration.label} — {config.registration.authority}</span>

            <div className="map-label">
              <strong>NGS INFRA DEVELOPERS</strong>
              <span>Site Survey No. 21</span>
              <span>Near JNTUK University College of Engineering</span>
              <span>Narasaraopet, Andhra Pradesh</span>
            </div>
            <div className="map-wrap">
              <iframe
                title={config.locationName}
                src={config.googleMapsEmbedURL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a className="location-button" href={config.googleMapsDirectionsURL} target="_blank" rel="noreferrer">
              {config.locationName}
            </a>

            <div className="socials">
              <a className="social-icon" href={config.socialMediaLinks.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                <InstagramIcon />
              </a>
              <a className="social-icon" href={config.socialMediaLinks.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
                <YoutubeIcon />
              </a>
              <a className="social-icon" href={config.socialMediaLinks.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow">Send an enquiry</p>
            <h2 style={{ color: 'var(--ivory)', fontSize: '1.6rem' }}>Ask about availability</h2>
            <EnquiryForm />
          </div>
        </div>

        <div className="footer-facilities">
          {config.facilities.map((f) => (
            <div key={f.title}>
              <span className="dot">●</span> {f.title}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {config.businessName}. All rights reserved.</span>
          <span>{config.documentationClaim}</span>
          <a className="nexus-credit" href={config.bToPNexusURL} target="_blank" rel="noreferrer">
            Designed by <strong>B TO P NEXUS</strong>
          </a>
        </div>
      </div>
    </footer>
  )
}
