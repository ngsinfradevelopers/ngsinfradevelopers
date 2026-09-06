# NGS Infra Developers — Single-Page Website

A single-page (no navigation, no routing) React + Vite site for NGS Infra Developers / Poorna Gardens.

## Run it

```
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Edit content

Almost everything editable lives in `src/config.js`: phone numbers, email, address,
Google Maps link, founder details, facilities list, the six gallery photo slots, and
social links. Change values there rather than in the components.

## Before you launch

- **Hero video**: set `projectVideoURL` in `config.js` to an .mp4 URL. Until then the
  hero shows the layout image as a static background.
- **Founder photo**: add a real photo to `public/assets/` and set `founder.photo` in
  `config.js`. Right now it shows an initial-letter placeholder.
- **Site photos**: the gallery has six labelled slots (`sitePhotos` in `config.js`) that
  currently show "photo pending" placeholders. Add genuine, unedited site photography —
  do not substitute illustrative or AI-generated images.
- **Documentation claim**: the footer currently reads "Documentation available on
  enquiry." The certificate you shared registers the business itself (AP Labour Dept,
  Shops & Establishments Act) — it is not a RERA/DTCP land-title approval. Only change
  this to a stronger claim once you have actual title-verification paperwork for the
  land.
- **Social links**: `socialMediaLinks` in `config.js` are placeholders (`#`) — add your
  real Instagram/YouTube/Facebook page URLs.
- **Enquiry form**: currently just shows a success message locally. Wire the fetch
  call in `src/components/EnquiryForm.jsx` to Formspree, Netlify Forms, or emailJS to
  actually receive submissions.
- **Map**: the embed uses the Plus Code you shared. Swap `googleMapsEmbedURL` /
  `googleMapsDirectionsURL` in `config.js` if you get an exact pin from the client.
