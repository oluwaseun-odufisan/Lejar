"use client";

import { useState, useEffect, useMemo } from "react";
import {
    ChevronDown,
    ChevronUp,
    MoreHorizontal,
    Trash,
    Search,
    X,
    RefreshCw,
    Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { bulkDeleteTransactions } from "@/actions/account";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const CATEGORY_COLORS = {
    Food: "#C2410C", // orange-900
    Transport: "#EA580C", // orange-700
    Entertainment: "#B45309", // orange-800
    Shopping: "#78350F", // orange-950
    Bills: "#8B5CF6", // purple-500
    Other: "#6D28D9", // purple-700
    Default: "#5B21B6", // purple-800
};

export function NoPaginationTransactionTable({ transactions }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [recurringFilter, setRecurringFilter] = useState("");
    const router = useRouter();

    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter((transaction) =>
                transaction.description?.toLowerCase().includes(searchLower)
            );
        }

        if (typeFilter) {
            result = result.filter((transaction) => transaction.type === typeFilter);
        }

        if (recurringFilter) {
            result = result.filter((transaction) => {
                if (recurringFilter === "recurring") return transaction.isRecurring;
                return !transaction.isRecurring;
            });
        }

        result.sort((a, b) => {
            let comparison = 0;
            switch (sortConfig.field) {
                case "date":
                    comparison = new Date(a.date) - new Date(b.date);
                    break;
                case "amount":
                    comparison = a.amount - b.amount;
                    break;
                case "category":
                    comparison = a.category.localeCompare(b.category);
                    break;
                default:
                    comparison = 0;
            }
            return sortConfig.direction === "asc" ? comparison : -comparison;
        });

        return result;
    }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction: current.field === field && current.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSelect = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedIds((current) =>
            current.length === filteredAndSortedTransactions.length
                ? []
                : filteredAndSortedTransactions.map((t) => t.id)
        );
    };

    const {
        loading: deleteLoading,
        fn: deleteFn,
        data: deleted,
    } = useFetch(bulkDeleteTransactions);

    const handleBulkDelete = async () => {
        if (
            !window.confirm(
                `Are you sure you want to delete ${selectedIds.length} transactions?`
            )
        )
            return;

        deleteFn(selectedIds);
    };

    useEffect(() => {
        if (deleted && !deleteLoading) {
            toast.success("Transactions deleted successfully");
        }
    }, [deleted, deleteLoading]);

    const handleClearFilters = () => {
        setSearchTerm("");
        setTypeFilter("");
        setRecurringFilter("");
        setSelectedIds([]);
    };

    return (
        <div className="space-y-4 xxs:space-y-5 sm:space-y-6">
            {deleteLoading && (
                <div className="flex justify-center">
                    <BarLoader
                        width="100%"
                        color="#F97316"
                        cssOverride={{
                            backgroundColor: "#fed7aa",
                            borderRadius: "9999px",
                            opacity: 0.8,
                            maxWidth: "300px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        aria-label="Deleting transactions"
                    />
                </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] p-4 xxs:p-5 sm:p-6 border-orange-200 dark:border-orange-700">
                <div className="flex flex-col sm:flex-row gap-3 xxs:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 xxs:left-3 top-1/2 transform -translate-y-1/2 h-4 xxs:h-5 w-4 xxs:w-5 text-orange-500 dark:text-orange-400" />
                        <Input
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 xxs:pl-10 text-xs xxs:text-sm border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            aria-label="Search transactions"
                        />
                    </div>
                    <div className="flex gap-3 xxs:gap-4">
                        <Select
                            value={typeFilter}
                            onValueChange={setTypeFilter}
                            aria-label="Filter by transaction type"
                        >
                            <SelectTrigger className="w-28 xxs:w-32 sm:w-36 text-xs xxs:text-sm border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-lg">
                                <SelectItem value="INCOME" className="text-xs xxs:text-sm text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400">
                                    Income
                                </SelectItem>
                                <SelectItem value="EXPENSE" className="text-xs xxs:text-sm text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400">
                                    Expense
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={recurringFilter}
                            onValueChange={setRecurringFilter}
                            aria-label="Filter by recurring status"
                        >
                            <SelectTrigger className="w-36 xxs:w-40 sm:w-44 text-xs xxs:text-sm border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                <SelectValue placeholder="All Transactions" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-lg">
                                <SelectItem value="recurring" className="text-xs xxs:text-sm text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400">
                                    Recurring Only
                                </SelectItem>
                                <SelectItem value="non-recurring" className="text-xs xxs:text-sm text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400">
                                    Non-recurring Only
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {(searchTerm || typeFilter || recurringFilter) && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleClearFilters}
                                className="h-8 xxs:h-9 sm:h-10 w-8 xxs:w-9 sm:w-10 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                aria-label="Clear all filters"
                            >
                                <X className="h-4 xxs:h-5 w-4 xxs:w-5" />
                            </Button>
                        )}
                        {selectedIds.length > 0 && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleBulkDelete}
                                className="bg-orange-600 dark:bg-orange-700 text-white hover:bg-orange-700 dark:hover:bg-orange-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                aria-label={`Delete ${selectedIds.length} selected transactions`}
                            >
                                <Trash className="h-3 xxs:h-4 w-3 xxs:w-4 mr-1 xxs:mr-2" />
                                Delete ({selectedIds.length})
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 border-orange-200 dark:border-orange-700 shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-orange-50/50 dark:bg-orange-900/20 hover:bg-orange-100/50 dark:hover:bg-orange-900/30">
                            <TableHead className="w-10 xxs:w-12">
                                <Checkbox
                                    checked={
                                        selectedIds.length === filteredAndSortedTransactions.length &&
                                        filteredAndSortedTransactions.length > 0
                                    }
                                    onCheckedChange={handleSelectAll}
                                    aria-label="Select all transactions"
                                />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer text-xs xxs:text-sm font-semibold text-orange-900 dark:text-orange-100"
                                onClick={() => handleSort("date")}
                            >
                                <div className="flex items-center">
                                    Date
                                    {sortConfig.field === "date" && (
                                        sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400" />
                                        )
                                    )}
                                </div>
                            </TableHead>
                            <TableHead className="text-xs xxs:text-sm font-semibold text-orange-900 dark:text-orange-100">
                                Description
                            </TableHead>
                            <TableHead
                                className="cursor-pointer text-xs xxs:text-sm font-semibold text-orange-900 dark:text-orange-100"
                                onClick={() => handleSort("category")}
                            >
                                <div className="flex items-center">
                                    Category
                                    {sortConfig.field === "category" && (
                                        sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400" />
                                        )
                                    )}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer text-xs xxs:text-sm font-semibold text-orange-900 dark:text-orange-100 text-right"
                                onClick={() => handleSort("amount")}
                            >
                                <div className="flex items-center justify-end">
                                    Amount
                                    {sortConfig.field === "amount" && (
                                        sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400" />
                                        )
                                    )}
                                </div>
                            </TableHead>
                            <TableHead className="text-xs xxs:text-sm font-semibold text-orange-900 dark:text-orange-100">
                                Recurring
                            </TableHead>
                            <TableHead className="w-10 xxs:w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-xs xxs:text-sm text-orange-700/70 dark:text-orange-200/70 py-4 xxs:py-6"
                                >
                                    No transactions found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions.map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    className="hover:bg-orange-50/30 dark:hover:bg-orange-900/30 transition-all duration-200"
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(transaction.id)}
                                            onCheckedChange={() => handleSelect(transaction.id)}
                                            aria-label={`Select transaction ${transaction.description || "Untitled"}`}
                                        />
                                    </TableCell>
                                    <TableCell className="text-xs xxs:text-sm text-orange-900 dark:text-orange-100">
                                        {format(new Date(transaction.date), "PPP")}
                                    </TableCell>
                                    <TableCell className="text-xs xxs:text-sm text-orange-900 dark:text-orange-100">
                                        {transaction.description || "Untitled Transaction"}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        <span
                                            style={{
                                                background: CATEGORY_COLORS[transaction.category] || CATEGORY_COLORS.Default,
                                            }}
                                            className="px-2 xxs:px-3 py-0.5 xxs:py-1 rounded-lg text-white text-xs font-medium group-hover:scale-105 transition-transform duration-200"
                                        >
                                            {transaction.category}
                                        </span>
                                    </TableCell>
                                    <TableCell
                                        className={cn(
                                            "text-right text-xs xxs:text-sm font-semibold",
                                            transaction.type === "EXPENSE" ? "text-orange-800 dark:text-orange-300" : "text-orange-600 dark:text-orange-400"
                                        )}
                                    >
                                        {transaction.type === "EXPENSE" ? "-" : "+"}
                                        ₦{transaction.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.isRecurring ? (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Badge
                                                            variant="secondary"
                                                            className="gap-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-900/70 shadow-sm group-hover:scale-105 transition-transform duration-200"
                                                        >
                                                            <RefreshCw className="h-3 xxs:h-4 w-3 xxs:w-4" />
                                                            {RECURRING_INTERVALS[transaction.recurringInterval]}
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-lg">
                                                        <div className="text-xs xxs:text-sm">
                                                            <div className="font-medium">Next Date:</div>
                                                            <div>{format(new Date(transaction.nextRecurringDate), "PPP")}</div>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ) : (
                                            <Badge
                                                variant="outline"
                                                className="gap-1 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 shadow-sm group-hover:scale-105 transition-transform duration-200"
                                            >
                                                <Clock className="h-3 xxs:h-4 w-3 xxs:w-4" />
                                                One-time
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 xxs:h-10 w-8 xxs:w-10 p-0 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                                    aria-label="Transaction options"
                                                >
                                                    <MoreHorizontal className="h-4 xxs:h-5 w-4 xxs:w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-lg"
                                            >
                                                <DropdownMenuItem
                                                    onClick={() => router.push(`/transaction/create?edit=${transaction.id}`)}
                                                    className="text-xs xxs:text-sm text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400"
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-orange-100 dark:bg-orange-700/50" />
                                                <DropdownMenuItem
                                                    className="text-xs xxs:text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300"
                                                    onClick={() => deleteFn([transaction.id])}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}