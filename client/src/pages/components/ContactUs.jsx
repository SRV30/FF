import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-10">
          Have questions or need assistance? We’re here to help! Reach out to us through any of the channels below.
        </p>

        {/* Contact Box (Details + Map) & Form */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Details & Map in one box */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
            {/* Contact Details */}
            <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
            <div className="space-y-4">
              <p className="flex items-center text-lg">
                <Mail className="w-6 h-6 text-gray-600 dark:text-gray-300 mr-3" />
                <span>support@yourstore.com</span>
              </p>
              <p className="flex items-center text-lg">
                <Phone className="w-6 h-6 text-gray-600 dark:text-gray-300 mr-3" />
                <span>+1 (234) 567-890</span>
              </p>
              <p className="flex items-center text-lg">
                <MapPin className="w-6 h-6 text-gray-600 dark:text-gray-300 mr-3" />
                <span>123 Fashion Street, Trend City, TX 75001</span>
              </p>
            </div>

            {/* Google Map */}
            <div className="mt-6 rounded-lg overflow-hidden shadow-md">
              <iframe
                className="w-full h-60 md:h-80"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093706!2d144.9537363153188!3d-37.817209979751575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df0f6ed6f%3A0x5045675218ce6e0!2s123%20Fashion%20Street%2C%20Trend%20City%2C%20TX%2075001!5e0!3m2!1sen!2sus!4v1706835224606!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              ></textarea>
              <button type="submit" className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
