import { auth } from "@/lib/auth";

export type PlanType = "FREE" | "BASIC" | "PRO";

const PLAN_ORDER: PlanType[] = ["FREE", "BASIC", "PRO"];

export function canAccessPlan(userPlan: PlanType, requiredPlan: PlanType): boolean {
  return PLAN_ORDER.indexOf(userPlan) >= PLAN_ORDER.indexOf(requiredPlan);
}

export function getRequiredPlan(pathname: string): PlanType | null {
  // Paywall removed - all pages are free
  return null;
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
