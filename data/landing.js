import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
    {
        value: "75K+",
        label: "Active Users",
    },
    {
        value: "₦10B+",
        label: "Transactions Tracked",
    },
    {
        value: "99.9%",
        label: "Uptime",
    },
    {
        value: "4.8/5",
        label: "User Rating",
    },
];

// Features Data
export const featuresData = [
    {
        icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
        title: "Smart Analytics",
        description:
            "Dive into your spending habits with clear, AI-driven insights tailored to your financial journey.",
    },
    {
        icon: <Receipt className="h-8 w-8 text-orange-600" />,
        title: "Receipt Scanner",
        description:
            "Snap your receipts and let our AI pull out the details, saving you time for what matters.",
    },
    {
        icon: <PieChart className="h-8 w-8 text-orange-600" />,
        title: "Budget Builder",
        description:
            "Plan your finances with smart tools that suggest ways to save and spend wisely.",
    },
    {
        icon: <CreditCard className="h-8 w-8 text-orange-600" />,
        title: "All-in-One Accounts",
        description:
            "Track your bank accounts, cards, and mobile payments in one simple dashboard.",
    },
    {
        icon: <Globe className="h-8 w-8 text-orange-600" />,
        title: "Naira & Beyond",
        description:
            "Handle payments in naira or foreign currencies with real-time exchange rates.",
    },
    {
        icon: <Zap className="h-8 w-8 text-orange-600" />,
        title: "Instant Tips",
        description:
            "Get quick, practical advice to grow your savings and make smarter money moves.",
    },
];

// How It Works Data
export const howItWorksData = [
    {
        icon: <CreditCard className="h-8 w-8 text-orange-600" />,
        title: "1. Join the Platform",
        description:
            "Sign up in minutes with a secure process designed for you on the go.",
    },
    {
        icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
        title: "2. Monitor Your Money",
        description:
            "See where your cash flows with automatic tracking of your daily transactions.",
    },
    {
        icon: <PieChart className="h-8 w-8 text-orange-600" />,
        title: "3. Unlock Insights",
        description:
            "Get tailored tips to manage your finances better, from Lagos to Abuja and beyond.",
    },
];

// Testimonials Data
export const testimonialsData = [
    {
        name: "Chinwe Okeke",
        role: "Small Business Owner",
        image: "https://randomuser.me/api/portraits/women/16.jpg",
        quote:
            "This app has changed how I run my shop in Ikeja. The insights help me cut costs and plan better for market days.",
    },
    {
        name: "Tunde Adebayo",
        role: "Freelancer",
        image: "https://randomuser.me/api/portraits/men/16.jpg",
        quote:
            "Scanning receipts is a breeze now. I can focus on my graphic design gigs instead of stressing over expense records.",
    },
    {
        name: "Aisha Ibrahim",
        role: "Financial Consultant",
        image: "https://randomuser.me/api/portraits/women/36.jpg",
        quote:
            "I recommend Lejar to my friends across Nigeria. The naira and dollar tracking makes it perfect for my international spendings.",
    },
];