import { unstable_cache } from "next/cache";
import { PROFILE } from "@/lib/constants";
import seed from "@/data/scholar-cache.json";

export type ScholarStats = {
  citations: number;
  hIndex: number;
  i10Index: number;
  articles: number;
  updatedAt: string;
  source: "google-scholar" | "cache" | "seed";
  profileUrl: string;
};

const PROFILE_URL =
  PROFILE.scholar ??
  `https://scholar.google.com/citations?user=${PROFILE.scholarId}&hl=en`;

function parseScholarHtml(html: string): Omit<
  ScholarStats,
  "updatedAt" | "source" | "profileUrl"
> | null {
  if (
    /unusual traffic|captcha|automated queries|sorry/i.test(html) &&
    !/gsc_rsb_std/i.test(html)
  ) {
    return null;
  }

  const metricMatches = Array.from(
    html.matchAll(/class="gsc_rsb_std"[^>]*>(\d[\d,]*)<\/td>/gi)
  ).map((m) => Number(m[1].replace(/,/g, "")));

  // Sidebar order: Citations (all), Citations (since), h-index (all),
  // h-index (since), i10-index (all), i10-index (since)
  if (metricMatches.length < 5) return null;

  const citations = metricMatches[0] ?? 0;
  const hIndex = metricMatches[2] ?? 0;
  const i10Index = metricMatches[4] ?? 0;

  const articleRows = Array.from(html.matchAll(/class="gsc_a_tr"/gi)).length;

  return {
    citations,
    hIndex,
    i10Index,
    articles: articleRows || 1,
  };
}

async function scrapeGoogleScholar(
  userId: string
): Promise<Omit<ScholarStats, "updatedAt" | "source" | "profileUrl"> | null> {
  const url = `https://scholar.google.com/citations?user=${userId}&hl=en`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      // Fresh attempt each cache miss; outer unstable_cache controls TTL
      cache: "no-store",
    });

    if (!res.ok) return null;
    const html = await res.text();
    return parseScholarHtml(html);
  } catch {
    return null;
  }
}

async function loadStats(): Promise<ScholarStats> {
  const live = await scrapeGoogleScholar(PROFILE.scholarId);

  if (live) {
    return {
      ...live,
      updatedAt: new Date().toISOString(),
      source: "google-scholar",
      profileUrl: PROFILE_URL,
    };
  }

  return {
    citations: seed.citations,
    hIndex: seed.hIndex,
    i10Index: seed.i10Index,
    articles: seed.articles,
    updatedAt: seed.updatedAt,
    source: seed.source === "seed" ? "seed" : "cache",
    profileUrl: PROFILE_URL,
  };
}

/** Cached Scholar metrics — refreshes about once a day. */
export const getScholarStats = unstable_cache(loadStats, ["google-scholar-stats-v2"], {
  revalidate: 60 * 60 * 24,
  tags: ["scholar"],
});
