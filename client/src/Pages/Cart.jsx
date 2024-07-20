import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import { AiFillDelete } from "react-icons/ai";
import Context from '../context';
import { toast } from 'react-toastify';
import DisplayCurrency from '../helpers/DisplayCurrency';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const cartLoading = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log('API Response:', responseData); // Log the API response
      setLoading(false);

      if (responseData.success) {
        // Update quantity to 0 for products with stock 0
        const updatedData = responseData.data.map((item) => ({
          ...item,
          quantity: item.productId.stock === 0 ? 0 : item.quantity,
        }));
        setData(updatedData);
      } else {
        setData([]);
        console.log('No data:', responseData); // Log no data case
      }
    } catch (error) {
      setLoading(false);
      setData([]);
      console.error('Error fetching data:', error);
    }
  };

  const deleteCartProduct = async (id) => {
    const originalData = [...data];
    const updatedData = data.filter((item) => item._id !== id);
    setData(updatedData);

    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ _id: id })
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchAddToCart();
        toast.success(responseData.message);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setData(originalData);
      toast.error('Error deleting product: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Cart data:', data); // Log cart data
  }, [data]);

  const increaseQty = async (id, qty) => {
    const updatedData = data.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(updatedData);
  
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ _id: id, quantity: qty + 1 })
      });
      const responseData = await response.json();
  
      if (!responseData.success) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setData(data.map(item =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
      toast.error('Error increasing quantity: ' + error.message);
    }
  };

  const decreaseQty = async (id, qty) => {
    const updatedData = data.map(item =>
      item._id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setData(updatedData);
  
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ _id: id, quantity: qty - 1 })
      });
      const responseData = await response.json();
  
      if (!responseData.success) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setData(data.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.error('Error decreasing quantity: ' + error.message);
    }
  };

  const calculateTotalPrice = () => {
    return data.reduce((acc, item) => acc + item.productId.sellingPrice * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5 text-gray-600">No items in the cart</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        <div className="w-full max-w-3xl">
          {loading ? (
            cartLoading.map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-200 h-32 my-2 border border-gray-300 animate-pulse rounded"
              ></div>
            ))
          ) : (
            data.map((product) => (
              <div
                key={product?._id}
                className="w-full bg-white 9rem my-2 border border-gray-300 rounded-lg shadow-lg flex items-center"
              >
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <img
                    src={product?.productId?.productImage[0]}
                    alt=""
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-lg lg:text-xl font-semibold line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-gray-500">{product?.productId?.categorey}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-red-600 font-medium text-lg'>{DisplayCurrency(product?.productId?.sellingPrice)}</p>
                    <p className='text-slate-500 font-semibold text-lg'>Total: {DisplayCurrency(product?.productId?.sellingPrice * product.quantity)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => decreaseQty(product._id, product?.quantity)}
                      className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 rounded-full flex items-center justify-center"
                      disabled={product.quantity <= 1 || product.productId.stock === 0}
                    >
                      -
                    </button>
                    <span className="text-lg">{product.quantity}</span>
                    <button
                      onClick={() => increaseQty(product?._id, product?.quantity)}
                      className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-8 h-8 rounded-full flex items-center justify-center"
                      disabled={product.quantity >= product.productId.stock || product.productId.stock === 0}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => deleteCartProduct(product._id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            ))
          )}
        </div>
        {/* Total products */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-gray-200 border border-gray-300 animate-pulse rounded-lg"></div>
          ) : (
            <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
              <div className='flex items-center justify-between px-4 py-1 font-medium text-lg text-slate-600'>
                <p>Total Items</p>
                <p>
                  {data.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
              </div>
              <div className='flex items-center justify-between px-4 py-1 font-medium text-lg text-slate-600'>
                <p>Total Price</p>
                <p>
                  {DisplayCurrency(calculateTotalPrice())}
                </p>
              </div>
              <button className='bg-blue-600 p-2 text-white w-full rounded-md'>Payment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
