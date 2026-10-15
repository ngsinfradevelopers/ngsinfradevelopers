import { createFileRoute, Outlet } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | NGS Infra Developers" },
      { name: "description", content: "Manage the NGS Infra Developers website content and enquiries." },
      { property: "og:title", content: "Admin Panel | NGS Infra Developers" },
      { property: "og:description", content: "Manage the NGS Infra Developers website." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: () => (
    <div className="admin-shell min-h-screen bg-background text-foreground">
      <Outlet />
      <Toaster />
    </div>
  ),
});
