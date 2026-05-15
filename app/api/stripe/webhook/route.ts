import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import type { PlanType } from "@/lib/subscription";

// Disable body parsing for Stripe webhooks - need raw body for signature verification
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan as PlanType;

        if (userId && plan) {
          await prisma.user.update({
            where: { id: userId },
            data: { plan },
          });

          // Create subscription record
          if (session.subscription) {
            const sub = await stripe.subscriptions.retrieve(
              session.subscription as string
            );
            await prisma.subscription.create({
              data: {
                userId,
                stripeSubscriptionId: sub.id,
                plan,
                status: "active",
                currentPeriodStart: new Date(sub.current_period_start * 1000),
                currentPeriodEnd: new Date(sub.current_period_end * 1000),
              },
            });
          }

          // Create payment record
          await prisma.payment.create({
            data: {
              userId,
              amount: session.amount_total ? session.amount_total / 100 : 0,
              currency: session.currency || "usd",
              status: "succeeded",
              provider: "stripe",
              description: `${plan} plan subscription`,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          const status = subscription.status;
          let plan: PlanType = user.plan as PlanType;

          if (status === "canceled" || status === "unpaid") {
            plan = "FREE";
          } else if (subscription.metadata?.plan) {
            plan = subscription.metadata.plan as PlanType;
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { plan },
          });

          await prisma.subscription.upsert({
            where: {
              id:
                (await prisma.subscription.findFirst({
                  where: { stripeSubscriptionId: subscription.id },
                  select: { id: true },
                }))?.id || "",
            },
            create: {
              userId: user.id,
              stripeSubscriptionId: subscription.id,
              plan,
              status,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
            update: {
              status,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: "FREE" },
          });

          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: { status: "expired" },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user && invoice.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );

          // Update subscription period
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: {
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              status: "active",
            },
          });

          // Record payment
          await prisma.payment.create({
            data: {
              userId: user.id,
              amount: invoice.amount_paid / 100,
              currency: invoice.currency || "usd",
              status: "succeeded",
              provider: "stripe",
              description: `${user.plan} plan renewal`,
            },
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await prisma.subscription.updateMany({
            where: { userId: user.id, status: "active" },
            data: { status: "past_due" },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
