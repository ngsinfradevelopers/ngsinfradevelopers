// @ts-nocheck
import { useRef, useState } from 'react'
import { useSiteConfig } from '../SiteConfig'
import ExtraLines from './ExtraLines'

export default function Hero() {
  const config = useSiteConfig()
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const playVideo = () => {
    videoRef.current?.play().catch(() => {})
  }

  const pauseVideo = () => {
    videoRef.current?.pause()
  }

  return (
    <section
      className="hero"
      id="home"
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
    >
      {config.projectVideoURL ? (
        <video
          ref={videoRef}
          className="hero-media"
          src={config.projectVideoURL}
          muted
          loop
          playsInline
          preload="metadata"
          poster={config.heroImage}
        />
      ) : (
        <img className="hero-media" src={config.heroImage} alt="" aria-hidden="true" />
      )}
      <div className="hero-scrim" />
      {config.projectVideoURL && (
        <button
          className="hero-sound-toggle"
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Turn video sound on' : 'Mute video sound'}
        >
          {isMuted ? 'Sound on' : 'Mute'}
        </button>
      )}
      <div className="hero-content">
        <img className="hero-crest" src={config.logo} alt={`${config.businessName} crest`} />
        <h1>{config.businessName}</h1>
        <p className="hero-sub">
          {config.heroSubtitle}
        </p>
        <div className="hero-ctas">
          <a className="btn btn-solid" href="#layout">View the layout</a>
          <a className="btn btn-outline" href={`tel:+91${config.phoneNumberPrimary}`}>Call now</a>
        </div>
        <ExtraLines section="general" dark />
      </div>
    </section>
  )
}
