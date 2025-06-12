"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function PaymentSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      {/* <Header /> */}

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Success Card with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-2 border-green-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2" />
              <CardContent className="pt-6 pb-8 px-6">
                <div className="text-center">
                  {/* Success Icon Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="mx-auto mb-6 bg-green-100 rounded-full p-3 w-24 h-24 flex items-center justify-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Payment Successful!
                    </h1>
                    <p className="text-gray-600 mb-6">
                      Your tip has been sent successfully.
                    </p>
                  </motion.div>

                  {/* Animated Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-full h-px bg-gray-200 my-6"
                  />

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-3"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      asChild
                    >
                      <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Return to homepage
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-gray-600"
          >
            A confirmation receipt has been sent to your email.
          </motion.div>
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                top: "-10%",
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: [
                  "#34D399", // green-400
                  "#10B981", // green-500
                  "#059669", // green-600
                  "#6EE7B7", // green-300
                  "#A7F3D0", // green-200
                  "#A855F7", // purple-500
                  "#8B5CF6", // violet-500
                  "#3B82F6", // blue-500
                ][Math.floor(Math.random() * 8)],
                borderRadius: "50%",
              }}
              animate={{
                top: "110%",
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "linear",
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
