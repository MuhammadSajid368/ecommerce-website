import React, { useEffect, useState } from 'react';
import image1 from '../ecommerece images/banner/img1.jpg';
import image2 from '../ecommerece images/banner/img2.jpg';
import image3 from '../ecommerece images/banner/img3.jpg';
import image4 from '../ecommerece images/banner/img4.jpg';
import image5 from '../ecommerece images/banner/img5.webp';
import image1Mobile from '../ecommerece images/banner/img1_mobile.jpg';
import image2Mobile from '../ecommerece images/banner/img2_mobile.jpg';
import image3Mobile from '../ecommerece images/banner/img3_mobile.jpg';
import image4Mobile from '../ecommerece images/banner/img4_mobile.jpg';
import image5Mobile from '../ecommerece images/banner/img5_mobile.png';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    setCurrentImage(prev => (prev < desktopImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev > 0 ? prev - 1 : desktopImages.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container mx-auto px-4 rounded mt-1'>
      <div className='h-55 md:h-72 w-full bg-slate-200 relative'>
        <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
          {currentImage > 0 && (
            <button className='bg-white shadow-md rounded-full p-1' onClick={prevImage}>
              <FaAngleLeft />
            </button>
          )}
          <div className='flex-grow'></div>
          {currentImage < desktopImages.length - 1 && (
            <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}>
              <FaAngleRight />
            </button>
          )}
        </div>
        {/* Desktop and Tablet Version */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
          <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {desktopImages.map((imageURI, index) => (
              <div className='w-full h-full flex-shrink-0' key={index}>
                <img src={imageURI} alt="Banner" className='w-full h-full object-cover object-center' />
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Version */}
        <div className='flex md:hidden h-full w-full overflow-hidden'>
          <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {mobileImages.map((imageURI, index) => (
              <div className='w-full h-full flex-shrink-0' key={index}>
                <img src={imageURI} alt="Banner" className='w-full h-full object-cover object-center' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
