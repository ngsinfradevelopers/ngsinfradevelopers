import { createContext, useContext, type ReactNode } from "react";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import defaultConfig, { type SiteConfig } from "./defaultConfig";

export type { SiteConfig };
export { defaultConfig };

export const SITE_CONTENT_ID = "main";

/** Merge saved content over defaults so newly added fields always have a value. */
export function mergeConfig(saved: unknown): SiteConfig {
  const s = (saved && typeof saved === "object" ? saved : {}) as Partial<SiteConfig>;
  return {
    ...defaultConfig,
    ...s,
    founder: { ...defaultConfig.founder, ...(s.founder ?? {}) },
    registration: { ...defaultConfig.registration, ...(s.registration ?? {}) },
    socialMediaLinks: { ...defaultConfig.socialMediaLinks, ...(s.socialMediaLinks ?? {}) },
    sitePhotos: Array.isArray(s.sitePhotos) ? s.sitePhotos : defaultConfig.sitePhotos,
    facilities: Array.isArray(s.facilities) ? s.facilities : defaultConfig.facilities,
    extraLines:
      s.extraLines && typeof s.extraLines === "object" && !Array.isArray(s.extraLines)
        ? Object.fromEntries(
            Object.entries(s.extraLines).map(([section, lines]) => [
              section,
              Array.isArray(lines) ? lines.filter((line): line is string => typeof line === "string") : [],
            ]),
          )
        : defaultConfig.extraLines,
  } as SiteConfig;
}

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: async (): Promise<SiteConfig> => {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", SITE_CONTENT_ID)
      .maybeSingle();
    if (error) {
      console.error("Failed to load site content", error);
      return defaultConfig;
    }
    return mergeConfig(data?.data);
  },
});

const Ctx = createContext<SiteConfig>(defaultConfig);

export function SiteConfigProvider({ value, children }: { value: SiteConfig; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteConfig() {
  return useContext(Ctx);
}
