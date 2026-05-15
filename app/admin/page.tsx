import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Crown, ArrowLeft, Users, CreditCard, Settings, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-500">
            You don&apos;t have admin privileges.
          </p>
          <Link href="/" className="text-blue-400 text-sm mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const users = await prisma.user.findMany({
    include: {
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      _count: { select: { payments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Revenue stats
  const succeededPayments = await prisma.payment.findMany({
    where: { status: "succeeded" },
  });
  const totalRevenue = succeededPayments.reduce((sum, p) => sum + p.amount, 0);

  const now = new Date();
  const thisMonthPayments = succeededPayments.filter((p) => {
    const d = new Date(p.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyRevenue = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0);

  const activeSubscriptions = await prisma.subscription.count({
    where: { status: "active" },
  });

  const stats = {
    total: users.length,
    free: users.filter((u: any) => u.plan === "FREE").length,
    basic: users.filter((u: any) => u.plan === "BASIC").length,
    pro: users.filter((u: any) => u.plan === "PRO").length,
  };

  const planBadge: Record<string, string> = {
    FREE: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    BASIC: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PRO: "bg-purple-500/10 text-purple-400 border-purple-500/20",
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
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-500">Manage users, subscriptions & revenue</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.total, icon: Users, color: "text-white" },
          { label: "Free Plan", value: stats.free, icon: Users, color: "text-gray-400" },
          { label: "Basic Plan", value: stats.basic, icon: CreditCard, color: "text-blue-400" },
          { label: "Pro Plan", value: stats.pro, icon: Crown, color: "text-purple-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <stat.icon className="w-4 h-4" />
              {stat.label}
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Total Revenue
          </div>
          <div className="text-2xl font-bold text-green-400">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            This Month
          </div>
          <div className="text-2xl font-bold text-blue-400">
            ${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-[#0d0d14] border border-green-500/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <CreditCard className="w-4 h-4" />
              Revenue & Payments
            </div>
            <div className="text-sm text-gray-400">
              {activeSubscriptions} active subscriptions
            </div>
          </div>
          <Link
            href="/admin/payments"
            className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
          >
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1e1e2e]">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            All Users
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">
                  Joined
                </th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">
                  Payments
                </th>
                <th className="text-left text-xs text-gray-500 font-medium px-4 py-3 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-b border-[#1e1e2e] hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="text-sm text-white">{user.name || "—"}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-md border ${planBadge[user.plan]}`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {user._count.payments}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-gray-400">
                        {user.subscriptions[0]?.status || "inactive"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
