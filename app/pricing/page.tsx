"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Check, X, ArrowLeft, Crown, TrendingUp, Brain } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";

const plans = [
  {
    name: "Free",
    nameCn: "免费体验",
    price: "$0",
    period: "",
    description: "Get started with basic market overview",
    features: [
      { name: "Dashboard Overview", included: true },
      { name: "Key Market Metrics", included: true },
      { name: "Market Structure View", included: true },
      { name: "Watchlist (3 stocks)", included: true },
      { name: "Options Chain", included: false },
      { name: "Greeks Dashboard", included: false },
      { name: "AI Strategy", included: false },
      { name: "Daily Review", included: false },
      { name: "Performance Analytics", included: false },
    ],
    cta: "Current Plan",
    highlighted: false,
    icon: Zap,
    style: "border-[#1e1e2e]",
  },
  {
    name: "Basic",
    nameCn: "基础版",
    price: "$299",
    period: "/month",
    description: "Real-time quotes and options data",
    features: [
      { name: "Dashboard Overview", included: true },
      { name: "Full Market Metrics", included: true },
      { name: "Market Structure View", included: true },
      { name: "Watchlist (15 stocks)", included: true },
      { name: "Options Chain (Basic)", included: true },
      { name: "Greeks Dashboard", included: false },
      { name: "AI Strategy", included: false },
      { name: "Daily Review", included: false },
      { name: "Performance Analytics", included: false },
    ],
    cta: "Upgrade to Basic",
    highlighted: false,
    icon: TrendingUp,
    style: "border-[#1e1e2e]",
  },
  {
    name: "Pro",
    nameCn: "专业版",
    price: "$599",
    period: "/month",
    description: "Full access with AI-powered strategies",
    features: [
      { name: "Dashboard Overview", included: true },
      { name: "Full Market Metrics", included: true },
      { name: "Market Structure View", included: true },
      { name: "Watchlist (15 stocks)", included: true },
      { name: "Options Chain (Full)", included: true },
      { name: "Greeks Dashboard", included: true },
      { name: "AI Strategy", included: true },
      { name: "Daily Review", included: true },
      { name: "Performance Analytics", included: true },
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
    icon: Brain,
    style: "border-blue-500/50",
  },
];

function PricingContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const userPlan = (session?.user?.plan as string) || "FREE";

  const handleSubscribe = async (planName: string) => {
    if (!session) {
      router.push("/login?callbackUrl=/pricing");
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Failed to initiate checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Unlock premium features to elevate your trading. Cancel anytime.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan =
              (plan.name === "FREE" && userPlan === "FREE") ||
              (plan.name === "BASIC" && userPlan === "BASIC") ||
              (plan.name === "PRO" && userPlan === "PRO");
            const isDowngrade =
              (plan.name === "FREE" && userPlan !== "FREE") ||
              (plan.name === "BASIC" && userPlan === "PRO");

            return (
              <div
                key={plan.name}
                className={`relative bg-[#0d0d14] rounded-2xl border ${plan.style} ${
                  plan.highlighted
                    ? "shadow-lg shadow-blue-500/10"
                    : ""
                } p-6 lg:p-8 flex flex-col`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.highlighted
                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                          : "bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${plan.highlighted ? "text-white" : "text-gray-500"}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-600">{plan.nameCn}</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-700 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg text-sm font-medium border border-[#1e1e2e] text-gray-500 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : plan.name === "FREE" ? (
                  <Link
                    href="/"
                    className="block w-full py-3 rounded-lg text-sm font-medium border border-[#1e1e2e] text-gray-400 hover:bg-white/5 transition-colors text-center"
                  >
                    Downgrade
                  </Link>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.name)}
                    className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
                        : "bg-white/5 text-white border border-[#1e1e2e] hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
