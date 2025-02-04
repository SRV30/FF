import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSquare from "../../assets/logo-light.png";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("opacity-100");
      }, index * 200);
    });
  }, []);

  const handleExploreClick = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto py-20 px-6">
        <div className="space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 fade-in opacity-0 transition-opacity duration-1000 tracking-tight">
            About <span className="text-red-600 relative inline-block hover:scale-105 transition-transform">FAITH & FAST</span>
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto fade-in opacity-0 transition-opacity duration-1000 delay-200 leading-relaxed text-gray-700 dark:text-gray-300">
            Welcome to{" "}
            <span className="font-semibold text-red-600">FAITH & FAST</span>, your
            go-to destination for trendy and high-quality fashion for both men and
            women. We believe that fashion is more than just clothing – it's a way
            to express confidence, elegance, and individuality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center fade-in opacity-0 transition-opacity duration-1000 delay-400">
          <div className="overflow-hidden rounded-lg">
            <img
              src={logoSquare}
              alt="About Us"
              className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 object-cover"
            />
          </div>
          
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              At <span className="font-semibold text-red-600">FAITH & FAST</span>,
              we offer a carefully curated collection of stylish and comfortable
              apparel for every occasion. Whether you need casual wear, formal
              outfits, or the latest streetwear trends, we have something for
              everyone. Our commitment is to provide premium quality, modern
              designs, and ultimate comfort at the best prices.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Our brand represents faith in quality and fast fashion trends,
              ensuring you stay ahead in style. We continuously innovate and
              expand our collection to meet the evolving fashion needs of our
              customers.
            </p>
            <div className="pt-4">
              <h2 className="text-3xl font-bold mb-6">
                Why Choose <span className="text-red-600">FAITH & FAST</span>?
              </h2>
              <ul className="space-y-4">
                {[
                  "Premium Quality Fabrics – Designed for durability and comfort.",
                  "Trendy & Timeless Styles – Stay ahead with the latest fashion.",
                  "Affordable Prices – Fashion that fits your budget.",
                  "Customer Satisfaction – Your happiness is our priority."
                ].map((item, index) => (
                  <li key={index} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-red-600 mr-3 text-xl">✔</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 py-16 mt-12 fade-in opacity-0 transition-opacity duration-1000 delay-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 leading-tight">
            Join us in redefining fashion with{" "}
            <span className="text-red-600">FAITH & FAST</span>. 
            <span className="block mt-2 text-2xl font-normal text-gray-700 dark:text-gray-300">
              Be stylish. Be confident. Be you.
            </span>
          </h2>
          <button
            onClick={handleExploreClick}
            className="px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Explore Our Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;