import { useCallback, useEffect, useState } from "react";
import b1 from "../../assets/banner/1.png";
import b2 from "../../assets/banner/2.png";
import b3 from "../../assets/banner/3.png";
import b4 from "../../assets/banner/4.png";
import b5 from "../../assets/banner/5.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [b1, b2, b3, b4, b5];
  const mobileImages = [b1, b2, b3, b4, b5];

  const nextImage = useCallback(() => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  });

  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage, nextImage, desktopImages.length]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-72 md:h-96 w-full bg-slate-200 relative">
        {/* Navigation buttons - now visible on both mobile and desktop */}
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className="flex justify-between w-full text-2xl px-2">
            <button
              onClick={prevImage}
              className="bg-white dark:bg-black  text-black dark:text-white shadow-md rounded-full p-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white dark:bg-black  text-black dark:text-white shadow-md rounded-full p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageUrl) => (
            <div
              className="w-full h-full rounded-lg min-w-full min-h-full transition-all"
              key={imageUrl}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                className="w-full h-full object-fit rounded-lg"
                alt="banner"
              />
            </div>
          ))}
        </div>

        {/* Mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageUrl) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all rounded-lg"
              key={imageUrl}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                className="w-full h-full object-fit rounded-lg"
                alt="banner"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
