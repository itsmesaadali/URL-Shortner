import { Facebook, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-[var(--text-inverse)] mt-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4">
        {/* Footer Text */}
        <span className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</span>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-blue-400 transition" aria-label="Github">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
