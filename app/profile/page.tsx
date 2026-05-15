"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Crown,
  Calendar,
  CreditCard,
  ArrowLeft,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    // Refresh session to get latest plan data
    update().finally(() => setLoading(false));
  }, [update, loading]);

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const plan = (session.user.plan as string) || "FREE";
  const planLabel: Record<string, string> = {
    FREE: "Free Plan",
    BASIC: "Basic Plan - $299/month",
    PRO: "Pro Plan - $599/month",
  };
  const planColor: Record<string, string> = {
    FREE: "text-gray-500 bg-gray-500/10 border-gray-500/20",
    BASIC: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    PRO: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Profile & Settings</h1>
          <p className="text-sm text-gray-500">Manage your account and subscription</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Info Card */}
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <div className="text-white font-medium">
                  {session.user.name || "User"}
                </div>
                <div className="text-sm text-gray-500">{session.user.email}</div>
              </div>
            </div>
            <div className="border-t border-[#1e1e2e] pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Member since:{" "}
                <span className="text-gray-400">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-500" />
            Subscription
          </h2>
          <div className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${planColor[plan]}`}
            >
              <Crown className="w-4 h-4" />
              {planLabel[plan]}
            </div>

            {plan === "FREE" && (
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-3">
                  Upgrade to unlock premium features including real-time quotes,
                  options chain, AI strategies and more.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Crown className="w-4 h-4" />
                  View Plans
                </Link>
              </div>
            )}

            {plan !== "FREE" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Check className="w-4 h-4" />
                  Active subscription
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Manage subscription in Stripe
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Plan Features */}
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Your Plan Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Dashboard Overview", available: true },
              { name: "Full Market Metrics", available: plan !== "FREE" },
              { name: "Watchlist (15 stocks)", available: plan !== "FREE" },
              { name: "Options Chain", available: plan !== "FREE" },
              { name: "Greeks Dashboard", available: plan === "PRO" },
              { name: "AI Strategy", available: plan === "PRO" },
              { name: "Daily Review", available: plan === "PRO" },
              { name: "Performance Analytics", available: plan === "PRO" },
              { name: "Priority Support", available: plan === "PRO" },
            ].map((feature) => (
              <div
                key={feature.name}
                className="flex items-center gap-2 text-sm"
              >
                {feature.available ? (
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-gray-700 shrink-0" />
                )}
                <span
                  className={
                    feature.available ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
