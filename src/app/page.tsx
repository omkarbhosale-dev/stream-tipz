import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Zap,
  Bell,
  Youtube,
  DollarSign,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import YoutubeEmbed from "@/components/Youtube";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Star className="w-3 h-3 mr-1" />
            Trusted by many streamers
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent leading-tight">
            Turn Your Stream Into a
            <br />
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text">
              Tip Powerhouse
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Engage your audience with beautiful tip alerts, real-time
            notifications, and seamless payment processing. Boost your streaming
            revenue with our easy-to-use platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              asChild
            >
              <Link href="/auth">
                Start Earning Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:bg-purple-50"
              asChild
            >
              <Link href="/tip/demo">
                <Youtube className="mr-2 w-5 h-5" />
                See Demo
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-3xl opacity-20"></div>
            <YoutubeEmbed videoId="LpjrZGfwooE?si=LA67wFmf2lP8baI2" />
          </div>

          {/* <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-3xl opacity-20"></div>
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="StreamTip Dashboard Preview"
              width={800}
              height={600}
              className="relative rounded-2xl shadow-2xl border border-gray-200"
            />
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need to Monetize Your Stream
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help streamers maximize their
              earnings and engage their audience
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
                        Seamless integration with YouTube Live for automatic
                        alert display
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
                        Seamless integration with YouTube Live for automatic
                        alert display
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Earning More?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of streamers who have increased their revenue with
            StreamTipz
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6"
            asChild
          >
            <Link href="/auth">
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StreamTipz</span>
              </div>
              <p className="text-gray-400">
                Empowering streamers to monetize their content and engage their
                audience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StreamTipz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
