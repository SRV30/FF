import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logoLight.png";

const Footer = () => {
  return (
    <footer className="bg-yellow-500 dark:bg-gray-900 text-black dark:text-white p-8">
      {/* Animated Fade-in Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <img
            src={logoLight}
            alt="Faith & Fast Logo"
            className="h-32 w-32 object-contain dark:hidden"
          />
          <img
            src={logoDark}
            alt="Faith & Fast Logo"
            className="h-32 w-32 object-contain hidden dark:block"
          />
        </motion.div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
          {[
            { title: "Product", links: ["Features", "Pricing"], hrefs: ["/products", "/products"] },
            { title: "Company", links: ["About", "Contact Us"], hrefs: ["#", "/contactus"] },
            { title: "Support", links: ["Help Center", "Chat Support"], hrefs: ["#", "#"] },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="mt-2 space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={section.hrefs[i]}
                      className="hover:text-red-700 dark:hover:text-red-400 transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

      {/* Copyright & Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left"
      >
        <p>
          © 2024 Faith & Fast, Inc. •{" "}
          <a className="hover:text-red-700 dark:hover:text-red-400 cursor-pointer">Privacy</a>{" "}
          • <a className="hover:text-red-700 dark:hover:text-red-400 cursor-pointer">Terms</a>{" "}
          •{" "}
          <a className="hover:text-red-700 dark:hover:text-red-400 cursor-pointer">Sitemap</a>
        </p>

        {/* Social Media Icons */}
        <motion.div className="flex space-x-4 text-gray-700 dark:text-gray-300 mt-4 md:mt-0">
          {[FaTwitter, FaFacebook, FaLinkedin, FaYoutube].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Icon className="w-5 h-5 hover:text-red-700 dark:hover:text-red-400 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
