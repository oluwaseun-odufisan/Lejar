import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/20 to-white dark:from-gray-900 dark:to-gray-800 py-8">
            <div className="container mx-auto px-2 xxs:px-3 sm:px-4 md:px-6 py-10 xxs:py-12 sm:py-16 md:py-20 max-w-7xl">
                <header className="pt-4 xxs:pt-5 sm:pt-6 pb-3 xxs:pb-4">
                    <h1
                        className="text-2xl xxs:text-3xl sm:text-4xl font-bold text-orange-900 dark:text-orange-100 tracking-tight"
                        id="dashboard-title"
                    >
                        Dashboard
                        <span className="block w-20 xxs:w-24 h-1 xxs:h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-full mt-1 xxs:mt-2"></span>
                    </h1>
                </header>
                <section
                    className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 border-orange-200 dark:border-orange-700 shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] rounded-2xl transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]"
                    aria-labelledby="dashboard-title"
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
                                        width: "100%",
                                    }}
                                    aria-label="Loading dashboard content"
                                />
                            </div>
                        }
                    >
                        <DashboardPage />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}