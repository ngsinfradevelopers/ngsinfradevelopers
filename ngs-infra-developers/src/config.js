// ─────────────────────────────────────────────────────────────
// NGS INFRA DEVELOPERS — central configuration
// Edit the values below to update the whole site. Nothing else
// in the codebase should need to change for routine content edits.
// ─────────────────────────────────────────────────────────────

const config = {
  businessName: "NGS Infra Developers",
  tagline: "Never Gonna Stops",
  projectName: "Poorna Gardens",

  // Contact
  phoneNumberPrimary: "9705813444",
  phoneNumberSecondary: "9666728686",
  whatsappNumber: "9666728686", // used for the floating WhatsApp button + enquiry links
  email: "ngsinfradevelopers1@gmail.com",

  // Location
  locationName: "NGS Infra Developers — Exact Location",
  exactAddress: "NGS INFRA DEVELOPERS, 16.1405589, 79.9974128, Thangedumalli, Andhra Pradesh 522603",
  surveyNumber: "21-C1",
  // Google Maps location supplied for the project.
  googleMapsEmbedURL:
    "https://www.google.com/maps?q=NGS+INFRA+DEVELOPERS&output=embed",
  googleMapsDirectionsURL:
    "https://maps.app.goo.gl/JrtsvahrbPiLVZwV8?g_st=ac",

  // Media — replace with real, licensed assets before launch.
  // Leave projectVideoURL empty to show the static hero image instead of a video.
  projectVideoURL: "/assets/ngsinfradevelopers.mp4",
  heroImage: "/assets/layout-plan.png",
  logo: "/assets/logo.png",
  layoutPlanImage: "/assets/layout-plan.png",

  // Founder profile.
  founder: {
    name: "Shaik Nagur",
    role: "Founder, Chairman and Managing Director",
    photo: "/assets/founder.jpeg",
    bio: "Shaik Nagur founded NGS Infra Developers with a clear commitment to making residential land ownership near Narasaraopet more transparent, accessible and dependable. Under his leadership, the company focuses on thoughtfully planned plotted developments, practical infrastructure and clear communication, helping buyers make confident long-term property decisions.",
  },

  // Site photographs supplied for the gallery.
  sitePhotos: [
    { id: 1, label: "Site photograph 1", src: "/assets/site1.jpeg" },
    { id: 2, label: "Site photograph 2", src: "/assets/site2.jpeg" },
    { id: 3, label: "Site photograph 3", src: "/assets/site3.jpeg" },
    { id: 4, label: "Site photograph 4", src: "/assets/site4.jpeg" },
    { id: 5, label: "Site photograph 5", src: "/assets/site5.jpeg" },
  ],

  // Facilities / highlights — shown once as detailed cards, and again as a
  // condensed recap list in the footer.
  facilities: [
    {
      title: "Opposite JNTUK Narasaraopet",
      description: "Positioned on the road directly facing the JNTUK Narasaraopet campus gate.",
    },
    {
      title: "Close to NH 544-D",
      description: "Short access run to the NH 544-D national highway for regional connectivity.",
    },
    {
      title: "Kotappakonda in view",
      description: "Open sightlines toward the Kotappakonda hill shrine from the layout.",
    },
    {
      title: "30 ft wide roads",
      description: "Tarred internal roads at 30 feet wide, with electricity lines laid alongside.",
    },
    {
      title: "Student housing nearby",
      description: "A dedicated hostel building for JNTU students is planned in the vicinity.",
    },
    {
      title: "Quiet, green setting",
      description: "Low-density surroundings suited to long-term residential living.",
    },
  ],

  // Documentation — keep this conservative until the client supplies
  // title-verification paperwork (see note in the chat response).
  documentationClaim: "Documentation available on enquiry",

  // Registration shown as a trust badge — NOT a real-estate/RERA approval.
  registration: {
    label: "Registered Establishment",
    authority: "AP Labour Department — Shops & Establishments Act, 1988",
    number: "LIN: AP-22-14-009-04432897",
  },

  socialMediaLinks: {
    instagram: "https://www.instagram.com/ngs_infra_developers_?stkn=OWhnMHFldWM0N2du&utm_source=qr",
    youtube: "https://www.youtube.com/@NgsInfraDevelopers",
    facebook: "https://www.facebook.com/profile.php?id=61594260598601",
  },

  bToPNexusURL: "https://btopnexus.vercel.app/",
}

export default config
