export const defaultCategories = [
    // Income Categories
    {
        id: "salary",
        name: "Salary",
        type: "INCOME",
        color: "#F97316", // orange-500
        icon: "Wallet",
    },
    {
        id: "freelance",
        name: "Freelance",
        type: "INCOME",
        color: "#FB923C", // orange-400
        icon: "Laptop",
    },
    {
        id: "investments",
        name: "Investments",
        type: "INCOME",
        color: "#FBBF24", // amber-400
        icon: "TrendingUp",
    },
    {
        id: "business",
        name: "Business",
        type: "INCOME",
        color: "#F59E0B", // amber-500
        icon: "Building",
    },
    {
        id: "rental",
        name: "Rental",
        type: "INCOME",
        color: "#FFEDD5", // orange-100
        icon: "Home",
    },
    {
        id: "other-income",
        name: "Other Income",
        type: "INCOME",
        color: "#6B7280", // gray-500
        icon: "Plus",
    },

    // Expense Categories
    {
        id: "housing",
        name: "Housing",
        type: "EXPENSE",
        color: "#EA580C", // orange-600
        icon: "Home",
        subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
    },
    {
        id: "transportation",
        name: "Transportation",
        type: "EXPENSE",
        color: "#F97316", // orange-500
        icon: "Car",
        subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
    },
    {
        id: "groceries",
        name: "Groceries",
        type: "EXPENSE",
        color: "#FB923C", // orange-400
        icon: "Shopping",
    },
    {
        id: "utilities",
        name: "Utilities",
        type: "EXPENSE",
        color: "#FDBA74", // orange-300
        icon: "Zap",
        subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
    },
    {
        id: "entertainment",
        name: "Entertainment",
        type: "EXPENSE",
        color: "#FBBF24", // amber-400
        icon: "Film",
        subcategories: ["Movies", "Games", "Streaming Services"],
    },
    {
        id: "food",
        name: "Food",
        type: "EXPENSE",
        color: "#F59E0B", // amber-500
        icon: "UtensilsCrossed",
    },
    {
        id: "shopping",
        name: "Shopping",
        type: "EXPENSE",
        color: "#FFEDD5", // orange-100
        icon: "ShoppingBag",
        subcategories: ["Clothing", "Electronics", "Home Goods"],
    },
    {
        id: "healthcare",
        name: "Healthcare",
        type: "EXPENSE",
        color: "#EA580C", // orange-600
        icon: "HeartPulse",
        subcategories: ["Medical", "Dental", "Pharmacy", "Insurance"],
    },
    {
        id: "education",
        name: "Education",
        type: "EXPENSE",
        color: "#D97706", // amber-600
        icon: "GraduationCap",
        subcategories: ["Tuition", "Books", "Courses"],
    },
    {
        id: "personal",
        name: "Personal Care",
        type: "EXPENSE",
        color: "#F472B6", // pink-400 (complementary for variety)
        icon: "Smile",
        subcategories: ["Haircut", "Gym", "Beauty"],
    },
    {
        id: "travel",
        name: "Travel",
        type: "EXPENSE",
        color: "#FCD34D", // amber-300
        icon: "Plane",
    },
    {
        id: "insurance",
        name: "Insurance",
        type: "EXPENSE",
        color: "#6B7280", // gray-500
        icon: "Shield",
        subcategories: ["Life", "Home", "Vehicle"],
    },
    {
        id: "gifts",
        name: "Gifts & Donations",
        type: "EXPENSE",
        color: "#FBBF24", // amber-400
        icon: "Gift",
    },
    {
        id: "bills",
        name: "Bills & Fees",
        type: "EXPENSE",
        color: "#FB923C", // orange-400
        icon: "Receipt",
        subcategories: ["Bank Fees", "Late Fees", "Service Charges"],
    },
    {
        id: "other-expense",
        name: "Other Expenses",
        type: "EXPENSE",
        color: "#9CA3AF", // gray-400
        icon: "MoreHorizontal",
    },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
    acc[category.id] = category.color;
    return acc;
}, {});