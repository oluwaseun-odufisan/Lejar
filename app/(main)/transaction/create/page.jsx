import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AddTransactionPage({ searchParams }) {
    const accounts = await getUserAccounts();
    const editId = searchParams?.edit;

    let initialData = null;
    if (editId) {
        const transaction = await getTransaction(editId);
        initialData = transaction;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/20 to-white dark:from-gray-900 dark:to-gray-800 py-6 xxs:py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-2 xxs:px-3 sm:px-4 md:px-6 max-w-xl">
                {/* Header Section */}
                <header className="mb-6 xxs:mb-7 sm:mb-8 md:mb-10">
                    <div className="flex items-center justify-between">
                        <Link href="/dashboard">
                            <Button
                                variant="ghost"
                                className="p-1 xxs:p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-full transition-all duration-200"
                                aria-label="Go back to dashboard"
                            >
                                <ArrowLeft className="h-5 xxs:h-6 w-5 xxs:w-6" />
                                <span className="sr-only">Back to Dashboard</span>
                            </Button>
                        </Link>
                        <h1
                            id="add-transaction-title"
                            className="text-xl xxs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-900 dark:text-orange-100 relative"
                        >
                            {editId ? "Edit Transaction" : "Add Transaction"}
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 xxs:w-24 h-1 xxs:h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-full mt-1 xxs:mt-2"></span>
                        </h1>
                        <div className="w-8 xxs:w-10 sm:w-12" /> {/* Spacer for balance */}
                    </div>
                    <hr className="mt-3 xxs:mt-4 border-orange-200 dark:border-orange-700" />
                </header>

                {/* Form Section */}
                <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] p-3 xxs:p-4 sm:p-6 md:p-8 border border-orange-100 dark:border-orange-700 transition-all duration-200 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]">
                    <AddTransactionForm
                        accounts={accounts}
                        categories={defaultCategories}
                        editMode={!!editId}
                        initialData={initialData}
                        aria-labelledby="add-transaction-title"
                    />
                </main>
            </div>
        </div>
    );
}