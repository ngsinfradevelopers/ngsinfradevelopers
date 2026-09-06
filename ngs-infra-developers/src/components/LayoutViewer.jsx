import { useRef, useState } from 'react'
import config from '../config'
import { ZoomInIcon, ZoomOutIcon, FullscreenIcon } from './icons'

export default function LayoutViewer() {
  const [zoom, setZoom] = useState(1)
  const frameRef = useRef(null)

  const zoomIn = () => setZoom((z) => Math.min(z + 0.4, 3))
  const zoomOut = () => setZoom((z) => Math.max(z - 0.4, 1))

  const goFullscreen = () => {
    const el = frameRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
  }

  return (
    <section className="section" id="layout">
      <div className="container">
        <p className="eyebrow">Plot layout</p>
        <h2>Explore the project layout</h2>

        <div className="layout-frame" ref={frameRef}>
          <div className="layout-controls">
            <button className="icon-btn" onClick={zoomOut} aria-label="Zoom out">
              <ZoomOutIcon />
            </button>
            <button className="icon-btn" onClick={zoomIn} aria-label="Zoom in">
              <ZoomInIcon />
            </button>
            <button className="icon-btn" onClick={goFullscreen} aria-label="Open fullscreen">
              <FullscreenIcon />
            </button>
          </div>
          <div className="layout-scroll">
            <img
              src={config.layoutPlanImage}
              alt="NGS INFRA DEVELOPERS showing individually numbered plots and road widths"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>

        <div className="layout-caption">
          <span>Drag to pan once zoomed in. Plot numbers and dimensions are marked on the plan.</span>
          <span className="tag">Survey No. {config.surveyNumber}</span>
        </div>
      </div>
    </section>
  )
}
