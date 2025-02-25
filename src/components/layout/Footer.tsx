import { Link } from 'react-router-dom';
import { TowerControl as GameController, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GameController className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-bold text-white">GamePortal</span>
            </Link>
            <p className="text-gray-400">
              Your ultimate destination for online gaming entertainment.
              Play the best games instantly in your browser.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/top-games" className="text-gray-400 hover:text-white transition">
                  Top Games
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-gray-400 hover:text-white transition">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/action" className="text-gray-400 hover:text-white transition">
                  Action
                </Link>
              </li>
              <li>
                <Link to="/category/adventure" className="text-gray-400 hover:text-white transition">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/category/puzzle" className="text-gray-400 hover:text-white transition">
                  Puzzle
                </Link>
              </li>
              <li>
                <Link to="/category/racing" className="text-gray-400 hover:text-white transition">
                  Racing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@gameportal.com"
                className="text-gray-400 hover:text-white transition"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-4 text-gray-400">
              Stay updated with our latest games and features.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GamePortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
