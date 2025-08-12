import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/CheckUser";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";

const Header = async () => {
    await checkUser();

    return (
        <header className="fixed top-0 w-full bg-gradient-to-b from-orange-50 to-white/95 dark:bg-gradient-to-b dark:from-orange-900/30 dark:to-gray-900/95 backdrop-blur-lg z-50 border-b border-orange-200 dark:border-orange-800 shadow-sm">
            <nav className="container mx-auto px-2 xxs:px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between max-w-7xl h-[64px] sm:h-[80px]">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Lejar Logo"
                        width={100}
                        height={40}
                        className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105 xxs:max-w-[120px] sm:max-w-[135px]"
                        priority
                    />
                </Link>

                {/* Navigation Links - Desktop Only */}
                <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                    <SignedOut>
                        <a
                            href="#features"
                            className="relative text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 text-sm font-semibold transition-colors duration-200 group"
                        >
                            Features
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 dark:bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a
                            href="#testimonials"
                            className="relative text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 text-sm font-semibold transition-colors duration-200 group"
                        >
                            Testimonials
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 dark:bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </SignedOut>
                </div>

                {/* Action Buttons - Desktop and Mobile */}
                <div className="flex items-center space-x-2 xxs:space-x-3 sm:space-x-4 lg:space-x-2 xl:space-x-4">
                    <SignedIn>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                className="px-2 xxs:px-3 sm:px-4 lg:px-3 xl:px-5 py-1.5 text-xs xxs:text-sm sm:text-base font-semibold text-orange-600 dark:text-orange-400 border-orange-500 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-500 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <LayoutDashboard size={12} className="mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Button>
                        </Link>
                        <Link href="/transaction/create">
                            <Button
                                className="px-2 xxs:px-3 sm:px-4 lg:px-3 xl:px-5 py-1.5 text-xs xxs:text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <PenBox size={12} className="mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Add Transaction</span>
                            </Button>
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-7 h-7 xxs:w-8 xxs:h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 xl:w-9 xl:h-9 border-2 border-orange-300 dark:border-orange-600 rounded-full transition-transform duration-200 hover:scale-105",
                                },
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button
                                className="px-2 xxs:px-3 sm:px-4 lg:px-3 xl:px-5 py-1.5 text-xs xxs:text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <DarkModeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Header;