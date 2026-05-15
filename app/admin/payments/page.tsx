import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  Users,
  TrendingUp,
  ArrowUpRight,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  succeeded: { icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-green-400 bg-green-500/10 border-green-500/20" },
  pending: { icon: <Clock className="w-3.5 h-3.5" />, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  failed: { icon: <XCircle className="w-3.5 h-3.5" />, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  refunded: { icon: <RotateCcw className="w-3.5 h-3.5" />, color: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
};

export default async function AdminPaymentsPage() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-500">You don&apos;t have admin privileges.</p>
          <Link href="/" className="text-blue-400 text-sm mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const payments = await prisma.payment.findMany({
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const subscriptions = await prisma.subscription.findMany({
    where: { status: "active" },
    include: {
      user: {
        select: { name: true, email: true, plan: true },
      },
    },
  });

  // Calculate stats
  const allPayments = await prisma.payment.findMany({
    where: { status: "succeeded" },
  });

  const totalRevenue = allPayments.reduce((sum, p) => sum + p.amount, 0);

  const now = new Date();
  const thisMonth = allPayments.filter((p) => {
    const d = new Date(p.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyRevenue = thisMonth.reduce((sum, p) => sum + p.amount, 0);

  const refundedPayments = await prisma.payment.count({
    where: { status: "refunded" },
  });

  const failedPayments = await prisma.payment.count({
    where: { status: "failed" },
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Revenue & Payments</h1>
          <p className="text-sm text-gray-500">Track customer payments and manage payouts</p>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Total Revenue
          </div>
          <div className="text-2xl font-bold text-green-400">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-600 mt-1">{allPayments.length} transactions</div>
        </div>
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            This Month
          </div>
          <div className="text-2xl font-bold text-blue-400">
            ${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-600 mt-1">{thisMonth.length} transactions</div>
        </div>
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Users className="w-4 h-4" />
            Active Subscriptions
          </div>
          <div className="text-2xl font-bold text-purple-400">{subscriptions.length}</div>
          <div className="text-xs text-gray-600 mt-1">Paying customers</div>
        </div>
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <CreditCard className="w-4 h-4" />
            Failed / Refunded
          </div>
          <div className="text-2xl font-bold text-red-400">{failedPayments + refundedPayments}</div>
          <div className="text-xs text-gray-600 mt-1">{failedPayments} failed, {refundedPayments} refunded</div>
        </div>
      </div>

      {/* Active Subscriptions Summary */}
      {subscriptions.length > 0 && (
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#1e1e2e]">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Active Subscriptions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Customer</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Plan</th>
                  <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Period End</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-[#1e1e2e] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <div className="text-sm text-white">{sub.user.name || "—"}</div>
                      <div className="text-xs text-gray-500">{sub.user.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-md border ${
                        sub.plan === "PRO"
                          ? "text-purple-400 bg-purple-500/10 border-purple-500/20"
                          : "text-blue-400 bg-blue-500/10 border-blue-500/20"
                      }`}>
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {sub.currentPeriodEnd
                        ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1e1e2e] flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-400" />
            Payment History
          </h2>
          <span className="text-xs text-gray-500">Last 50 transactions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Date</th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Customer</th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Amount</th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => {
                const status = statusConfig[payment.status] || statusConfig.pending;
                return (
                  <tr key={payment.id} className="border-b border-[#1e1e2e] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-white">{payment.user.name || "—"}</div>
                      <div className="text-xs text-gray-500">{payment.user.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-white">
                      ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border ${status.color}`}>
                        {status.icon}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">
                      {payment.description || "—"}
                    </td>
                  </tr>
                );
              })}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    No payment records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stripe Payout Guide */}
      <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" />
          How to Withdraw Funds / 提现指南
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <h3 className="text-sm font-medium text-white mb-2">Payout Flow / 提现流程</h3>
              <ol className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span>Customer pays → funds go to your <strong className="text-white">Stripe Balance</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span>Stripe automatically creates <strong className="text-white">Payouts</strong> based on your schedule (daily/weekly/monthly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span>Funds arrive in your linked <strong className="text-white">bank account</strong> (1-7 business days)</span>
                </li>
              </ol>
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg">
              <h3 className="text-sm font-medium text-white mb-2">Manual Payout / 手动提现</h3>
              <ol className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">1.</span>
                  <span>Go to <strong className="text-white">Stripe Dashboard</strong> → <strong className="text-white">Balance</strong> → <strong className="text-white">Payouts</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">2.</span>
                  <span>Click <strong className="text-white">&quot;Create Payout&quot;</strong> to manually transfer funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">3.</span>
                  <span>Enter the amount and confirm the destination bank account</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
              <h3 className="text-sm font-medium text-green-400 mb-2">Payout Schedule Settings</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                You can configure automatic payout schedule in Stripe Dashboard → Settings → Payouts.
                Options: Manual, Daily, Weekly (choose day), Monthly (choose date).
              </p>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg">
              <h3 className="text-sm font-medium text-amber-400 mb-2">Important Notes</h3>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li>Stripe fees: ~2.9% + $0.30 per card transaction</li>
                <li>Payout timing: US banks 1-2 days, international 2-7 days</li>
                <li>Minimum payout: $1 (most countries)</li>
                <li>Currency: USD (default), can be converted on payout</li>
                <li>Refunds: Processed back to customer&apos;s card within 5-10 days</li>
              </ul>
            </div>

            <a
              href="https://dashboard.stripe.com/balance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/10 rounded-lg transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium">Open Stripe Dashboard</span>
              <ArrowUpRight className="w-3 h-3 text-blue-400 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
