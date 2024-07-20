import React, { useEffect, useState } from 'react';
import UploadProduct from '../Admin/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../Admin/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await fetch(SummaryApi.allProducts.url);
    const dataResponse = await response.json();
    setAllProducts(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border py-2 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All Products */}
      <div
        className='flex justify-center items-start flex-wrap gap-4 mt-4 p-4'
        style={{ maxHeight: '500px', overflowY: 'scroll' }}
      >
        {allProducts.map((product, index) => (
          <AdminProductCard data={product} key={index + "AllProducts"} fetchData={fetchAllProducts} />
        ))}
      </div>

      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProducts} />
      )}
    </div>
  );
};

export default AllProducts;
