import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="bg-yellow-500 dark:bg-gray-900 text-black dark:text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        {/* Left - Logo */}
        <div className="flex flex-col space-y-4">
          <img 
            src={logoLight}     //light mode ke liye
            alt="Faith & Fast"
            className="h-16 w-auto object-contain dark:hidden"
          />
          <img 
            src={logoLight}  //dark mode ke liye
            alt="Faith & Fast"
            className="h-16 w-auto object-contain hidden dark:block"
          />
        </div>

        {/* Sections */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
          {/* Product */}
          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Features</a></li>
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Blog</a></li>
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">User guides</a></li>
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Webinars</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold">Community</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Developers</a></li>
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Users</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">About</a></li>
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Join us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Help center</a></li>
              <li><a href="#" className="hover:text-red-700 dark:hover:text-red-400">Chat support</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2024 Faith & Fast, Inc. • <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Privacy</a> • <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Terms</a> • <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Sitemap</a></p>

        {/* Social Icons */}
        <div className="flex space-x-4 text-gray-700 dark:text-gray-300 mt-4 md:mt-0">
          <FaTwitter className="w-5 h-5 cursor-pointer hover:text-red-700 dark:hover:text-red-400 transition-colors" />
          <FaFacebook className="w-5 h-5 cursor-pointer hover:text-red-700 dark:hover:text-red-400 transition-colors" />
          <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-red-700 dark:hover:text-red-400 transition-colors" />
          <FaYoutube className="w-5 h-5 cursor-pointer hover:text-red-700 dark:hover:text-red-400 transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;