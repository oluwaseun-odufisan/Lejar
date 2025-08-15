"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
    const { name, type, balance, id, isDefault } = account;

    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updatedAccount,
        error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async (event) => {
        event.preventDefault(); // Prevent navigation
        event.stopPropagation(); // Stop event bubbling to Link

        if (isDefault) {
            toast.warning("You need at least one default account");
            return;
        }

        await updateDefaultFn(id);
    };

    useEffect(() => {
        if (updatedAccount?.success) {
            toast.success("Default account updated successfully");
        }
    }, [updatedAccount]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to update default account");
        }
    }, [error]);

    return (
        <Card className="relative bg-gradient-to-br from-orange-50/70 via-amber-50/50 to-orange-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900/30 border-orange-200 dark:border-orange-700 shadow-lg dark:shadow-[0_4px_20px_rgba(251,146,60,0.25)] rounded-3xl overflow-hidden group transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_8px_24px_rgba(251,146,60,0.3)] hover:scale-[1.02]">
            <Link href={`/account/${id}`} className="block">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 xxs:pb-4 px-3 xxs:px-4 sm:px-5">
                    <CardTitle className="text-base xxs:text-lg lg:text-xl xl:text-2xl font-semibold text-orange-900 dark:text-orange-100 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                        {name}
                    </CardTitle>
                    <div className="flex items-center gap-1 xxs:gap-2">
                        {isDefault && (
                            <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-200 font-medium text-xs xxs:text-sm lg:text-base group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-all duration-300">
                                Default
                            </Badge>
                        )}
                        <Switch
                            checked={isDefault}
                            onClick={handleDefaultChange}
                            disabled={updateDefaultLoading}
                            className="data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-600 group-hover:scale-110 transition-transform duration-300"
                            aria-label={`Set ${name} as default account`}
                        />
                    </div>
                </CardHeader>
                <CardContent className="px-3 xxs:px-4 sm:px-5 pt-2">
                    <div className="flex items-center gap-2 xxs:gap-3">
                        <div className="bg-orange-100 dark:bg-orange-900/50 rounded-full p-2 xxs:p-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-all duration-300 group/icon">
                            <CreditCard className="h-5 xxs:h-6 w-5 xxs:w-6 text-orange-500 dark:text-orange-400 group-hover/icon:rotate-12 transition-transform duration-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg xxs:text-xl sm:text-2xl lg:text-3xl font-bold text-orange-900 dark:text-orange-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                                ₦{parseFloat(balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs xxs:text-sm lg:text-base text-orange-700 dark:text-orange-300 capitalize">
                                {type} Account
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs xxs:text-sm lg:text-base text-orange-700 dark:text-orange-300 px-3 xxs:px-4 sm:px-5 pb-4 xxs:pb-5">
                    <div className="flex items-center gap-1 group/icon">
                        <ArrowUpRight className="h-3 xxs:h-4 w-3 xxs:w-4 text-orange-600 dark:text-orange-400 group-hover/icon:scale-110 transition-transform duration-300" />
                        Income
                    </div>
                    <div className="flex items-center gap-1 group/icon">
                        <ArrowDownRight className="h-3 xxs:h-4 w-3 xxs:w-4 text-orange-800 dark:text-orange-500 group-hover/icon:scale-110 transition-transform duration-300" />
                        Expense
                    </div>
                </CardFooter>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-orange-100/20 dark:from-orange-900/20 dark:to-orange-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-300/50 dark:group-hover:border-orange-600/50 rounded-3xl transition-all duration-500 pointer-events-none animate-pulse-slow"></div>
            </Link>
        </Card>
    );
}