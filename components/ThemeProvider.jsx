"use client";

import { useEffect } from "react";

const ThemeProvider = ({ children }) => {
    useEffect(() => {
        // Initialize theme on mount
        const darkMode = localStorage.getItem("darkMode");
        const isDarkMode = darkMode === "enabled";
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.add("light");
        }
    }, []);

    return <>{children}</>;
};

export default ThemeProvider;