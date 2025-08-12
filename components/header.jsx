"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, PenBox } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 w-full bg-gradient-to-b from-orange-50 to-white/90 backdrop-blur-lg z-50 border-b border-orange-100 shadow-sm"
        >
            <nav className="container mx-auto px-4 h-[80px] flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Lejar logo"
                        height={54}
                        width={135}
                        className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                </Link>
                <div className="flex items-center gap-6">
                    <SignedIn>
                        <Link href="/dashboard">
                            <motion.div variants={buttonVariants} whileHover="hover">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-300 text-lg px-6 py-3 rounded-lg"
                                >
                                    <LayoutDashboard size={20} />
                                    <span className="hidden md:inline ml-2">Dashboard</span>
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/transaction/create">
                            <motion.div variants={buttonVariants} whileHover="hover">
                                <Button
                                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-lg px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
                                >
                                    <PenBox size={20} />
                                    <span className="hidden md:inline ml-2">Add Transaction</span>
                                </Button>
                            </motion.div>
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <motion.div variants={buttonVariants} whileHover="hover">
                                <Button
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-lg px-6 py-3 rounded-lg"
                                >
                                    Login
                                </Button>
                            </motion.div>
                        </SignInButton>
                        <SignUpButton>
                            <motion.div variants={buttonVariants} whileHover="hover">
                                <Button
                                    variant="outline"
                                    className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-300 text-lg px-6 py-3 rounded-lg"
                                >
                                    Sign Up
                                </Button>
                            </motion.div>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "h-12 w-12 border-2 border-orange-300 rounded-full",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </nav>
        </motion.div>
    );
};

export default Header;