// src/data/structuredData.ts
// Single source of truth for the site-wide JSON-LD knowledge @graph.
// Generated from cvData so the structured data can never drift out of sync
// with the real project / experience list (audit GEO-2). The Vite plugin in
// vite.config.ts injects the output into every prerendered page's <head>.
import { cvData } from "./cvData";
import { generateSlug } from "../utils/slug";
import { SITE_NAME, SITE_URL } from "../utils/site";

type GraphNode = Record<string, unknown>;

const PERSON_ID = `${SITE_URL}/#person`;

const detailUrl = (value: string) => `${SITE_URL}/portfolio/${generateSlug(value)}`;

const personNode: GraphNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: cvData.profile.name,
  jobTitle: cvData.profile.subtitle,
  url: `${SITE_URL}/`,
  sameAs: [
    "https://www.linkedin.com/in/gustavo-francisco-salgado-andrade-496553337",
    "https://github.com/FranGuh",
  ],
};

const websiteNode: GraphNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": PERSON_ID },
  inLanguage: ["es", "en"],
};

// A deployed project links to its live app; everything else points at its
// prerendered detail page so every entry exposes a resolvable URL.
const projectNodes: GraphNode[] = cvData.projects.map((project) => ({
  "@type": project.link ? "WebApplication" : "SoftwareApplication",
  name: project.title,
  description: project.description,
  url: project.link ?? detailUrl(project.title),
  ...(project.link ? { sameAs: detailUrl(project.title) } : {}),
  keywords: project.techStack.join(", "),
  author: { "@id": PERSON_ID },
}));

// Experience roles are modelled as the web product built during the role: the
// company is the product name and the role is carried in the description.
const experienceNodes: GraphNode[] = cvData.experience.map((experience) => ({
  "@type": experience.link ? "WebApplication" : "SoftwareApplication",
  name: experience.company,
  description: `${experience.role} — ${experience.description}`,
  url: experience.link ?? detailUrl(experience.role),
  ...(experience.link ? { sameAs: detailUrl(experience.role) } : {}),
  keywords: experience.techStack.join(", "),
  author: { "@id": PERSON_ID },
}));

export const buildPortfolioGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [personNode, websiteNode, ...projectNodes, ...experienceNodes],
});

export const portfolioJsonLd = () => JSON.stringify(buildPortfolioGraph());
