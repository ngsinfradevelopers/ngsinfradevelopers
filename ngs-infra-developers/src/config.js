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
  exactAddress: "Near JNTUK, Narasaraopet | JNTUN to Minnekallu Road, Thangedumalli, Andhra Pradesh 522603",
  surveyNumber: "21-C1",
  // Google Maps embed built from the shared location (Plus Code 4XRW+5W3, Thangedumalli).
  // Replace with a client-confirmed pin if the exact boundary differs.
  googleMapsEmbedURL:
    "https://www.google.com/maps?q=4XRW%2B5W3+Thangedumalli+Andhra+Pradesh+522603&output=embed",
  googleMapsDirectionsURL:
    "https://www.google.com/maps/search/?api=1&query=4XRW%2B5W3+Thangedumalli+Andhra+Pradesh+522603",

  // Media — replace with real, licensed assets before launch.
  // Leave projectVideoURL empty to show the static hero image instead of a video.
  projectVideoURL: "",
  heroImage: "/assets/layout-plan.png",
  logo: "/assets/logo.png",
  layoutPlanImage: "/assets/layout-plan.png",

  // Founder — replace photo + copy with confirmed details from the client.
  founder: {
    name: "Shaik Nagur",
    role: "Founder & Managing Partner",
    photo: "", // add a real photo path here, e.g. "/assets/founder.jpg"
    bio: "Shaik Nagur founded NGS Infra Developers with a simple goal: make land ownership near Narasaraopet's education corridor straightforward and transparent. The company plans and develops residential plotted layouts with usable roads, clear plot demarcation and honest information for every buyer, backed by a registered establishment under the AP Labour Department.",
  },

  // Site photographs — six labelled slots as requested. These are placeholders;
  // swap the `src` for real, unedited site photography before publishing so the
  // gallery never shows illustrative or AI-generated imagery as if it were built.
  sitePhotos: [
    { id: 1, label: "Site entrance", src: "" },
    { id: 2, label: "Approach road", src: "" },
    { id: 3, label: "Plot rows", src: "" },
    { id: 4, label: "Drone view", src: "" },
    { id: 5, label: "Layout signage", src: "" },
    { id: 6, label: "Surrounding greenery", src: "" },
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
    instagram: "#",
    youtube: "#",
    facebook: "#",
  },
}

export default config
