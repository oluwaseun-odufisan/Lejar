"use client";

import { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
    "#0D9488", // teal-600
    "#DC2626", // red-600
    "#4F46E5", // indigo-600
    "#F59E0B", // yellow-500
    "#7C3AED", // violet-600
    "#16A34A", // green-600
    "#EC4899", // pink-500
];

export function DashboardOverview({ accounts, transactions }) {
    const [selectedAccountId, setSelectedAccountId] = useState(
        accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
    );
    const [outerRadius, setOuterRadius] = useState(100);
    const [hoveredSegment, setHoveredSegment] = useState(null);

    useEffect(() => {
        const updateRadius = () => {
            if (window.innerWidth < 320) {
                setOuterRadius(60);
            } else if (window.innerWidth < 640) {
                setOuterRadius(80);
            } else if (window.innerWidth < 768) {
                setOuterRadius(90);
            } else {
                setOuterRadius(100);
            }
        };

        updateRadius();
        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, []);

    const accountTransactions = transactions.filter(
        (t) => t.accountId === selectedAccountId
    );

    const recentTransactions = accountTransactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const currentDate = new Date();
    const currentMonthExpenses = accountTransactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
            t.type === "EXPENSE" &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
        );
    });

    const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    const pieChartData = Object.entries(expensesByCategory).map(
        ([category, amount]) => ({
            name: category,
            value: amount,
        })
    );

    return (
        <div className="grid gap-4 xxs:gap-5 sm:gap-6 md:grid-cols-2">
            <Card className="relative bg-gradient-to-br from-orange-50/50 to-amber-50 dark:from-gray-900 dark:to-gray-800 border-orange-200 dark:border-orange-700 shadow-lg dark:shadow-[0_4px_20px_rgba(251,146,60,0.25)] rounded-3xl transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_8px_24px_rgba(251,146,60,0.3)]">
                <CardHeader className="pb-3 xxs:pb-4 px-3 xxs:px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base xxs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-orange-900 dark:text-orange-100 tracking-tight flex items-center gap-1 xxs:gap-2">
                            <svg className="w-4 xxs:w-5 h-4 xxs:h-5 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Recent Transactions
                        </CardTitle>
                        <Select
                            value={selectedAccountId}
                            onValueChange={setSelectedAccountId}
                            aria-label="Select account"
                        >
                            <SelectTrigger className="w-32 xxs:w-36 sm:w-40 lg:w-44 text-xs xxs:text-sm lg:text-base border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-lg rounded-lg">
                                {accounts.map((account) => (
                                    <SelectItem
                                        key={account.id}
                                        value={account.id}
                                        className="text-xs xxs:text-sm lg:text-base text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 group-hover:scale-105"
                                    >
                                        {account.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="px-3 xxs:px-4 sm:px-6 pb-4 xxs:pb-5 sm:pb-6">
                    <div className="space-y-3 xxs:space-y-4">
                        {recentTransactions.length === 0 ? (
                            <p className="text-center text-xs xxs:text-sm lg:text-base text-orange-700/70 dark:text-orange-300/70 py-4 xxs:py-6">
                                No recent transactions
                            </p>
                        ) : (
                            recentTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between py-2 xxs:py-3 border-b border-orange-100 dark:border-orange-700/50 last:border-b-0 transition-all duration-200 hover:bg-orange-50/50 dark:hover:bg-orange-900/50 hover:pl-2 xxs:hover:pl-3"
                                >
                                    <div className="space-y-0.5">
                                        <p className="text-sm xxs:text-base lg:text-lg font-semibold text-orange-900 dark:text-orange-100">
                                            {transaction.description || "Untitled Transaction"}
                                        </p>
                                        <p className="text-xs xxs:text-sm lg:text-base text-orange-700/70 dark:text-orange-300/70">
                                            {format(new Date(transaction.date), "PPP")}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 xxs:gap-2">
                                        <div
                                            className={cn(
                                                "flex items-center text-sm xxs:text-base lg:text-lg font-semibold",
                                                transaction.type === "EXPENSE"
                                                    ? "text-orange-800 dark:text-orange-500"
                                                    : "text-orange-600 dark:text-orange-400"
                                            )}
                                        >
                                            {transaction.type === "EXPENSE" ? (
                                                <ArrowDownRight className="h-4 xxs:h-5 w-4 xxs:w-5 mr-1" />
                                            ) : (
                                                <ArrowUpRight className="h-4 xxs:h-5 w-4 xxs:w-5 mr-1" />
                                            )}
                                            ₦{transaction.amount.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-orange-100/20 dark:from-orange-900/20 dark:to-orange-800/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
            <Card className="relative bg-gradient-to-br from-orange-50/50 to-amber-50 dark:from-gray-900 dark:to-gray-800 border-orange-200 dark:border-orange-700 shadow-lg dark:shadow-[0_4px_20px_rgba(251,146,60,0.25)] rounded-3xl transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_8px_24px_rgba(251,146,60,0.3)]">
                <CardHeader className="pb-3 xxs:pb-4 px-3 xxs:px-4 sm:px-6">
                    <CardTitle className="text-base xxs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-orange-900 dark:text-orange-100 tracking-tight flex items-center gap-1 xxs:gap-2">
                        <svg className="w-4 xxs:w-5 h-4 xxs:h-5 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V15h5.488" />
                        </svg>
                        Monthly Expense Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-4 xxs:pb-5 sm:pb-6">
                    {pieChartData.length === 0 ? (
                        <p className="text-center text-xs xxs:text-sm lg:text-base text-orange-700/70 dark:text-orange-300/70 py-6 xxs:py-8">
                            No expenses this month
                        </p>
                    ) : (
                        <div className="h-[240px] xxs:h-[280px] sm:h-[320px] md:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={outerRadius}
                                        dataKey="value"
                                        isAnimationActive={true}
                                        animationDuration={800}
                                        onMouseEnter={(data, index) => setHoveredSegment(index)}
                                        onMouseLeave={() => setHoveredSegment(null)}
                                        aria-describedby="pie-chart-description"
                                        className="transition-all duration-500"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                opacity={hoveredSegment !== null && hoveredSegment !== index ? 0.4 : 1}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [
                                            `₦${value.toFixed(2)}`,
                                            `Category: ${name}`,
                                        ]}
                                        contentStyle={{
                                            background: "linear-gradient(to bottom, white, #f8fafc)",
                                            border: `1px solid ${hoveredSegment !== null ? COLORS[hoveredSegment % COLORS.length] : "#fed7aa"}`,
                                            borderRadius: "8px",
                                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                                            padding: "10px 14px",
                                            fontSize: "14px",
                                            color: "#1f2937",
                                            fontWeight: 500,
                                        }}
                                        labelStyle={{ fontWeight: 600, color: "#1f2937" }}
                                        cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: "12px",
                                            color: "#1f2937",
                                            paddingTop: "16px",
                                            fontWeight: 500,
                                            lineHeight: "1.5",
                                        }}
                                        formatter={(value) => (
                                            <span className="text-orange-900 dark:text-orange-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
                                                {value}
                                            </span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div id="pie-chart-description" className="sr-only">
                                Pie chart showing monthly expense breakdown by category.
                            </div>
                        </div>
                    )}
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-orange-100/20 dark:from-orange-900/20 dark:to-orange-800/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
        </div>
    );
}