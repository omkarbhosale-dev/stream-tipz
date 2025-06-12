"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { XCircle, ArrowLeft, RefreshCcw, HelpCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const streamer = searchParams.get("streamer") || "StreamerName";
  const errorCode = searchParams.get("code") || "payment_failed";

  const errorMessage =
    "An unexpected error occurred during payment processing.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      {/* <Header /> */}

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Failed Card with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-2 border-red-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 to-rose-500 h-2" />
              <CardContent className="pt-6 pb-8 px-6">
                <div className="text-center">
                  {/* Error Icon Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="mx-auto mb-6 bg-red-100 rounded-full p-3 w-24 h-24 flex items-center justify-center"
                  >
                    <XCircle className="w-16 h-16 text-red-500" />
                  </motion.div>

                  {/* Error Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Payment Failed
                    </h1>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>
                  </motion.div>

                  {/* Animated Error Details */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: 0.6 }}
                    className="bg-red-50 rounded-lg p-4 mb-6 text-left"
                  >
                    <p className="text-sm text-red-800 text-center">
                      <span className="font-medium">Error:</span> There is an
                      error processing your payment.
                    </p>
                    <p className="text-center text-sm text-red-800 mt-1">
                      Please try again later.
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-3"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      asChild
                    >
                      <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated Support Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-gray-600"
          >
            Need assistance? Contact our{" "}
            <Link href="/support" className="text-purple-600 hover:underline">
              support team
            </Link>
            .
          </motion.div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-200 rounded-full opacity-20"
            initial={{
              top: `${20 + i * 30}%`,
              left: `${20 + i * 20}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
