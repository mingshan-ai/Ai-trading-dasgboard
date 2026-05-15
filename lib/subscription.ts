import { auth } from "@/lib/auth";

export type PlanType = "FREE" | "BASIC" | "PRO";

const PLAN_ORDER: PlanType[] = ["FREE", "BASIC", "PRO"];

export function canAccessPlan(userPlan: PlanType, requiredPlan: PlanType): boolean {
  return PLAN_ORDER.indexOf(userPlan) >= PLAN_ORDER.indexOf(requiredPlan);
}

export function getRequiredPlan(pathname: string): PlanType | null {
  const planMap: Record<string, PlanType> = {
    "/": "FREE",
    "/stocks": "BASIC",
    "/options": "BASIC",
    "/greeks": "PRO",
    "/strategy": "PRO",
    "/review": "PRO",
    "/performance": "PRO",
  };

  // Find the most specific match
  const matchedKey = Object.keys(planMap)
    .sort((a, b) => b.length - a.length)
    .find((key) => {
      if (key === "/") return pathname === "/";
      return pathname.startsWith(key);
    });

  return matchedKey ? planMap[matchedKey] : null;
}

export async function getUserPlan(email: string): Promise<PlanType> {
  const session = await auth();
  if (!session?.user?.email || session.user.email !== email) {
    return "FREE";
  }
  return (session.user.plan as PlanType) || "FREE";
}

export const PLAN_LABELS: Record<PlanType, string> = {
  FREE: "Free",
  BASIC: "Basic",
  PRO: "Pro",
};
