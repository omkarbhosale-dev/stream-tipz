import { ArrowRight, Award, Crown, Medal, Trophy } from "lucide-react";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

const Leaboard = () => {
  const topStreamers = [
    {
      id: 1,
      name: "GamerPro123",
      avatar: "/placeholder-user.jpg",
      category: "Gaming",
      followers: "12.5K",
    },
    {
      id: 2,
      name: "StreamQueen",
      avatar: "/placeholder-user.jpg",
      category: "Just Chatting",
      followers: "8.9K",
    },
    {
      id: 3,
      name: "TechMaster",
      avatar: "/placeholder-user.jpg",
      category: "Technology",
      followers: "15.2K",
    },
  ];
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-6">
            <Crown className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Top Streamers This Week
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check out our leading content creators and join the competition!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {/* Second Place */}
          <div className="md:order-1 order-2">
            <Card className="border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20 border-4 border-gray-300">
                    <AvatarImage
                      src={topStreamers[1].avatar || "/placeholder.svg"}
                      alt={topStreamers[1].name}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-gray-200 to-gray-300">
                      {topStreamers[1].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                    <Medal className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {topStreamers[1].name}
                </CardTitle>
                <CardDescription>{topStreamers[1].category}</CardDescription>
              </CardHeader>
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
                      src={topStreamers[0].avatar || "/placeholder.svg"}
                      alt={topStreamers[0].name}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-yellow-200 to-yellow-300">
                      {topStreamers[0].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">
                  {topStreamers[0].name}
                </CardTitle>
                <CardDescription>{topStreamers[0].category}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Third Place */}
          <div className="md:order-3 order-3">
            <Card className="border-2 border-amber-400 hover:border-amber-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20 border-4 border-amber-400">
                    <AvatarImage
                      src={topStreamers[2].avatar || "/placeholder.svg"}
                      alt={topStreamers[2].name}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-amber-200 to-amber-300">
                      {topStreamers[2].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {topStreamers[2].name}
                </CardTitle>
                <CardDescription>{topStreamers[2].category}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
            asChild
          >
            <Link href="/leaderboard">
              View Full Leaderboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Leaboard;
