import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Instagram, Twitter, Linkedin, Mail, Phone, ChevronUp } from "lucide-react";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lejar",
  description: "Finance Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ThemeProvider>
            {/* header */}
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-gray-900/95">{children}</main>
            {/* footer */}
            <footer className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-white dark:from-orange-900/30 dark:via-orange-800/20 dark:to-gray-900/95 py-16 px-4 border-t border-orange-200 dark:border-orange-800 overflow-hidden">
              {/* Subtle background pattern for depth */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-200 dark:from-orange-700 to-transparent"></div>
              </div>

              <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-700 dark:text-gray-300 relative z-10">
                {/* Brand Section */}
                <div className="flex flex-col items-center sm:items-start group">
                  <Link href="/" className="transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/logo.png"
                      alt="Lejar Logo"
                      className="h-14 w-auto mb-4 transition-shadow duration-300 group-hover:shadow-lg"
                    />
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left leading-relaxed">
                    Changing financial management with AI-driven analytics for a brighter economic future.
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center sm:items-start">
                  <h3 className="text-xl font-bold text-orange-800 dark:text-orange-400 mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 dark:after:from-orange-500 dark:after:to-orange-700 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Explore
                  </h3>
                  <ul className="space-y-3 text-sm font-medium">
                    <li className="transition-transform duration-300 hover:translate-x-2">
                      <Link href="#features" className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-200 flex items-center gap-2">
                        Features
                      </Link>
                    </li>
                    <li className="transition-transform duration-300 hover:translate-x-2">
                      <Link href="#testimonials" className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-200 flex items-center gap-2">
                        Testimonials
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col items-center sm:items-start">
                  <h3 className="text-xl font-bold text-orange-800 dark:text-orange-400 mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 dark:after:from-orange-500 dark:after:to-orange-700 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Contact Us
                  </h3>
                  <ul className="space-y-3 text-sm font-medium">
                    <li className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                      <Mail size={18} className="text-orange-600 dark:text-orange-500 flex-shrink-0" />
                      <a href="mailto:support@lejar.com" className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-200 truncate">
                        support@negai.africa
                      </a>
                    </li>
                    <li className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                      <Phone size={18} className="text-orange-600 dark:text-orange-500 flex-shrink-0" />
                      <a href="tel:+1234567890" className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-200">
                        +234 707 418 4693
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col items-center sm:items-start">
                  <h3 className="text-xl font-bold text-orange-800 dark:text-orange-400 mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 dark:after:from-orange-500 dark:after:to-orange-700 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-6">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300 hover:scale-125"
                    >
                      <Instagram size={26} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300 hover:scale-125"
                    >
                      <Twitter size={26} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300 hover:scale-125"
                    >
                      <Linkedin size={26} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="container mx-auto max-w-7xl mt-12 pt-8 border-t border-orange-200 dark:border-orange-800 text-center text-sm text-gray-600 dark:text-gray-400 relative z-10">
                <p>&copy; {new Date().getFullYear()} NEG AI Solutions. All rights reserved.</p>
              </div>
              {/* Back to Top Link */}
              <a
                href="#"
                className="fixed bottom-6 right-6 bg-orange-500 dark:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 hover:scale-110 z-20"
              >
                <ChevronUp size={24} />
              </a>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}