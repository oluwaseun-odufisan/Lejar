import React from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4 xxs:px-6 sm:px-8">
            <div className="text-center max-w-md mx-auto">
                {/* 404 Header */}
                <h1 className="text-6xl xxs:text-7xl sm:text-8xl font-bold text-orange-600 mb-4 tracking-tight">
                    404
                </h1>
                <h2 className="text-2xl xxs:text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-sm xxs:text-base sm:text-lg text-gray-600 mb-8">
                    Oops! It looks like the page you're looking for doesn't exist or has been moved.
                </p>
                {/* Back to Home Button */}
                <Link href="/">
                    <Button
                        className="px-4 xxs:px-6 sm:px-8 py-2 xxs:py-2.5 text-sm xxs:text-base sm:text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <ArrowLeft size={16} className="mr-1 xxs:mr-2" />
                        Back to Home
                    </Button>
                </Link>
                {/* Decorative Element */}
                <div className="mt-12 relative">
                    <div className="w-24 xxs:w-32 sm:w-40 h-24 xxs:h-32 sm:h-40 mx-auto bg-orange-100 rounded-full opacity-50 transition-transform duration-500 hover:scale-110"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 xxs:w-20 sm:w-24 h-16 xxs:h-20 sm:h-24 bg-orange-200 rounded-full opacity-50 transition-transform duration-500 hover:scale-110"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;