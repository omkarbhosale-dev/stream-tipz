"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Gift } from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getStreamerUsername } from "@/actions/onboarding.acion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const tipAmounts = [20, 25, 50, 100, 250, 500];

export default function TipPage({
  params,
}: {
  params: { params: Promise<{ streamer: string }> };
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const streamerName = decodeURIComponent(resolvedParams.streamer);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [tipperName, setTipperName] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [streamerData, setStreamerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchStreamerData = async () => {
      try {
        const data = await getStreamerUsername(streamerName);

        if (data.success) {
          setStreamerData(data.data);
        } else {
          console.error("Failed to fetch streamer data:", data.error);
          router.push("/");
        }
      } catch (error) {
        console.error("Critical error in data fetch:", error);
        router.push("/error");
      } finally {
        setLoading(false); // Always set loading to false
      }
    };

    fetchStreamerData();
  }, [streamerName, router]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading streamer data...</div>
      </div>
    );
  }

  // Handle case where data couldn't be loaded
  if (!streamerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">
          Streamer not found. Redirecting...
        </div>
      </div>
    );
  }

  const handleTip = async () => {
    const amount = selectedAmount || Number.parseFloat(customAmount);

    if (!amount || amount <= 10) {
      toast.error("Please enter a valid tip amount greater than ₹10.");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment data
      const paymentData = {
        amount,
        productInfo: `Tip|${streamerData.username}`,
        firstName: tipperName || "Anonymous",
        email: "user@example.com", // In real app, collect user email
        phone: "9999999999", // In real app, collect user phone
      };

      // Initiate payment
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment initiation failed");

      const { url, params } = await response.json();

      // Create form to redirect to PayU
      const form = document.createElement("form");
      form.method = "post";
      form.action = url;

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Streamer Info */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24 border-4 border-purple-200">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={streamerName}
                      />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        {streamerName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-2xl">
                    {streamerData.displayName}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {streamerData.bio}
                  </CardDescription>
                  <div className="flex justify-center space-x-4 mt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-semibold">856</span>
                      </div>
                      <span className="text-sm text-gray-500">Tips</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Thanks for supporting my stream! Your tips help me create
                    better content and improve my setup. Every contribution
                    means the world to me! 🎮✨
                  </p>
                </CardContent>
              </Card>

              {/* Recent Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-purple-600" />
                    <span>Recent Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      name: "Anonymous",
                      amount: 25,
                      message: "Great stream! Keep it up!",
                    },
                    {
                      name: "GamerPro123",
                      amount: 10,
                      message: "Love your content!",
                    },
                    {
                      name: "StreamFan",
                      amount: 50,
                      message: "Amazing gameplay today!",
                    },
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                          {tip.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {tip.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            ₹{tip.amount}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {tip.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Tip Form */}
            <div className="space-y-6">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Send a Tip</span>
                  </CardTitle>
                  <CardDescription>
                    Show your support and send a message to {streamerName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="tipper-name">Name</Label>
                      <div className="relative">
                        <Input
                          id="tipper-name"
                          type="text"
                          placeholder="Enter your name"
                          className="h-12"
                          value={tipperName}
                          onChange={(e) => {
                            setTipperName(e.target.value);
                          }}
                          min="1"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <Label className="text-base font-medium">
                      Choose Amount
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {tipAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          className={`h-12 ${
                            selectedAmount === amount
                              ? "bg-gradient-to-r from-purple-600 to-blue-600"
                              : "hover:border-purple-300"
                          }`}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                        >
                          ₹ {amount}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custom-amount">Custom Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                          ₹
                        </span>

                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="Enter custom amount"
                          className="pl-10 h-12"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(null);
                          }}
                          min="1"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message for the streamer..."
                      className="min-h-[100px] resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={200}
                    />
                    <div className="text-right text-sm text-gray-500">
                      {message.length}/200
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  {/* <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Send anonymously
                    </Label>
                  </div> */}

                  {/* Submit Button */}
                  <Button
                    onClick={handleTip}
                    disabled={!selectedAmount && !customAmount}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        Send Tip ₹{selectedAmount || customAmount || 0}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Secure payment powered by PayU. Your information is
                    protected.
                  </p>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Accepted Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      MC
                    </div>
                    <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      AMEX
                    </div>
                    <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center text-gray-900 text-xs font-bold">
                      PP
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
