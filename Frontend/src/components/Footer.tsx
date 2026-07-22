import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/5 py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-serif text-white tracking-widest font-bold">
          INK<span className="font-light italic text-gray-400">NOIR</span>
        </div>

        <div className="flex gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        <div className="flex gap-6 text-xs uppercase tracking-widest text-gray-600">
          <Link to="#" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-gray-300 transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="text-xs text-gray-700">
          © {new Date().getFullYear()} InkNoir Studio.
        </div>
      </div>
    </footer>
  );
}
