"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "enabled";
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-1.5 xxs:p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-full transition-all duration-200"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <Sun size={16} className="block dark:hidden" />
            <Moon size={16} className="hidden dark:block" />
        </button>
    );
};

export default DarkModeToggle;