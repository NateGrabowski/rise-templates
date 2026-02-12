export const SITE_NAME = "RISE";
export const SITE_DESCRIPTION =
  "Regional Information System Enterprise — Operational visibility across all task order regions.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const DASHBOARD_LINKS = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Regions", href: "/dashboard/regions", icon: "Map" },
  { label: "Positions", href: "/dashboard/positions", icon: "Users" },
  { label: "Reports", href: "/dashboard/reports", icon: "BarChart3" },
] as const;

export const SOCIAL_LINKS = {
  twitter: "#",
  github: "#",
  linkedin: "#",
} as const;

export const REGIONS = [
  { name: "Northeast", states: 9, status: "high" as const, openPositions: 24 },
  {
    name: "Southeast",
    states: 12,
    status: "medium" as const,
    openPositions: 18,
  },
  { name: "Midwest", states: 12, status: "low" as const, openPositions: 8 },
  { name: "Southwest", states: 6, status: "high" as const, openPositions: 31 },
  { name: "West", states: 11, status: "medium" as const, openPositions: 15 },
] as const;

export const HERO_STATS = [
  { label: "Open Positions", value: "96" },
  { label: "Avg Days Open", value: "14" },
  { label: "New Hires (30d)", value: "43" },
  { label: "Fill Rate", value: "91%" },
] as const;

