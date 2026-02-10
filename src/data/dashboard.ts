/**
 * Dashboard mock data — separated from marketing constants.
 * All data is static for template demonstration purposes.
 */

export const MONTHLY_METRICS = [
  { month: "Mar", fillRate: 84, openPositions: 72, hires: 28 },
  { month: "Apr", fillRate: 86, openPositions: 78, hires: 31 },
  { month: "May", fillRate: 85, openPositions: 81, hires: 29 },
  { month: "Jun", fillRate: 88, openPositions: 74, hires: 35 },
  { month: "Jul", fillRate: 87, openPositions: 69, hires: 33 },
  { month: "Aug", fillRate: 89, openPositions: 82, hires: 37 },
  { month: "Sep", fillRate: 88, openPositions: 88, hires: 36 },
  { month: "Oct", fillRate: 90, openPositions: 85, hires: 39 },
  { month: "Nov", fillRate: 89, openPositions: 90, hires: 38 },
  { month: "Dec", fillRate: 91, openPositions: 92, hires: 41 },
  { month: "Jan", fillRate: 90, openPositions: 94, hires: 40 },
  { month: "Feb", fillRate: 91, openPositions: 96, hires: 43 },
] as const;

export const PIPELINE_STAGES = [
  { stage: "Requisition", count: 96 },
  { stage: "Screening", count: 72 },
  { stage: "Interview", count: 48 },
  { stage: "Offer", count: 24 },
  { stage: "Onboarding", count: 18 },
] as const;

export const POSITIONS_TABLE = [
  {
    id: "POS-001",
    title: "Cybersecurity Analyst",
    region: "Northeast",
    status: "interview",
    daysOpen: 12,
    clearance: "Secret",
    recruiter: "Sarah Chen",
  },
  {
    id: "POS-002",
    title: "Systems Engineer",
    region: "Southeast",
    status: "offer",
    daysOpen: 8,
    clearance: "Top Secret",
    recruiter: "Marcus Williams",
  },
  {
    id: "POS-003",
    title: "Program Analyst",
    region: "Midwest",
    status: "screening",
    daysOpen: 21,
    clearance: "Public Trust",
    recruiter: "Rachel Kim",
  },
  {
    id: "POS-004",
    title: "Network Administrator",
    region: "West",
    status: "onboarding",
    daysOpen: 3,
    clearance: "Secret",
    recruiter: "Lisa Torres",
  },
  {
    id: "POS-005",
    title: "Data Analyst",
    region: "Southwest",
    status: "requisition",
    daysOpen: 45,
    clearance: "TS/SCI",
    recruiter: "David Park",
  },
  {
    id: "POS-006",
    title: "Logistics Specialist",
    region: "Southeast",
    status: "interview",
    daysOpen: 15,
    clearance: "Public Trust",
    recruiter: "Marcus Williams",
  },
  {
    id: "POS-007",
    title: "Program Manager",
    region: "Northeast",
    status: "screening",
    daysOpen: 28,
    clearance: "Top Secret",
    recruiter: "Sarah Chen",
  },
  {
    id: "POS-008",
    title: "Intelligence Analyst",
    region: "West",
    status: "offer",
    daysOpen: 6,
    clearance: "TS/SCI",
    recruiter: "Lisa Torres",
  },
  {
    id: "POS-009",
    title: "IT Project Lead",
    region: "Midwest",
    status: "interview",
    daysOpen: 18,
    clearance: "Secret",
    recruiter: "Rachel Kim",
  },
  {
    id: "POS-010",
    title: "Contracting Officer Rep",
    region: "Southwest",
    status: "requisition",
    daysOpen: 32,
    clearance: "Secret",
    recruiter: "David Park",
  },
  {
    id: "POS-011",
    title: "Financial Analyst",
    region: "Northeast",
    status: "onboarding",
    daysOpen: 2,
    clearance: "Public Trust",
    recruiter: "Sarah Chen",
  },
  {
    id: "POS-012",
    title: "Training Specialist",
    region: "Southeast",
    status: "screening",
    daysOpen: 19,
    clearance: "Secret",
    recruiter: "Marcus Williams",
  },
  {
    id: "POS-013",
    title: "Security Engineer",
    region: "West",
    status: "interview",
    daysOpen: 11,
    clearance: "Top Secret",
    recruiter: "Lisa Torres",
  },
  {
    id: "POS-014",
    title: "Operations Analyst",
    region: "Midwest",
    status: "offer",
    daysOpen: 5,
    clearance: "Public Trust",
    recruiter: "Rachel Kim",
  },
  {
    id: "POS-015",
    title: "Communications Lead",
    region: "Southwest",
    status: "requisition",
    daysOpen: 38,
    clearance: "Secret",
    recruiter: "David Park",
  },
] as const;

export const REGION_DETAILS = [
  {
    name: "Northeast",
    code: "NE",
    states: 9,
    openPositions: 24,
    fillRate: 92,
    avgDaysOpen: 11,
    trend: [18, 22, 20, 24, 21, 24],
    topRole: "Cybersecurity Analyst",
    totalFilled: 156,
  },
  {
    name: "Southeast",
    code: "SE",
    states: 12,
    openPositions: 18,
    fillRate: 88,
    avgDaysOpen: 14,
    trend: [15, 17, 16, 19, 18, 18],
    topRole: "Logistics Specialist",
    totalFilled: 128,
  },
  {
    name: "Midwest",
    code: "MW",
    states: 12,
    openPositions: 8,
    fillRate: 94,
    avgDaysOpen: 9,
    trend: [10, 9, 8, 7, 9, 8],
    topRole: "Program Analyst",
    totalFilled: 98,
  },
  {
    name: "Southwest",
    code: "SW",
    states: 6,
    openPositions: 31,
    fillRate: 82,
    avgDaysOpen: 18,
    trend: [24, 26, 28, 30, 29, 31],
    topRole: "Program Manager",
    totalFilled: 112,
  },
  {
    name: "West",
    code: "W",
    states: 11,
    openPositions: 15,
    fillRate: 90,
    avgDaysOpen: 12,
    trend: [12, 14, 13, 16, 14, 15],
    topRole: "Data Analyst",
    totalFilled: 142,
  },
] as const;

export const CLEARANCE_PIPELINE = [
  {
    type: "Public Trust",
    pending: 12,
    approved: 68,
    processing: 8,
    avgDays: 21,
  },
  { type: "Secret", pending: 18, approved: 42, processing: 12, avgDays: 45 },
  { type: "Top Secret", pending: 8, approved: 15, processing: 6, avgDays: 90 },
  { type: "TS/SCI", pending: 4, approved: 8, processing: 3, avgDays: 120 },
] as const;

export const RECRUITER_METRICS = [
  {
    name: "Sarah Chen",
    filled: 28,
    avgDays: 11,
    satisfaction: 96,
    region: "Northeast",
  },
  {
    name: "Marcus Williams",
    filled: 24,
    avgDays: 13,
    satisfaction: 94,
    region: "Southeast",
  },
  {
    name: "Lisa Torres",
    filled: 22,
    avgDays: 10,
    satisfaction: 98,
    region: "West",
  },
  {
    name: "David Park",
    filled: 19,
    avgDays: 15,
    satisfaction: 91,
    region: "Southwest",
  },
  {
    name: "Rachel Kim",
    filled: 17,
    avgDays: 12,
    satisfaction: 95,
    region: "Midwest",
  },
] as const;

export type PositionStatus =
  | "requisition"
  | "screening"
  | "interview"
  | "offer"
  | "onboarding"
  | "filled";
