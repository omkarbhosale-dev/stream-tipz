"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for streamers
const mockStreamers = [
  {
    id: 1,
    name: "GamerPro123",
    avatar: "/placeholder-user.jpg",
    category: "Gaming",
    followers: "12.5K",
    isVerified: true,
    weeklyScore: 2450,
  },
  {
    id: 2,
    name: "StreamQueen",
    avatar: "/placeholder-user.jpg",
    category: "Just Chatting",
    followers: "8.9K",
    isVerified: true,
    weeklyScore: 2380,
  },
  {
    id: 3,
    name: "TechMaster",
    avatar: "/placeholder-user.jpg",
    category: "Technology",
    followers: "15.2K",
    isVerified: true,
    weeklyScore: 2210,
  },
  {
    id: 4,
    name: "MusicVibes",
    avatar: "/placeholder-user.jpg",
    category: "Music",
    followers: "6.7K",
    isVerified: false,
    weeklyScore: 1890,
  },
  {
    id: 5,
    name: "ArtisticSoul",
    avatar: "/placeholder-user.jpg",
    category: "Art",
    followers: "4.3K",
    isVerified: true,
    weeklyScore: 1750,
  },
  {
    id: 6,
    name: "FitnessGuru",
    avatar: "/placeholder-user.jpg",
    category: "Fitness",
    followers: "9.1K",
    isVerified: false,
    weeklyScore: 1620,
  },
  {
    id: 7,
    name: "CookingChef",
    avatar: "/placeholder-user.jpg",
    category: "Cooking",
    followers: "7.8K",
    isVerified: true,
    weeklyScore: 1580,
  },
  {
    id: 8,
    name: "ComedyKing",
    avatar: "/placeholder-user.jpg",
    category: "Comedy",
    followers: "11.2K",
    isVerified: false,
    weeklyScore: 1450,
  },
  {
    id: 9,
    name: "StudyBuddy",
    avatar: "/placeholder-user.jpg",
    category: "Education",
    followers: "3.9K",
    isVerified: true,
    weeklyScore: 1320,
  },
  {
    id: 10,
    name: "TravelExplorer",
    avatar: "/placeholder-user.jpg",
    category: "Travel",
    followers: "5.6K",
    isVerified: false,
    weeklyScore: 1180,
  },
];

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("this-week");

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return null;
    }
  };

  const getMedalBg = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      default:
        return "bg-gradient-to-r from-purple-500 to-blue-500";
    }
  };

  const getPositionDisplay = (position: number) => {
    if (position <= 3) {
      return getMedalIcon(position);
    }
    return `#${position}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-6">
            <Crown className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
            Streamer Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the top-performing streamers on StreamTipz and see
            who&apos;s leading the community this week!
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Rankings</h2>
            <Badge className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live Updates
            </Badge>
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Second Place */}
          <div className="md:order-1 order-2">
            <Card className="border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20 border-4 border-gray-300">
                    <AvatarImage
                      src={mockStreamers[1].avatar || "/placeholder.svg"}
                      alt={mockStreamers[1].name}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-gray-200 to-gray-300">
                      {mockStreamers[1].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                    <Medal className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {mockStreamers[1].name}
                </CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <span>{mockStreamers[1].category}</span>
                  {mockStreamers[1].isVerified && (
                    <Star className="w-4 h-4 text-blue-500" />
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-500 mb-2">2nd</div>
                <div className="flex items-center justify-center space-x-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{mockStreamers[1].followers}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* First Place */}
          <div className="md:order-2 order-1">
            <Card className="border-2 border-yellow-400 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  👑 CHAMPION
                </div>
              </div>
              <CardHeader className="text-center pb-4 pt-8">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24 border-4 border-yellow-400">
                    <AvatarImage
                      src={mockStreamers[0].avatar || "/placeholder.svg"}
                      alt={mockStreamers[0].name}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-yellow-200 to-yellow-300">
                      {mockStreamers[0].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">
                  {mockStreamers[0].name}
                </CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <span>{mockStreamers[0].category}</span>
                  {mockStreamers[0].isVerified && (
                    <Star className="w-4 h-4 text-blue-500" />
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  1st
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{mockStreamers[0].followers}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Place */}
          <div className="md:order-3 order-3">
            <Card className="border-2 border-amber-400 hover:border-amber-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20 border-4 border-amber-400">
                    <AvatarImage
                      src={mockStreamers[2].avatar || "/placeholder.svg"}
                      alt={mockStreamers[2].name}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-amber-200 to-amber-300">
                      {mockStreamers[2].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {mockStreamers[2].name}
                </CardTitle>
                <CardDescription className="flex items-center justify-center space-x-2">
                  <span>{mockStreamers[2].category}</span>
                  {mockStreamers[2].isVerified && (
                    <Star className="w-4 h-4 text-blue-500" />
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  3rd
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{mockStreamers[2].followers}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Leaderboard */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Rankings</CardTitle>
            <CardDescription>
              All streamers ranked by their weekly performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStreamers.map((streamer, index) => {
                const position = index + 1;
                return (
                  <div
                    key={streamer.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                      position <= 3
                        ? "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:border-purple-300"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Position */}
                    <div className="flex items-center justify-center w-16 h-16">
                      {position <= 3 ? (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${getMedalBg(
                            position
                          )}`}
                        >
                          {getMedalIcon(position)}
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-gray-600">
                          #{position}
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={streamer.avatar || "/placeholder.svg"}
                        alt={streamer.name}
                      />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {streamer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Streamer Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">
                          {streamer.name}
                        </h3>
                        {streamer.isVerified && (
                          <Star className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-gray-600">{streamer.category}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{streamer.followers}</span>
                      </div>
                    </div>

                    {/* Tip Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-purple-50 hover:border-purple-300"
                      asChild
                    >
                      <Link href={`/tip/${streamer.name.toLowerCase()}`}>
                        Support
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">
                Want to Join the Leaderboard?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Start your streaming journey with StreamTipz and compete with
                the best!
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/auth">Start Streaming Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
