import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { NoPaginationTransactionTable } from "../_components/no-pagination-transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AccountPage({ params }) {
    const accountData = await getAccountWithTransactions(params.id);

    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/20 to-white dark:from-gray-900 dark:to-gray-800 py-10 xxs:py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-2 xxs:px-3 sm:px-4 md:px-6 py-6 xxs:py-8 max-w-7xl space-y-6 xxs:space-y-7 sm:space-y-8">
                <div className="flex flex-col sm:flex-row gap-3 xxs:gap-4 sm:gap-6 items-start sm:items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 xxs:gap-3">
                            <Link href="/dashboard">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 xxs:h-10 w-8 xxs:w-10 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                    aria-label="Back to dashboard"
                                >
                                    <ArrowLeft className="h-4 xxs:h-5 w-4 xxs:w-5" />
                                </Button>
                            </Link>
                            <h1
                                className="text-2xl xxs:text-3xl sm:text-4xl font-bold text-orange-900 dark:text-orange-100 tracking-tight capitalize"
                                id="account-title"
                            >
                                {account.name}
                            </h1>
                        </div>
                        <p className="text-xs xxs:text-sm sm:text-base text-orange-700/70 dark:text-orange-200/70 mt-1 xxs:mt-2 capitalize">
                            {account.type} Account
                        </p>
                        <div className="block w-16 xxs:w-20 h-1 xxs:h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-full mt-1 xxs:mt-2"></div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl xxs:text-2xl font-semibold text-orange-600 dark:text-orange-400">
                            ${parseFloat(account.balance).toFixed(2)}
                        </div>
                        <p className="text-xs xxs:text-sm text-orange-700/70 dark:text-orange-200/70 mt-1">
                            {account._count.transactions} Transactions
                        </p>
                    </div>
                </div>

                {/* Chart Section */}
                <section
                    className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 border-orange-200 dark:border-orange-700 shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] rounded-2xl transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]"
                    aria-labelledby="chart-section-title"
                >
                    <Suspense
                        fallback={
                            <div className="flex justify-center py-4 xxs:py-5 sm:py-6">
                                <BarLoader
                                    width="100%"
                                    color="#F97316"
                                    cssOverride={{
                                        backgroundColor: "#fed7aa",
                                        borderRadius: "9999px",
                                        opacity: 0.8,
                                        maxWidth: "300px",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    }}
                                    aria-label="Loading account chart"
                                />
                            </div>
                        }
                    >
                        <AccountChart transactions={transactions} />
                    </Suspense>
                </section>

                {/* Transactions Table */}
                <section
                    className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 border-orange-200 dark:border-orange-700 shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] rounded-2xl transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]"
                    aria-labelledby="transactions-section-title"
                >
                    <Suspense
                        fallback={
                            <div className="flex justify-center py-4 xxs:py-5 sm:py-6">
                                <BarLoader
                                    width="100%"
                                    color="#F97316"
                                    cssOverride={{
                                        backgroundColor: "#fed7aa",
                                        borderRadius: "9999px",
                                        opacity: 0.8,
                                        maxWidth: "300px",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    }}
                                    aria-label="Loading transactions table"
                                />
                            </div>
                        }
                    >
                        <NoPaginationTransactionTable transactions={transactions} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}