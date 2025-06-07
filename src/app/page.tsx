import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import YoutubeEmbed from "@/components/Youtube";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leaboard from "@/components/Leaboard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Star className="w-3 h-3 mr-1" />
            Trusted by many streamers
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent leading-tight">
            The Safest Way to Send
            <br />
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text">
              Donation Alerts
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
              <Link href="/signup">
                Start Earning Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-3xl opacity-20"></div>
            <YoutubeEmbed videoId="LpjrZGfwooE?si=LA67wFmf2lP8baI2" />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <Features />
      {/* Leadboard Section */}
      <Leaboard />
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
            <Link href="/signup">
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
