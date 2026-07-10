import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function typeLabel(type: string): string {
  const map: Record<string, string> = {
    code: "Software",
    charity: "Impact",
    mechanical: "Challenge",
    cad: "CAD",
  };
  return map[type] ?? type;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Month index 0–11 + year, e.g. { month: 2, year: 2026 } = Mar 2026 */
export type MonthYear = { month: number; year: number };

function toIndex(d: MonthYear): number {
  return d.year * 12 + d.month;
}

function formatMonthYear(d: MonthYear): string {
  return `${MONTHS[d.month]} ${d.year}`;
}

/** Inclusive month span, LinkedIn-style (same month = 1 mo). */
export function formatDuration(start: MonthYear, end: MonthYear = nowMonthYear()): string {
  const months = Math.max(1, toIndex(end) - toIndex(start) + 1);
  const years = Math.floor(months / 12);
  const rem = months % 12;

  if (years === 0) return `${rem} mo${rem === 1 ? "" : "s"}`;
  if (rem === 0) return `${years} yr${years === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"} ${rem} mo${rem === 1 ? "" : "s"}`;
}

export function nowMonthYear(): MonthYear {
  const n = new Date();
  return { month: n.getMonth(), year: n.getFullYear() };
}

export function formatPeriod(start: MonthYear, end: MonthYear | null): string {
  const startLabel = formatMonthYear(start);
  if (!end) return `${startLabel} - Present`;
  return `${startLabel} - ${formatMonthYear(end)}`;
}

export function companyDuration(
  roles: { start: MonthYear; end: MonthYear | null }[]
): string {
  if (roles.length === 0) return "";
  let earliest = toIndex(roles[0].start);
  let latest = roles[0].end ? toIndex(roles[0].end) : toIndex(nowMonthYear());

  for (const role of roles) {
    earliest = Math.min(earliest, toIndex(role.start));
    const roleEnd = role.end ? toIndex(role.end) : toIndex(nowMonthYear());
    latest = Math.max(latest, roleEnd);
  }

  const start: MonthYear = {
    year: Math.floor(earliest / 12),
    month: earliest % 12,
  };
  const end: MonthYear = {
    year: Math.floor(latest / 12),
    month: latest % 12,
  };
  return formatDuration(start, end);
}
