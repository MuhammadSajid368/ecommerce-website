import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoreyWiseProduct from '../helpers/fetchCategoreyWiseProduct';
import DisplayCurrency from '../helpers/DisplayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import Context from '../context';

const VerticalCardProduct = ({ categorey, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef(null);
  const { fetchAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id, stock) => {
    e.preventDefault();
    if (stock === 0) {
      setToast('Product is out of stock');
      return;
    }

    await AddToCart(e, id);
    await fetchAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoreyWiseProduct(categorey);
      setData(categoryProduct?.data || []);
    } catch (error) {
      console.error('Error fetching category products:', error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [categorey]);

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft += 300;
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className='container mx-auto px-5 my-6 mb-11'>
      <h2 className='md:text-2xl font-bold mb-4'>{heading}</h2>
      <div className='relative'>
        {loading ? (
          <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement}>
            {loadingList.map((_, index) => (
              <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'></div>
                <div className='flex-grow p-2'>
                  <div className='bg-slate-200 h-full'></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none' ref={scrollElement}>
            {data.map((product, index) => {
              let stockStatus = '';
              let stockMessage = '';

              if (product.stock === 0) {
                stockStatus = 'text-red-600 font-bold';
                stockMessage = 'Out of stock';
              } else if (product.stock > 15) {
                stockStatus = 'text-green-600 font-bold';
                stockMessage = 'In stock';
              } else if (product.stock <= 15 && product.stock > 0) {
                stockStatus = 'text-yellow-600 font-bold';
                stockMessage = `Only ${product.stock} left`;
              }

              return (
                <Link to={`product/${product._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow flex flex-col'>
                  <div className='bg-slate-200 h-48 p-4 flex items-center justify-center'>
                    <img src={product.productImage[0]} alt="" className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' />
                  </div>
                  <div className='flex flex-col justify-between p-4 flex-grow gap-3'>
                    <div>
                      <h3 className='text-base md:text-lg font-semibold text-ellipsis line-clamp-1'>{product.productName}</h3>
                      <p className='text-slate-500'>{product.categorey}</p>
                      <p className={`text-xs ${stockStatus}`}>{stockMessage}</p>
                    </div>
                    <div className='mt-2'>
                      <div className='flex gap-2 items-center'>
                        <p className='text-red-600 font-medium'>{DisplayCurrency(product.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{DisplayCurrency(product.price)}</p>
                      </div>
                      <div className='flex justify-center'>
                        <button
                          className={`mt-2 bg-red-600 hover:bg-red-700 text-white px-8 py-1 rounded-full text-sm ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={(e) => handleAddToCart(e, product?._id, product.stock)}
                          disabled={product.stock === 0}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <button
          className='bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:bg-gray-200'
          onClick={scrollLeft}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <FaAngleLeft className='transform transition-transform duration-300 hover:-translate-x-1' />
        </button>
        <button
          className='bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:flex items-center justify-center z-10 transition-all duration-300 hover:bg-gray-200'
          onClick={scrollRight}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <FaAngleRight className='transform transition-transform duration-300 hover:translate-x-1' />
        </button>
      </div>
      {toast && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded'>
          {toast}
        </div>
      )}
    </div>
  );
};

export default VerticalCardProduct;
