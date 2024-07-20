import React, { useContext } from 'react';
import scrollTop from '../helpers/ScrollTop';
import DisplayCurrency from '../helpers/DisplayCurrency';
import Context from '../context';
import { Link } from 'react-router-dom';

const VerticalCardProduct = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchAddToCart } = useContext(Context);

    const AddToCart = async (e, id) => {
        // Simulate adding to cart logic
        console.log(`Adding product ${id} to cart`);
        // Add your actual add to cart logic here
    };

    const handleAddToCart = async (e, id) => {
        e.preventDefault(); // Prevent the default action
        await AddToCart(e, id);
        await fetchAddToCart();
    };

    return (
        <div className='relative p-4 overflow-hidden'>
            {loading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {loadingList.map((_, index) => (
                        <div key={index} className='w-full bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4'></div>
                            <div className='p-4'>
                                <div className='bg-slate-200 h-4 mb-2'></div>
                                <div className='bg-slate-200 h-4'></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                    {data.map((product, index) => (
                        <Link
                            to={`/product/${product._id}`}
                            key={index}
                            className='bg-white rounded-sm shadow flex flex-col mx-auto w-full max-w-xs'
                            onClick={scrollTop}
                        >
                            <div className='bg-slate-200 h-20 md:h-48 p-4 flex items-center justify-center'>
                                <img
                                    src={product.productImage[0]}
                                    alt=""
                                    className=' h-[200px] md:h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'
                                />
                            </div>
                            <div className='flex flex-col justify-between p-4 flex-grow gap-3'>
                                <div>
                                    <h3 className='text-base text-sm md:text-lg font-semibold text-ellipsis line-clamp-1'>
                                        {product.productName}
                                    </h3>
                                    <p className='text-slate-500 text-[12px] md:text-lg text-center mr-1'>{product.categorey}</p>
                                </div>
                                <div className='mt-2 flex flex-col items-center sm:items-start'>
                                    <div className='md:flex gap-2 items-center'>
                                        <p className='text-red-600 text-sm md:text-lg font-medium'>
                                            {DisplayCurrency(product.sellingPrice)}
                                        </p>
                                        <p className='text-slate-500 line-through'>
                                            {DisplayCurrency(product.price)}
                                        </p>
                                    </div>
                                    <button
                                        className='mt-2 bg-red-600 hover:bg-red-700 text-white px-2 md:px-3 py-0.5 rounded-full text-[10px] md:text-sm'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerticalCardProduct;
