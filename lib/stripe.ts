import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
});

export const PLANS = {
  BASIC: {
    name: "Basic",
    priceId: process.env.STRIPE_BASIC_PRICE_ID!,
    amount: 299,
  },
  PRO: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    amount: 599,
  },
} as const;
