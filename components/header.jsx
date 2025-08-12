import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/CheckUser";
import Image from "next/image";

const Header = async () => {
    await checkUser();

    return (
        <header className="fixed top-0 w-full bg-gradient-to-b from-orange-50 to-white/95 backdrop-blur-lg z-50 border-b border-orange-200 shadow-sm">
            <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between max-w-7xl h-[80px]">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Lejar Logo"
                        width={135}
                        height={54}
                        className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                        priority
                    />
                </Link>

                {/* Navigation Links - Desktop */}
                <div className="hidden lg:flex items-center space-x-8">
                    <SignedOut>
                        <a
                            href="#features"
                            className="relative text-gray-700 hover:text-orange-600 text-sm font-semibold transition-colors duration-200 group"
                        >
                            Features
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a
                            href="#testimonials"
                            className="relative text-gray-700 hover:text-orange-600 text-sm font-semibold transition-colors duration-200 group"
                        >
                            Testimonials
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </SignedOut>
                </div>

                {/* Action Buttons - Desktop */}
                <div className="hidden lg:flex items-center space-x-3 sm:space-x-4">
                    <SignedIn>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                className="px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold text-orange-600 border-orange-500 hover:bg-orange-50 hover:text-orange-700 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <LayoutDashboard size={16} className="mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Button>
                        </Link>
                        <Link href="/transaction/create">
                            <Button
                                className="px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <PenBox size={16} className="mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Add Transaction</span>
                            </Button>
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 sm:w-11 sm:h-11 border-2 border-orange-300 rounded-full transition-transform duration-200 hover:scale-105",
                                },
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button
                                className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <Button
                        variant="ghost"
                        className="p-2 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-full transition-all duration-200"
                        asChild
                    >
                        <Link href="#mobile-menu">
                            <Menu size={24} />
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu - Server-Side Rendered */}
            <div id="mobile-menu" className="lg:hidden bg-white/95 border-t border-orange-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
                    <SignedOut>
                        <a
                            href="#features"
                            className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 py-2"
                        >
                            Features
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 hover:w-full"></span>
                        </a>
                        <a
                            href="#testimonials"
                            className="relative text-gray-700 hover:text-orange-600 text-base font-semibold transition-colors duration-200 py-2"
                        >
                            Testimonials
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 hover:w-full"></span>
                        </a>
                    </SignedOut>
                    <div className="flex flex-col gap-3">
                        <SignedIn>
                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    className="w-full py-2.5 text-base font-semibold text-orange-600 border-orange-500 hover:bg-orange-50 hover:text-orange-700 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <LayoutDashboard size={16} className="mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/transaction/create">
                                <Button
                                    className="w-full py-2.5 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <PenBox size={16} className="mr-2" />
                                    Add Transaction
                                </Button>
                            </Link>
                            <div className="flex justify-center">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-11 h-11 border-2 border-orange-300 rounded-full transition-transform duration-200 hover:scale-105",
                                        },
                                    }}
                                />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton forceRedirectUrl="/dashboard">
                                <Button
                                    className="w-full py-2.5 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Login
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;