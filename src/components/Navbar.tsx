import { Zap } from "lucide-react";
import GoogleBtn from "./GoogleBtn";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                StreamTipz
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <GoogleBtn />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
