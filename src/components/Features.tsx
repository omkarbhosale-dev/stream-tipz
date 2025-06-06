import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Zap, Bell, Youtube, DollarSign, Users } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Everything You Need to Monetize Your Stream
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help streamers maximize their earnings
            and engage their audience
          </p>
        </div>

        {/* Continuous Scrolling Cards - Single Row for Desktop, Two Rows for Mobile */}
        <div className="relative">
          <div className="carousel-container overflow-hidden">
            <div className="carousel-track flex animate-carousel">
              {/* First set of cards */}
              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Real-time Alerts</CardTitle>
                    <CardDescription>
                      Beautiful, customizable tip alerts that appear instantly
                      on your stream
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Secure Payments</CardTitle>
                    <CardDescription>
                      Multiple payment methods with instant processing and low
                      fees
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>YouTube Integration</CardTitle>
                    <CardDescription>
                      Seamless integration with YouTube Live for automatic alert
                      display
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Audience Engagement</CardTitle>
                    <CardDescription>
                      Interactive features to keep your viewers engaged and
                      coming back
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Easy Setup</CardTitle>
                    <CardDescription>
                      Get started in minutes with our simple setup process and
                      tutorials
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Custom Branding</CardTitle>
                    <CardDescription>
                      Personalize alerts and pages to match your unique
                      streaming brand
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Duplicate cards for seamless looping */}
              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Real-time Alerts</CardTitle>
                    <CardDescription>
                      Beautiful, customizable tip alerts that appear instantly
                      on your stream
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Secure Payments</CardTitle>
                    <CardDescription>
                      Multiple payment methods with instant processing and low
                      fees
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>YouTube Integration</CardTitle>
                    <CardDescription>
                      Seamless integration with YouTube Live for automatic alert
                      display
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="carousel-card min-w-[300px] md:min-w-[350px] p-3">
                <Card className="h-full border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Audience Engagement</CardTitle>
                    <CardDescription>
                      Interactive features to keep your viewers engaged and
                      coming back
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
