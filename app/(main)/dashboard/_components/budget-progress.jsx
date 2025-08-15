"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(
        initialBudget?.amount?.toString() || ""
    );

    const {
        loading: isLoading,
        fn: updateBudgetFn,
        data: updatedBudget,
        error,
    } = useFetch(updateBudget);

    const percentUsed = initialBudget
        ? (currentExpenses / initialBudget.amount) * 100
        : 0;

    const handleUpdateBudget = async () => {
        const amount = parseFloat(newBudget);

        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        await updateBudgetFn(amount);
    };

    const handleCancel = () => {
        setNewBudget(initialBudget?.amount?.toString() || "");
        setIsEditing(false);
    };

    useEffect(() => {
        if (updatedBudget?.success) {
            setIsEditing(false);
            toast.success("Budget updated successfully");
        }
    }, [updatedBudget]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to update budget");
        }
    }, [error]);

    return (
        <Card className="relative bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)] rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 xxs:pb-4 px-3 xxs:px-4 sm:px-6">
                <div className="space-y-1">
                    <CardTitle className="text-lg xxs:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-900 dark:text-orange-100">
                        Monthly Budget
                    </CardTitle>
                    <CardDescription className="text-xs xxs:text-sm lg:text-base text-orange-700/70 dark:text-orange-300/70">
                        {initialBudget
                            ? `₦${currentExpenses.toFixed(2)} of ₦${initialBudget.amount.toFixed(2)} spent`
                            : "No budget set"}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-1 xxs:gap-2">
                    {isEditing ? (
                        <>
                            <Input
                                type="number"
                                value={newBudget}
                                onChange={(e) => setNewBudget(e.target.value)}
                                className="w-24 xxs:w-28 sm:w-32 lg:w-36 text-xs xxs:text-sm lg:text-base border-orange-300 dark:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg"
                                placeholder="Amount"
                                autoFocus
                                disabled={isLoading}
                                aria-label="Edit budget amount"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleUpdateBudget}
                                disabled={isLoading}
                                className="text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-lg"
                                aria-label="Save budget"
                            >
                                <Check className="h-4 xxs:h-5 w-4 xxs:w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="text-orange-800 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-900 dark:hover:text-orange-400 rounded-lg"
                                aria-label="Cancel editing"
                            >
                                <X className="h-4 xxs:h-5 w-4 xxs:w-5" />
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditing(true)}
                            className="text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-lg"
                            aria-label="Edit budget"
                        >
                            <Pencil className="h-4 xxs:h-5 w-4 xxs:w-5" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="px-3 xxs:px-4 sm:px-6 pb-4 xxs:pb-5 sm:pb-6">
                {initialBudget && (
                    <div className="space-y-2 xxs:space-y-3">
                        <Progress
                            value={percentUsed}
                            className={`h-2 xxs:h-3 rounded-full ${
                                percentUsed >= 90
                                    ? "bg-red-100 dark:bg-red-900/50 [&>div]:bg-red-500 dark:[&>div]:bg-red-400"
                                    : percentUsed >= 75
                                        ? "bg-yellow-100 dark:bg-yellow-900/50 [&>div]:bg-yellow-500 dark:[&>div]:bg-yellow-400"
                                        : "bg-orange-100 dark:bg-orange-900/50 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-orange-600 dark:[&>div]:from-orange-400 dark:[&>div]:to-orange-500"
                            } transition-all duration-500`}
                            aria-label={`Budget progress: ${percentUsed.toFixed(1)}% used`}
                        />
                        <p className="text-xs xxs:text-sm lg:text-base text-orange-700 dark:text-orange-300 text-right">
                            {percentUsed.toFixed(1)}% used
                        </p>
                    </div>
                )}
            </CardContent>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-orange-100/20 dark:from-orange-900/20 dark:to-orange-800/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </Card>
    );
}