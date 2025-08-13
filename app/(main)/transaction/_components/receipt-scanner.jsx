"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
    const fileInputRef = useRef(null);

    const {
        loading: scanReceiptLoading,
        fn: scanReceiptFn,
        data: scannedData,
    } = useFetch(scanReceipt);

    const handleReceiptScan = async (file) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return;
        }

        await scanReceiptFn(file);
    };

    useEffect(() => {
        if (scannedData && !scanReceiptLoading) {
            onScanComplete(scannedData);
            toast.success("Receipt scanned successfully");
        }
    }, [scanReceiptLoading, scannedData, onScanComplete]);

    return (
        <div className="flex items-center justify-center w-full max-w-xs xxs:max-w-sm sm:max-w-md mx-auto">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleReceiptScan(file);
                }}
            />
            <Button
                type="button"
                variant="outline"
                className="w-full h-10 xxs:h-12 sm:h-14 px-3 xxs:px-4 sm:px-6 py-2 text-xs xxs:text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 border-none rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => fileInputRef.current?.click()}
                disabled={scanReceiptLoading}
                aria-label={scanReceiptLoading ? "Scanning receipt in progress" : "Scan receipt with AI"}
                aria-busy={scanReceiptLoading}
            >
                {scanReceiptLoading ? (
                    <>
                        <Loader2 className="mr-1 xxs:mr-2 h-4 xxs:h-5 sm:h-6 w-4 xxs:w-5 sm:w-6 animate-spin" />
                        <span>Scanning...</span>
                    </>
                ) : (
                    <>
                        <Camera className="mr-1 xxs:mr-2 h-4 xxs:h-5 sm:h-6 w-4 xxs:w-5 sm:w-6" />
                        <span>Scan Receipt</span>
                    </>
                )}
            </Button>
        </div>
    );
}