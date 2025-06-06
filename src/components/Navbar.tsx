import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import navbar from "@/data/navbar";

const Navbar = () => {
  return (
    <div>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              StreamTipz
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navbar.map((item, val) => (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-purple-600 transition-colors"
                key={val}
              >
                {item.name}
              </Link>
            ))}

            {/* <Link
              href="#pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              About
            </Link> */}
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              asChild
            >
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
