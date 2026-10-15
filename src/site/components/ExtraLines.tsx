import { useSiteConfig } from "../SiteConfig";

type ExtraLinesProps = {
  section: string;
  dark?: boolean;
};

export default function ExtraLines({ section, dark = false }: ExtraLinesProps) {
  const config = useSiteConfig();
  const lines = (config.extraLines?.[section] ?? []).filter((line) => line.trim());
  if (!lines.length) return null;

  return (
    <div className="extra-lines" style={{ marginTop: "1.25rem" }}>
      {lines.map((line, index) => (
        <p
          key={index}
          style={{
            margin: "0.4rem 0",
            maxWidth: "70ch",
            color: dark ? "var(--ivory-dim)" : "#4a433a",
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
