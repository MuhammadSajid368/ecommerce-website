import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoreyWiseProduct from '../helpers/fetchCategoreyWiseProduct';
import DisplayCurrency from '../helpers/DisplayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import Context from '../context';
import scrollTop from '../helpers/ScrollTop';

const CategoreyWiseProduct = ({ categorey, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);
    const { fetchAddToCart } = useContext(Context)

    const handlAddToCart = async (e, id) => {
        await AddToCart(e, id)
        await fetchAddToCart()
    }

    const scrollElement = useRef(null);

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

    return (
        <div className='container mx-auto px-5 my-6 mb-11'>
            <h2 className='text-2xl font-bold mb-4'>{heading}</h2>
            <div className='relative'>
                {loading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
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
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {data.map((product, index) => (
                            <Link to={`/product/${product._id}`} key={index} className='w-full bg-white rounded-sm shadow flex flex-col' onClick={scrollTop}>
                                <div className='bg-slate-200 h-48 p-4 flex items-center justify-center'>
                                    <img src={product.productImage[0]} alt="" className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' />
                                </div>
                                <div className='flex flex-col justify-between p-4 flex-grow gap-3'>
                                    <div>
                                        <h3 className='text-base md:text-lg font-semibold text-ellipsis line-clamp-1'>{product.productName}</h3>
                                        <p className='text-slate-500'>{product.categorey}</p>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='flex gap-2 items-center'>
                                            <p className='text-red-600 font-medium'>{DisplayCurrency(product.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{DisplayCurrency(product.price)}</p>
                                        </div>
                                        <button className='mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full text-sm' onClick={(e) => { handlAddToCart(e, product?._id) }}>Add to Cart</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoreyWiseProduct;
