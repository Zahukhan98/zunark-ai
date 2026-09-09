import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { SOLUTIONS } from "@/lib/solutions";
import { INDUSTRIES } from "@/lib/industries";
import { CASE_STUDIES } from "@/lib/work";
import { ARTICLES } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/solutions`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/process`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/technology`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${SITE_URL}/solutions/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const workRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...solutionRoutes, ...industryRoutes, ...workRoutes, ...articleRoutes];
}
