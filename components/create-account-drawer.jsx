"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

export function CreateAccountDrawer({ children }) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        },
    });

    const {
        loading: createAccountLoading,
        fn: createAccountFn,
        error,
        data: newAccount,
    } = useFetch(createAccount);

    const onSubmit = async (data) => {
        await createAccountFn(data);
    };

    useEffect(() => {
        if (newAccount) {
            toast.success("Account created successfully");
            reset();
            setOpen(false);
        }
    }, [newAccount, reset]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to create account");
        }
    }, [error]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="bg-white/95 dark:bg-gray-900/95 border-t border-orange-200 dark:border-orange-700 shadow-lg dark:shadow-[0_4px_20px_rgba(251,146,60,0.25)] rounded-t-2xl">
                <div className="relative bg-gradient-to-b from-orange-50/50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
                    <DrawerHeader className="px-4 xxs:px-5 sm:px-6 pt-4 xxs:pt-5 sm:pt-6">
                        <DrawerTitle className="text-lg xxs:text-xl sm:text-2xl font-semibold text-orange-900 dark:text-orange-100 tracking-tight">
                            Create New Account
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 xxs:px-5 sm:px-6 pb-4 xxs:pb-5 sm:pb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 xxs:space-y-5">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm xxs:text-base font-medium text-orange-800 dark:text-orange-200"
                                >
                                    Account Name
                                </label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Main Checking"
                                    {...register("name")}
                                    className="group text-sm xxs:text-base border-orange-300 dark:border-orange-600 bg-white/80 dark:bg-gray-800/80 text-orange-800 dark:text-orange-200 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.01]"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <p id="name-error" className="text-sm text-red-500 dark:text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="type"
                                    className="text-sm xxs:text-base font-medium text-orange-800 dark:text-orange-200"
                                >
                                    Account Type
                                </label>
                                <Select
                                    onValueChange={(value) => setValue("type", value)}
                                    defaultValue={watch("type")}
                                    aria-invalid={errors.type ? "true" : "false"}
                                    aria-describedby={errors.type ? "type-error" : undefined}
                                >
                                    <SelectTrigger
                                        id="type"
                                        className="group text-sm xxs:text-base border-orange-300 dark:border-orange-600 bg-white/80 dark:bg-gray-800/80 text-orange-800 dark:text-orange-200 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.01]"
                                    >
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-lg rounded-lg">
                                        <SelectItem
                                            value="CURRENT"
                                            className="text-sm xxs:text-base text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 group-hover:scale-105"
                                        >
                                            Current
                                        </SelectItem>
                                        <SelectItem
                                            value="SAVINGS"
                                            className="text-sm xxs:text-base text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 group-hover:scale-105"
                                        >
                                            Savings
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <p id="type-error" className="text-sm text-red-500 dark:text-red-400">
                                        {errors.type.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="balance"
                                    className="text-sm xxs:text-base font-medium text-orange-800 dark:text-orange-200"
                                >
                                    Initial Balance
                                </label>
                                <Input
                                    id="balance"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register("balance")}
                                    className="group text-sm xxs:text-base border-orange-300 dark:border-orange-600 bg-white/80 dark:bg-gray-800/80 text-orange-800 dark:text-orange-200 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.01]"
                                    aria-invalid={errors.balance ? "true" : "false"}
                                    aria-describedby={errors.balance ? "balance-error" : undefined}
                                />
                                {errors.balance && (
                                    <p id="balance-error" className="text-sm text-red-500 dark:text-red-400">
                                        {errors.balance.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-orange-200 dark:border-orange-700 bg-orange-50/70 dark:bg-orange-900/20 p-3 xxs:p-4 shadow-sm dark:shadow-[0_2px_8px_rgba(251,146,60,0.15)] transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_4px_12px_rgba(251,146,60,0.2)]">
                                <div className="space-y-0.5">
                                    <label
                                        htmlFor="isDefault"
                                        className="text-sm xxs:text-base font-medium text-orange-800 dark:text-orange-200 cursor-pointer"
                                    >
                                        Set as Default
                                    </label>
                                    <p className="text-xs xxs:text-sm text-orange-700/70 dark:text-orange-200/70">
                                        This account will be selected by default for transactions
                                    </p>
                                </div>
                                <Switch
                                    id="isDefault"
                                    checked={watch("isDefault")}
                                    onCheckedChange={(checked) => setValue("isDefault", checked)}
                                    className="data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-400 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-600"
                                    thumbClassName="bg-white dark:bg-gray-200 shadow-sm translate-x-0.5 data-[state=checked]:translate-x-[1.15rem] transition-all duration-200"
                                    aria-label="Set as default account"
                                />
                            </div>

                            <div className="flex gap-3 xxs:gap-4 pt-4 xxs:pt-5">
                                <DrawerClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="group flex-1 text-sm xxs:text-base border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]"
                                        aria-label="Cancel account creation"
                                    >
                                        Cancel
                                    </Button>
                                </DrawerClose>
                                <Button
                                    type="submit"
                                    className="group flex-1 text-sm xxs:text-base bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                                    disabled={createAccountLoading}
                                    aria-label="Create account"
                                >
                                    {createAccountLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 xxs:h-5 w-4 xxs:w-5 animate-spin text-orange-100" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                    {/* Subtle Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-amber-50/20 dark:from-orange-900/10 dark:to-gray-800/10 pointer-events-none"></div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}