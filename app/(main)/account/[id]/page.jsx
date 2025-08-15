import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
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
        <div className="min-h-screen bg-gradient-to-b from-orange-50/20 to-white py-10 xxs:py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 xxs:px-5 sm:px-6 max-w-7xl space-y-8">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                    aria-label="Back to dashboard"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1
                                    className="text-3xl sm:text-4xl font-bold text-orange-900 tracking-tight capitalize"
                                    id="account-title"
                                >
                                    {account.name}
                                </h1>
                                <div className="block w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-2"></div>
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-orange-700/70 mt-2 capitalize">
                            {account.type} Account
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-semibold text-orange-600">
                            ₦{parseFloat(account.balance).toLocaleString()}
                        </div>
                        <p className="text-sm text-orange-700/70 mt-1">
                            {account._count.transactions} Transactions
                        </p>
                    </div>
                </div>

                <section
                    className="bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)]"
                    aria-labelledby="chart-section-title"
                >
                    <Suspense
                        fallback={
                            <div className="flex justify-center py-6">
                                <BarLoader
                                    width="100%"
                                    color="#F97316"
                                    cssOverride={{
                                        backgroundColor: "#fed7aa",
                                        borderRadius: "9999px",
                                        opacity: 0.8,
                                        maxWidth: "400px",
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

                <section
                    className="bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)]"
                    aria-labelledby="transactions-section-title"
                >
                    <Suspense
                        fallback={
                            <div className="flex justify-center py-6">
                                <BarLoader
                                    width="100%"
                                    color="#F97316"
                                    cssOverride={{
                                        backgroundColor: "#fed7aa",
                                        borderRadius: "9999px",
                                        opacity: 0.8,
                                        maxWidth: "400px",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    }}
                                    aria-label="Loading transactions table"
                                />
                            </div>
                        }
                    >
                        <TransactionTable transactions={transactions} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}