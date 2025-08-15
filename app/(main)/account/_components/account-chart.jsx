"use client";

import { useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const DATE_RANGES = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last Month", days: 30 },
    "3M": { label: "Last 3 Months", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },
};

const CHART_COLORS = {
    income: "#0D9488", // teal-600
    expense: "#DC2626", // red-600
};

export function AccountChart({ transactions }) {
    const [dateRange, setDateRange] = useState("1M");
    const [hoveredBar, setHoveredBar] = useState(null);

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();
        const startDate = range.days
            ? startOfDay(subDays(now, range.days))
            : startOfDay(new Date(0));

        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
        );

        const grouped = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd");
            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }
            if (transaction.type === "INCOME") {
                acc[date].income += transaction.amount;
            } else {
                acc[date].expense += transaction.amount;
            }
            return acc;
        }, {});

        return Object.values(grouped).sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    }, [transactions, dateRange]);

    const totals = useMemo(() => {
        return filteredData.reduce(
            (acc, day) => ({
                income: acc.income + day.income,
                expense: acc.expense + day.expense,
            }),
            { income: 0, expense: 0 }
        );
    }, [filteredData]);

    const handleMouseEnter = (data, index, type) => {
        setHoveredBar(`${type}-${index}`);
    };

    const handleMouseLeave = () => {
        setHoveredBar(null);
    };

    return (
        <Card className="relative bg-gradient-to-br from-orange-50/50 to-amber-50 dark:from-gray-900 dark:to-gray-800 border-orange-200 dark:border-orange-700 shadow-lg dark:shadow-[0_4px_20px_rgba(251,146,60,0.25)] rounded-3xl transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_8px_24px_rgba(251,146,60,0.3)]">
            <CardHeader className="flex flex-row items-center justify-between pb-4 px-6">
                <CardTitle className="text-xl font-semibold text-orange-900 dark:text-orange-100 tracking-tight flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Transaction Overview
                </CardTitle>
                <Select
                    defaultValue={dateRange}
                    onValueChange={setDateRange}
                    aria-label="Select date range"
                >
                    <SelectTrigger className="w-40 text-sm border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-lg rounded-lg">
                        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                            <SelectItem
                                key={key}
                                value={key}
                                className="text-sm text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 group-hover:scale-105"
                            >
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="group text-center bg-orange-50/70 dark:bg-orange-900/20 rounded-xl p-3 shadow-sm dark:shadow-[0_2px_8px_rgba(251,146,60,0.15)] transition-all duration-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:shadow-md">
                        <p className="text-sm text-orange-700/70 dark:text-orange-200/70 font-medium">Total Income</p>
                        <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 transition-transform duration-300 group-hover:scale-105">
                            ₦{totals.income.toFixed(2)}
                        </p>
                    </div>
                    <div className="group text-center bg-orange-50/70 dark:bg-orange-900/20 rounded-xl p-3 shadow-sm dark:shadow-[0_2px_8px_rgba(251,146,60,0.15)] transition-all duration-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:shadow-md">
                        <p className="text-sm text-orange-700/70 dark:text-orange-200/70 font-medium">Total Expenses</p>
                        <p className="text-lg font-semibold text-orange-800 dark:text-orange-300 transition-transform duration-300 group-hover:scale-105">
                            ₦{totals.expense.toFixed(2)}
                        </p>
                    </div>
                    <div className="group text-center bg-orange-50/70 dark:bg-orange-900/20 rounded-xl p-3 shadow-sm dark:shadow-[0_2px_8px_rgba(251,146,60,0.15)] transition-all duration-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:shadow-md">
                        <p className="text-sm text-orange-700/70 dark:text-orange-200/70 font-medium">Net</p>
                        <p
                            className={`text-lg font-semibold transition-transform duration-300 group-hover:scale-105 ${totals.income - totals.expense >= 0 ? "text-orange-600 dark:text-orange-400" : "text-orange-800 dark:text-orange-300"}`}
                        >
                            ₦{(totals.income - totals.expense).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="h-[350px] sm:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredData}
                            margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
                            isAnimationActive={true}
                            animationDuration={800}
                        >
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke="#d1d5db"
                                strokeOpacity={0.2}
                                className="dark:stroke-gray-600"
                            />
                            <XAxis
                                dataKey="date"
                                fontSize={14}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#6b7280", fontWeight: 500 }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                fontSize={14}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `₦${value.toFixed(0)}`}
                                tick={{ fill: "#6b7280", fontWeight: 500 }}
                            />
                            <Tooltip
                                formatter={(value, name) => [
                                    `₦${value.toFixed(2)}`,
                                    name,
                                ]}
                                contentStyle={{
                                    background: "linear-gradient(to bottom, white, #f8fafc)",
                                    border: `1px solid ${hoveredBar && hoveredBar.startsWith("income") ? "#0D9488" : "#DC2626"}`,
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
                                    fontSize: "14px",
                                    color: "#1f2937",
                                    paddingTop: "16px",
                                    fontWeight: 500,
                                }}
                                formatter={(value) => (
                                    <span className="text-orange-900 dark:text-orange-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">
                                        {value}
                                    </span>
                                )}
                            />
                            <Bar
                                dataKey="income"
                                name="Income"
                                fill={CHART_COLORS.income}
                                radius={[4, 4, 0, 0]}
                                opacity={hoveredBar && !hoveredBar.startsWith("income") ? 0.4 : 1}
                                onMouseEnter={(data, index) => handleMouseEnter(data, index, "income")}
                                onMouseLeave={handleMouseLeave}
                                isAnimationActive={true}
                                animationDuration={800}
                                className="transition-all duration-300"
                            />
                            <Bar
                                dataKey="expense"
                                name="Expense"
                                fill={CHART_COLORS.expense}
                                radius={[4, 4, 0, 0]}
                                opacity={hoveredBar && !hoveredBar.startsWith("expense") ? 0.4 : 1}
                                onMouseEnter={(data, index) => handleMouseEnter(data, index, "expense")}
                                onMouseLeave={handleMouseLeave}
                                isAnimationActive={true}
                                animationDuration={800}
                                className="transition-all duration-300"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}