export const FEATURES = [
  {
    title: "Regional Tracking",
    description:
      "Interactive US map with real-time status by region. Drill into state-level detail with a single click.",
    icon: "Map",
  },
  {
    title: "Analytics & Reports",
    description:
      "Position pipeline metrics, fill rates, and trend analysis. Export to Power BI or download as PDF.",
    icon: "BarChart3",
  },
  {
    title: "Real-Time Pipeline",
    description:
      "Track every position from requisition to onboarding. Automated status updates and recruiter assignment.",
    icon: "Activity",
  },
  {
    title: "Security Clearance",
    description:
      "Monitor clearance processing timelines and bottlenecks. Expedited workflow alerts.",
    icon: "Shield",
  },
  {
    title: "Training Coordination",
    description:
      "Schedule orientations, briefings, and quarterly reviews. Calendar sync and automated reminders.",
    icon: "GraduationCap",
  },
  {
    title: "Travel Management",
    description:
      "Coordinate regional travel for new hires and site visits. Budget tracking and approval workflows.",
    icon: "Plane",
  },
] as const;

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "For small task orders with a single region.",
    features: [
      "1 region",
      "Up to 50 positions",
      "Basic analytics",
      "Email support",
      "Monthly reports",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$1,299",
    period: "/month",
    description: "For multi-region operations with full pipeline visibility.",
    features: [
      "Up to 3 regions",
      "Unlimited positions",
      "Advanced analytics & Power BI",
      "Priority support",
      "Real-time dashboards",
      "Security clearance tracking",
      "Custom reports",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For nationwide operations with dedicated support.",
    features: [
      "All 5 regions",
      "Unlimited everything",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
      "On-premise deployment option",
      "SLA guarantee",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

export const BLOG_POSTS = [
  {
    title: "Modernizing Federal Workforce Management",
    excerpt:
      "How RISE is transforming the way government contractors track and manage their staffing pipelines across regions.",
    category: "Product",
    date: "Jan 28, 2026",
    author: "Sarah Chen",
  },
  {
    title: "Q4 2025 Fill Rate Analysis",
    excerpt:
      "A deep dive into fill rate trends across all five regions, with insights on what's driving improvement.",
    category: "Analytics",
    date: "Jan 15, 2026",
    author: "Marcus Williams",
  },
  {
    title: "Security Clearance Processing: Best Practices",
    excerpt:
      "Tips for reducing clearance processing times and avoiding common bottlenecks in the pipeline.",
    category: "Operations",
    date: "Jan 8, 2026",
    author: "David Park",
  },
  {
    title: "New Feature: Real-Time Regional Alerts",
    excerpt:
      "Introducing automated alerts for critical position thresholds and clearance deadlines.",
    category: "Product",
    date: "Dec 20, 2025",
    author: "Sarah Chen",
  },
  {
    title: "Building a Data-Driven Recruitment Strategy",
    excerpt:
      "How to leverage RISE analytics to optimize recruiter allocation and reduce time-to-fill.",
    category: "Strategy",
    date: "Dec 12, 2025",
    author: "Lisa Torres",
  },
  {
    title: "Year in Review: 2025 by the Numbers",
    excerpt:
      "A look back at the positions filled, regions served, and milestones achieved in our biggest year yet.",
    category: "Company",
    date: "Dec 1, 2025",
    author: "Marcus Williams",
  },
] as const;

export const DASHBOARD_STATS = [
  { label: "Open Positions", value: "96", change: "+12%", icon: "Users" },
  { label: "Avg Days Open", value: "14", change: "-8%", icon: "Clock" },
  { label: "New Hires (30d)", value: "43", change: "+23%", icon: "UserPlus" },
  { label: "Fill Rate", value: "91%", change: "+5%", icon: "TrendingUp" },
] as const;

export const RECENT_ACTIVITY = [
  {
    action: "Position Filled",
    detail: "Cybersecurity Analyst — Northeast Region",
    time: "2 hours ago",
  },
  {
    action: "Interview Scheduled",
    detail: "Logistics Specialist — Southwest Region",
    time: "4 hours ago",
  },
  {
    action: "New Opening",
    detail: "Program Manager — West Region",
    time: "6 hours ago",
  },
  {
    action: "Clearance Approved",
    detail: "Systems Engineer — Southeast Region",
    time: "8 hours ago",
  },
  {
    action: "Offer Extended",
    detail: "Data Analyst — Midwest Region",
    time: "12 hours ago",
  },
] as const;

export const COMPANY_TIMELINE = [
  {
    year: "2023",
    title: "Founded",
    description:
      "Launched with a mission to modernize federal workforce tracking through a single unified interface.",
  },
  {
    year: "2024",
    title: "First Federal Deployment",
    description:
      "Deployed across 2 regions supporting 5,000+ positions for Army National Guard training contracts.",
  },
  {
    year: "2025",
    title: "5 Regions Live",
    description:
      "Expanded to all 5 CONUS regions, tracking 10,000+ positions with 91% fill rate.",
  },
  {
    year: "2026",
    title: "FedRAMP In Progress",
    description:
      "Authorization underway. 50+ agency partnerships. Real-time analytics across all contract vehicles.",
  },
] as const;

export const TRUSTED_BY = [
  "PENTAGON SYSTEMS",
  "NORTHSTAR DEFENSE",
  "VANGUARD TECH",
  "CENTURION GROUP",
  "AEGIS SOLUTIONS",
  "SUMMIT FEDERAL",
  "REDSTONE ANALYTICS",
  "TRIDENT CONSULTING",
] as const;

export const SHOWCASE_FEATURES = [
  {
    title: "Regional Command Map",
    desc: "Interactive status across all 5 CONUS regions. Drill from national overview to state-level detail in one click.",
    icon: "Map" as const,
    accent: "#3b82f6",
    accentLight: "#60a5fa",
    iconClass: "bg-blue-500/15 text-blue-400",
  },
  {
    title: "Analytics & Reports",
    desc: "Pipeline metrics, fill rates, trend analysis. Export to Power BI or download executive briefings as PDF.",
    icon: "BarChart3" as const,
    accent: "#22d3ee",
    accentLight: "#67e8f9",
    iconClass: "bg-cyan-500/15 text-cyan-400",
  },
  {
    title: "Real-Time Pipeline",
    desc: "Track every position from requisition through onboarding. Automated status updates and recruiter assignment.",
    icon: "Activity" as const,
    accent: "#10b981",
    accentLight: "#34d399",
    iconClass: "bg-emerald-500/15 text-emerald-400",
  },
  {
    title: "Security & Training",
    desc: "Monitor clearance processing timelines, schedule orientations, and track training compliance across all regions.",
    icon: "Shield" as const,
    accent: "#8b5cf6",
    accentLight: "#a78bfa",
    iconClass: "bg-violet-500/15 text-violet-400",
  },
];

export const FOOTER_RESOURCES = [
  { label: "Documentation", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Status Page", href: "#" },
  { label: "Changelog", href: "#" },
] as const;
