import React from "react";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/20 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-2 xxs:px-3 sm:px-4 md:px-6 py-10 xxs:py-12 sm:py-16 md:py-20 max-w-7xl">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;