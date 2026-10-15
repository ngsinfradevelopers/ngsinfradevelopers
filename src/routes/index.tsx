import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteConfigProvider, siteContentQuery } from "@/site/SiteConfig";
import Hero from "@/site/components/Hero";
import Founder from "@/site/components/Founder";
import LayoutViewer from "@/site/components/LayoutViewer";
import Facilities from "@/site/components/Facilities";
import Gallery from "@/site/components/Gallery";
import CTABand from "@/site/components/CTABand";
import Footer from "@/site/components/Footer";
import FloatingButtons from "@/site/components/FloatingButtons";

const TITLE = "NGS Infra Developers | Residential Plots Near JNTUK Narasaraopet";
const DESC =
  "Explore residential plot opportunities near JNTUK Narasaraopet with NGS Infra Developers. A strategically located plotted development with wide roads and convenient connectivity.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "A strategically located residential plotted development near JNTUK, Narasaraopet, Andhra Pradesh.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.ngsinfradevelopers.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "NGS Infra Developers",
          image: "/assets/logo.png",
          telephone: "+919705813444",
          email: "ngsinfradevelopers1@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Narasaraopet",
            addressRegion: "Andhra Pradesh",
            postalCode: "522603",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(siteContentQuery);
  return (
    <SiteConfigProvider value={data}>
      <main>
        <Hero />
        <Founder />
        <LayoutViewer />
        <Facilities />
        <Gallery />
        <CTABand />
        <Footer />
        <FloatingButtons />
      </main>
    </SiteConfigProvider>
  );
}
