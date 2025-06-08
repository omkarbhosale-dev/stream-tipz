"use client";

import { onboardingSchema } from "@/schemas/onboarding.schema";
import { z } from "zod";
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
import { CreditCard, User } from "lucide-react";
import { useState, useEffect } from "react";
import { onBoardingAction, getStreamer } from "@/actions/onboarding.acion";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OnBoarding = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until session is loaded and authenticated
    if (status !== "authenticated") return;

    const fetchStreamer = async () => {
      try {
        // console.log("Session:", session);
        // console.log("User ID:", session?.user?.id);

        if (!session?.user?.id) {
          console.error("User ID is undefined.");
          return;
        }

        const data = await getStreamer(session.user.id);
        // console.log("Fetched Streamer Data:", data);

        if (data?.success) {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Error fetching streamer:", err);
      }
    };

    fetchStreamer();
  }, [status, session]);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [upiId, setUpiId] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: "username" | "displayName" | "jwtToken" | "bio" | "upiId",
    value: string
  ) => {
    try {
      onboardingSchema
        .pick({ [field]: true } as Record<typeof field, true>)
        .parse({ [field]: value });
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err: unknown) {
      setFieldErrors((prev) => {
        if (err instanceof z.ZodError) {
          return {
            ...prev,
            [field]: err.errors?.[0]?.message || "Invalid value",
          };
        }
        return {
          ...prev,
          [field]: "Invalid value",
        };
      });
    }
  };

  const handleSubmit = async () => {
    const payload = { username, displayName, jwtToken, bio, upiId };

    try {
      const data = await onBoardingAction({ params: payload });
      if (data.success) {
        toast.success("On-boarding successful!");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) errors[e.path[0]] = e.message;
        });
        setFieldErrors(errors);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>StreamTipz On-boarding</span>
            </CardTitle>
            <CardDescription>
              Please fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  const val = e.target.value;
                  setUsername(val);
                  validateField("username", val);
                }}
                placeholder="Enter a username"
              />
              {fieldErrors.username && (
                <p className="text-xs text-red-500">{fieldErrors.username}</p>
              )}
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => {
                  const val = e.target.value;
                  setDisplayName(val);
                  validateField("displayName", val);
                }}
                placeholder="Enter a display name"
              />
              {fieldErrors.displayName && (
                <p className="text-xs text-red-500">
                  {fieldErrors.displayName}
                </p>
              )}
            </div>

            {/* JWT Token */}
            <div className="space-y-2">
              <Label htmlFor="jwt">JWT Token</Label>
              <Input
                id="jwt"
                value={jwtToken}
                onChange={(e) => {
                  const val = e.target.value;
                  setJwtToken(val);
                  validateField("jwtToken", val);
                }}
                placeholder="Enter your JWT token"
              />
              {fieldErrors.jwtToken && (
                <p className="text-xs text-red-500">{fieldErrors.jwtToken}</p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => {
                  const val = e.target.value;
                  setBio(val);
                  validateField("bio", val);
                }}
                placeholder="Tell us a bit about yourself"
              />
              {fieldErrors.bio && (
                <p className="text-xs text-red-500">{fieldErrors.bio}</p>
              )}
            </div>

            {/* UPI ID */}
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  id="upiId"
                  value={upiId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setUpiId(val);
                    validateField("upiId", val);
                  }}
                  placeholder="example@upi"
                  className="pl-10"
                />
              </div>
              {fieldErrors.upiId && (
                <p className="text-xs text-red-500">{fieldErrors.upiId}</p>
              )}
            </div>

            {/* Submit */}
            <Button className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnBoarding;
