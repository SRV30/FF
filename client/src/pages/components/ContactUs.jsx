const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-10">
          Have questions or need assistance? We’re here to help! Reach out to us through any of the channels below.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
            <p className="text-lg mb-4"><strong>Email:</strong> support@yourstore.com</p>
            <p className="text-lg mb-4"><strong>Phone:</strong> +1 (234) 567-890</p>
            <p className="text-lg mb-4"><strong>Address:</strong> 123 Fashion Street, Trend City, TX 75001</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600" />
              <textarea placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600"></textarea>
              <button type="submit" className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition">
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
