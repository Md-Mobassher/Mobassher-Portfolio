// Breadcrumb configuration for dynamic route mapping
export const breadcrumbConfig: Record<
  string,
  { label: string; title?: string; hasPage?: boolean }
> = {
  // About section
  about: { label: "About", title: "ABOUT", hasPage: false },
  "who-we-are": { label: "Who We Are", title: "WHO WE ARE", hasPage: true },
  "board-of-directors": {
    label: "Board Of Directors",
    title: "BOARD OF DIRECTORS",
    hasPage: true,
  },
  "board-of-advisors": {
    label: "Board Of Advisors",
    title: "BOARD OF ADVISORS",
    hasPage: true,
  },
  "executive-directors": {
    label: "Executive Directors",
    title: "EXECUTIVE DIRECTORS",
    hasPage: true,
  },
  "research-team": {
    label: "Research Team",
    title: "RESEARCH TEAM",
    hasPage: true,
  },
  team: {
    label: "Other Team Members",
    title: "OTHER TEAM MEMBERS",
    hasPage: true,
  },

  // Publications section
  publications: {
    label: "Publications",
    title: "PUBLICATIONS",
    hasPage: false,
  },
  handbook: { label: "Handbook", title: "HANDBOOK", hasPage: true },
  reports: { label: "Reports", title: "REPORTS", hasPage: true },
  newsletter: { label: "Newsletter", title: "NEWSLETTER", hasPage: true },
  books: { label: "Books", title: "BOOKS", hasPage: true },
  journal: { label: "Journal", title: "JOURNAL", hasPage: true },

  // Events section
  events: { label: "Events", title: "EVENTS", hasPage: false },
  "upcoming-events": {
    label: "Upcoming Events",
    title: "UPCOMING EVENTS",
    hasPage: true,
  },
  workshops: { label: "Workshops", title: "WORKSHOPS", hasPage: true },
  "public-lecture": {
    label: "Public Lecture",
    title: "PUBLIC LECTURE",
    hasPage: true,
  },
  "policy-dialogue": {
    label: "Policy Dialogue",
    title: "POLICY DIALOGUE",
    hasPage: true,
  },
  seminars: { label: "Seminars", title: "SEMINARS", hasPage: true },

  // Research section
  research: { label: "Research", title: "RESEARCH", hasPage: true },

  // Other sections
  "contact-us": { label: "Contact Us", title: "CONTACT US", hasPage: true },
  videos: { label: "Videos", title: "VIDEOS", hasPage: true },
  donate: { label: "Donate", title: "DONATE", hasPage: true },
  "terms-and-conditions": {
    label: "Terms And Conditions",
    title: "TERMS & CONDITIONS",
    hasPage: true,
  },
};

// Helper function to add new routes
export const addBreadcrumbRoute = (
  path: string,
  config: { label: string; title?: string; hasPage?: boolean }
) => {
  breadcrumbConfig[path] = config;
};

// Helper function to get breadcrumb config for a path
export const getBreadcrumbConfig = (path: string) => {
  return breadcrumbConfig[path];
};
