import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gray-900/80 px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-md bg-white/90 dark:bg-gray-900/90 border border-orange-200 dark:border-orange-700 shadow-lg dark:shadow-[0_4px_20px_rgba(251,146,60,0.3)] rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_8px_24px_rgba(251,146,60,0.4)]">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-800 rounded-3xl pointer-events-none"></div>
                
                {/* Header */}
                <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <svg className="w-7 h-7 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V7zm-3 12v2m-4-2v2m8-2v2" />
                        </svg>
                        <h1 className="text-2xl sm:text-3xl font-bold text-orange-900 dark:text-orange-100 tracking-tight">
                            Sign Up
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-orange-700/70 dark:text-orange-200/70 text-center max-w-xs">
                        Create an account with Google to get started
                    </p>
                </div>

                {/* Clerk SignUp Component */}
                <div className="relative z-10 flex justify-center">
                    <SignUp
                        signInUrl="/sign-in"
                        appearance={{
                            elements: {
                                rootBox: 'w-full',
                                card: 'bg-transparent shadow-none',
                                socialButtonsBlockButton: 'group w-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-300 group-hover:scale-[1.02] focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:outline-none',
                                socialButtonsBlockButtonText: 'flex items-center justify-center gap-2',
                                footerAction: 'text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium',
                                footerActionLink: 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold underline transition-colors duration-200',
                                footer: 'mt-4 text-center',
                            },
                            variables: {
                                colorPrimary: '#f97316', // orange-500
                                colorText: '#1f2937', // gray-800
                                colorTextSecondary: '#6b7280', // gray-500
                                colorBackground: 'transparent',
                                colorInputBackground: '#ffffff90', // white/90
                                colorInputText: '#1f2937', // gray-800
                            },
                        }}
                        redirectUrl="/dashboard"
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;