import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-500 dark:bg-gray-900 text-black dark:text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        {/* Left - Logo */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 w-6 h-6 rounded-full"></div>
            <h1 className="text-xl font-bold">Logo</h1>
          </div>
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
        <p>© 2022 Brand, Inc. • <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Privacy</a> • <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Terms</a> • <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Sitemap</a></p>

        {/* Social Icons */}
        <div className="flex space-x-4 text-gray-700 dark:text-gray-300 mt-4 md:mt-0">
          <FaTwitter className="cursor-pointer hover:text-red-700 dark:hover:text-red-400" />
          <FaFacebook className="cursor-pointer hover:text-red-700 dark:hover:text-red-400" />
          <FaLinkedin className="cursor-pointer hover:text-red-700 dark:hover:text-red-400" />
          <FaYoutube className="cursor-pointer hover:text-red-700 dark:hover:text-red-400" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
