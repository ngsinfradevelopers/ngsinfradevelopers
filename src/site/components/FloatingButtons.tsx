// @ts-nocheck
import { useSiteConfig } from '../SiteConfig'
import { WhatsAppIcon, PhoneIcon } from './icons'

export default function FloatingButtons() {
  const config = useSiteConfig()
  return (
    <>
      <a
        className="whatsapp-float"
        href={`https://wa.me/91${config.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <a
        className="call-float"
        href={`tel:+91${config.phoneNumberPrimary}`}
        aria-label="Call now"
      >
        <PhoneIcon width="22" height="22" />
      </a>
    </>
  )
}
