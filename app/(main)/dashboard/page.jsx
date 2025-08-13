import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
    const [accounts, transactions] = await Promise.all([
        getUserAccounts(),
        getDashboardData(),
    ]);

    const defaultAccount = accounts?.find((account) => account.isDefault);

    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    return (
        <div className="space-y-6 xxs:space-y-7 sm:space-y-8">
            {/* Budget Progress Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] border border-orange-100 dark:border-orange-700 p-4 xxs:p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]">
                <h2 className="text-xl xxs:text-2xl font-bold text-orange-900 dark:text-orange-100 mb-3 xxs:mb-4 flex items-center gap-1 xxs:gap-2">
                    <svg className="w-5 xxs:w-6 h-5 xxs:h-6 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    Budget Overview
                </h2>
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center h-24 xxs:h-28 sm:h-32">
                            <div className="w-full max-w-xs xxs:max-w-sm sm:max-w-md h-3 xxs:h-4 bg-orange-100 dark:bg-orange-900/50 rounded-full animate-pulse" aria-label="Loading budget progress"></div>
                        </div>
                    }
                >
                    <BudgetProgress
                        initialBudget={budgetData?.budget}
                        currentExpenses={budgetData?.currentExpenses || 0}
                    />
                </Suspense>
            </section>

            {/* Transaction Summary Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] border border-orange-100 dark:border-orange-700 p-4 xxs:p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]">
                <h2 className="text-xl xxs:text-2xl font-bold text-orange-900 dark:text-orange-100 mb-3 xxs:mb-4 flex items-center gap-1 xxs:gap-2">
                    <svg className="w-5 xxs:w-6 h-5 xxs:h-6 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Transaction Summary
                </h2>
                <Suspense
                    fallback={
                        <div className="grid gap-4 xxs:gap-5 sm:gap-6 sm:grid-cols-2">
                            <div className="h-80 xxs:h-88 sm:h-96 bg-orange-50/20 dark:bg-orange-900/20 rounded-xl animate-pulse" aria-label="Loading recent transactions"></div>
                            <div className="h-80 xxs:h-88 sm:h-96 bg-orange-50/20 dark:bg-orange-900/20 rounded-xl animate-pulse" aria-label="Loading expense breakdown"></div>
                        </div>
                    }
                >
                    <DashboardOverview accounts={accounts} transactions={transactions || []} />
                </Suspense>
            </section>

            {/* Accounts Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] border border-orange-100 dark:border-orange-700 p-4 xxs:p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]">
                <h2 className="text-xl xxs:text-2xl font-bold text-orange-900 dark:text-orange-100 mb-3 xxs:mb-4 flex items-center gap-1 xxs:gap-2">
                    <svg className="w-5 xxs:w-6 h-5 xxs:h-6 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Your Accounts
                </h2>
                <div className="grid gap-4 xxs:gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <CreateAccountDrawer>
                        <Card className="relative bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800 border-2 border-orange-300 dark:border-orange-600 hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)] transition-all duration-300 rounded-xl overflow-hidden cursor-pointer group">
                            <CardContent className="flex flex-col items-center justify-center h-full py-6 xxs:py-7 sm:py-8">
                                <div className="bg-orange-100 dark:bg-orange-900/50 rounded-full p-3 xxs:p-4 mb-3 xxs:mb-4 transition-transform duration-300 group-hover:scale-110">
                                    <Plus className="h-6 xxs:h-8 w-6 xxs:w-8 text-orange-500 dark:text-orange-400" />
                                </div>
                                <p className="text-base xxs:text-lg font-semibold text-orange-900 dark:text-orange-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                                    Add New Account
                                </p>
                                <p className="text-xs xxs:text-sm text-orange-700/70 dark:text-orange-300/70 mt-1 group-hover:text-orange-600/80 dark:group-hover:text-orange-400/80 transition-colors duration-300">
                                    Expand your financial portfolio
                                </p>
                            </CardContent>
                        </Card>
                    </CreateAccountDrawer>
                    {accounts.length > 0 &&
                        accounts?.map((account) => (
                            <AccountCard key={account.id} account={account} />
                        ))}
                </div>
            </section>
        </div>
    );
}