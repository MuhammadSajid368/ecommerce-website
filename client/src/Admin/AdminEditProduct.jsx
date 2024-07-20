import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import productCategorey from '../helpers/productCategorey';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import DisplayImage from '../Components/DisplayImage';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
  onClose,
  productData,
  fetchData
}) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    categorey: productData?.categorey,
    stock: productData.stock,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Define the uploadImage function
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', { // Replace with your Cloudinary URL
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData()
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className='fixed bg-slate-200 bg-opacity-35 h-full w-full top-8 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Update Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoIosClose />
          </div>
        </div>
        <form onSubmit={handleSubmit} className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id='productName'
            placeholder='Enter Product Name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor="brandName" className='mt-3'>Brand Name</label>
          <input
            type="text"
            id='brandName'
            placeholder='Enter brand Name'
            name='brandName'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor="stock" className='mt-3'>Stock</label>
          <input
            type="number"
            id='stock'
            placeholder='Enter Product Stock'
            name='stock'
            value={data.stock}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor="category" className='mt-3'>Category</label>
          <select
            name="categorey"
            value={data.categorey}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'>
            <option value="">Select Category</option>
            {productCategorey.map((el, index) => (
              <option key={index} value={el.label}>{el.label}</option>
            ))}
          </select>

          <label htmlFor="productImage" className='mt-3'>Product Image</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage.length > 0 ? (
              <div className='flex items-center gap-2'>
                {data.productImage.map((el, index) => (
                  <div key={index} className='relative group'>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className='bg-slate-100 border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-500 text-xs'>Please Upload Product Image</p>
            )}
          </div>

          <label htmlFor="price" className='mt-3'>Price</label>
          <input
            type="number"
            id='price'
            placeholder='Enter product price'
            name='price'
            value={data.price}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor="Sellingprice" className='mt-3'>Selling Price</label>
          <input
            type="number"
            id='SellingPrice'
            placeholder='Enter selling price'
            name='sellingPrice'
            value={data.sellingPrice}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor="description" className='mt-3'>Description</label>
          <textarea
            name="description"
            id="description"
            className='h-28 bg-slate-100 border resize-none p-1'
            rows={3}
            value={data.description}
            onChange={handleOnChange}
            required
            placeholder='Enter product description'
          ></textarea>

          <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 rounded'>Update Product</button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default AdminEditProduct;
