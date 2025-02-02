const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-10">
          Welcome to <span className="font-semibold">Faith & Fast</span>, your one-stop destination for stylish, high-quality fashion. We are committed to providing the latest trends, superior craftsmanship, and an exceptional shopping experience.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img src="https://blog.ipleaders.in/wp-content/uploads/2016/08/ecommerce.jpg" alt="About Us" className="rounded-lg shadow-lg w-full" />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              At <span className="font-semibold">Faith & Fast</span>, we believe fashion is an expression of individuality. Our mission is to empower you with trend-setting styles, premium fabrics, and timeless elegance, all at affordable prices.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Curated collections with the latest trends</li>
              <li>High-quality, ethically sourced materials</li>
              <li>Affordable pricing without compromising style</li>
              <li>Fast and reliable shipping</li>
              <li>Dedicated customer support</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Fashion Community</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Stay ahead of the trends with our latest collections, exclusive discounts, and fashion tips. Follow us on social media and become a part of our stylish journey.
          </p>
          <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition">Explore Our Collection</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
