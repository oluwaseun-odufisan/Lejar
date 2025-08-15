"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./receipt-scanner";

export function AddTransactionForm({
    accounts,
    categories,
    editMode = false,
    initialData = null,
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
        reset,
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues:
            editMode && initialData
                ? {
                    type: initialData.type,
                    amount: initialData.amount.toString(),
                    description: initialData.description,
                    accountId: initialData.accountId,
                    category: initialData.category,
                    date: new Date(initialData.date),
                    isRecurring: initialData.isRecurring,
                    ...(initialData.recurringInterval && {
                        recurringInterval: initialData.recurringInterval,
                    }),
                }
                : {
                    type: "EXPENSE",
                    amount: "",
                    description: "",
                    accountId: accounts.find((ac) => ac.isDefault)?.id,
                    date: new Date(),
                    isRecurring: false,
                },
    });

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
    } = useFetch(editMode ? updateTransaction : createTransaction);

    const onSubmit = (data) => {
        const formData = {
            ...data,
            amount: parseFloat(data.amount),
        };

        if (editMode) {
            transactionFn(editId, formData);
        } else {
            transactionFn(formData);
        }
    };

    const handleScanComplete = (scannedData) => {
        if (scannedData) {
            setValue("amount", scannedData.amount.toString());
            setValue("date", new Date(scannedData.date));
            if (scannedData.description) {
                setValue("description", scannedData.description);
            }
            if (scannedData.category) {
                setValue("category", scannedData.category);
            }
            toast.success("Receipt scanned successfully");
        }
    };

    useEffect(() => {
        if (transactionResult?.success && !transactionLoading) {
            toast.success(
                editMode
                    ? "Transaction updated successfully"
                    : "Transaction created successfully"
            );
            reset();
            router.push(`/account/${transactionResult.data.accountId}`);
        }
    }, [transactionResult, transactionLoading, editMode, router, reset]);

    const type = watch("type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");

    const filteredCategories = categories.filter(
        (category) => category.type === type
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xs xxs:max-w-sm sm:max-w-md mx-auto space-y-3 xxs:space-y-4 sm:space-y-5 p-3 xxs:p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-[0_4px_20px_rgba(251,146,60,0.2)] border border-orange-100 dark:border-orange-700 transition-all duration-200 hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(251,146,60,0.3)]"
        >
            {/* Receipt Scanner Section */}
            {!editMode && (
                <section className="pb-3 xxs:pb-4 border-b border-orange-200 dark:border-orange-700">
                    <h2 className="text-sm xxs:text-base font-semibold text-orange-900 dark:text-orange-100 mb-2 xxs:mb-3">
                        Scan Receipt
                    </h2>
                    <ReceiptScanner onScanComplete={handleScanComplete} />
                </section>
            )}

            {/* Transaction Details Section */}
            <section className="space-y-3 xxs:space-y-4">
                {/* Type */}
                <div className="space-y-1">
                    <label
                        className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                        htmlFor="type"
                    >
                        Type
                    </label>
                    <Select
                        onValueChange={(value) => setValue("type", value)}
                        defaultValue={type}
                    >
                        <SelectTrigger
                            className="w-full h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-orange-50/20 dark:bg-orange-900/20 transition-all duration-150"
                            aria-label="Select transaction type"
                        >
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-md">
                            <SelectItem
                                value="EXPENSE"
                                className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                            >
                                Expense
                            </SelectItem>
                            <SelectItem
                                value="INCOME"
                                className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                            >
                                Income
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.type && (
                        <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                            {errors.type.message}
                        </p>
                    )}
                </div>

                {/* Amount and Account */}
                <div className="grid gap-2 xxs:gap-3 sm:grid-cols-2 bg-orange-50/10 dark:bg-orange-900/10 p-2 xxs:p-3 rounded-md">
                    <div className="space-y-1">
                        <label
                            className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                            htmlFor="amount"
                        >
                            Amount
                        </label>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-white dark:bg-gray-800 transition-all duration-150"
                            {...register("amount")}
                            aria-invalid={errors.amount ? "true" : "false"}
                            aria-label="Enter transaction amount"
                        />
                        {errors.amount && (
                            <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label
                            className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                            htmlFor="accountId"
                        >
                            Account
                        </label>
                        <Select
                            onValueChange={(value) => setValue("accountId", value)}
                            defaultValue={getValues("accountId")}
                        >
                            <SelectTrigger
                                className="w-full h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-white dark:bg-gray-800 transition-all duration-150"
                                aria-label="Select account"
                            >
                                <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-md">
                                {accounts.map((account) => (
                                    <SelectItem
                                        key={account.id}
                                        value={account.id}
                                        className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                                    >
                                        {account.name} (₦{parseFloat(account.balance).toFixed(2)})
                                    </SelectItem>
                                ))}
                                <CreateAccountDrawer>
                                    <Button
                                        variant="ghost"
                                        className="w-full py-1 text-xs xxs:text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-md transition-all duration-150"
                                        aria-label="Create new account"
                                    >
                                        Create Account
                                    </Button>
                                </CreateAccountDrawer>
                            </SelectContent>
                        </Select>
                        {errors.accountId && (
                            <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                                {errors.accountId.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                    <label
                        className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <Select
                        onValueChange={(value) => setValue("category", value)}
                        defaultValue={getValues("category")}
                    >
                        <SelectTrigger
                            className="w-full h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-orange-50/20 dark:bg-orange-900/20 transition-all duration-150"
                            aria-label="Select category"
                        >
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-md">
                            {filteredCategories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                    className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && (
                        <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                {/* Date */}
                <div className="space-y-1">
                    <label
                        className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                        htmlFor="date"
                    >
                        Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-orange-50/20 dark:bg-orange-900/20 transition-all duration-150",
                                    !date && "text-orange-800/50 dark:text-orange-200/50"
                                )}
                                aria-label="Select transaction date"
                            >
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-3 xxs:h-4 w-3 xxs:w-4 text-orange-800/50 dark:text-orange-200/50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-md">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => setValue("date", date)}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className="rounded-md border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800"
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.date && (
                        <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                            {errors.date.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <label
                        className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <Input
                        placeholder="Enter description"
                        className="h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-orange-50/20 dark:bg-orange-900/20 transition-all duration-150"
                        {...register("description")}
                        aria-invalid={errors.description ? "true" : "false"}
                        aria-label="Enter transaction description"
                    />
                    {errors.description && (
                        <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                            {errors.description.message}
                        </p>
                    )}
                </div>
            </section>

            {/* Recurring Section */}
            <section className="border-t border-orange-200 dark:border-orange-700 pt-3 xxs:pt-4">
                <div className="flex items-center justify-between bg-orange-50/10 dark:bg-orange-900/10 p-2 xxs:p-3 rounded-md">
                    <div className="space-y-0.5">
                        <label
                            className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                            htmlFor="isRecurring"
                        >
                            Recurring Transaction
                        </label>
                        <p className="text-xs text-orange-800/70 dark:text-orange-200/70">
                            Enable recurring schedule
                        </p>
                    </div>
                    <Switch
                        checked={isRecurring}
                        onCheckedChange={(checked) => setValue("isRecurring", checked)}
                        className="data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-600"
                        aria-label="Toggle recurring transaction"
                    />
                </div>
                {isRecurring && (
                    <div className="space-y-1 mt-2 xxs:mt-3">
                        <label
                            className="text-xs xxs:text-sm font-medium text-orange-900 dark:text-orange-100"
                            htmlFor="recurringInterval"
                        >
                            Recurring Interval
                        </label>
                        <Select
                            onValueChange={(value) => setValue("recurringInterval", value)}
                            defaultValue={getValues("recurringInterval")}
                        >
                            <SelectTrigger
                                className="w-full h-9 xxs:h-10 border-orange-300 dark:border-orange-600 text-orange-800 dark:text-orange-200 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-orange-500 dark:focus:border-orange-400 rounded-md bg-orange-50/20 dark:bg-orange-900/20 transition-all duration-150"
                                aria-label="Select recurring interval"
                            >
                                <SelectValue placeholder="Select interval" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 shadow-md rounded-md">
                                <SelectItem
                                    value="DAILY"
                                    className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                                >
                                    Daily
                                </SelectItem>
                                <SelectItem
                                    value="WEEKLY"
                                    className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                                >
                                    Weekly
                                </SelectItem>
                                <SelectItem
                                    value="MONTHLY"
                                    className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                                >
                                    Monthly
                                </SelectItem>
                                <SelectItem
                                    value="YEARLY"
                                    className="text-orange-800 dark:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/50"
                                >
                                    Yearly
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.recurringInterval && (
                            <p className="text-xs text-red-500 dark:text-red-400" aria-live="assertive">
                                {errors.recurringInterval.message}
                            </p>
                        )}
                    </div>
                )}
            </section>

            {/* Action Buttons */}
            <section className="border-t border-orange-200 dark:border-orange-700 pt-3 xxs:pt-4">
                <div className="flex flex-col sm:flex-row gap-2 xxs:gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-9 xxs:h-10 text-xs xxs:text-sm font-medium text-orange-600 dark:text-orange-400 border-orange-400 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 rounded-full shadow-sm hover:shadow-md transition-all duration-150"
                        onClick={() => router.back()}
                        aria-label="Cancel transaction"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-9 xxs:h-10 text-xs xxs:text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 rounded-full shadow-sm hover:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={transactionLoading}
                        aria-label={editMode ? "Update transaction" : "Create transaction"}
                        aria-busy={transactionLoading}
                    >
                        {transactionLoading ? (
                            <>
                                <Loader2 className="mr-1 h-3 xxs:h-4 w-3 xxs:w-4 animate-spin" />
                                {editMode ? "Updating" : "Creating"}
                            </>
                        ) : editMode ? (
                            "Update"
                        ) : (
                            "Create"
                        )}
                    </Button>
                </div>
            </section>
        </form>
    );
}