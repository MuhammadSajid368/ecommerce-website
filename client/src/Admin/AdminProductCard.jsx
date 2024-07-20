import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';
import DisplayCurrency from '../helpers/DisplayCurrency';

const AdminProductCard = ({ data, fetchData }) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-52">
            <div className="flex justify-center mb-2">
                <img 
                    src={data.productImage[0]} 
                    alt={data.productName} 
                    className="w-full h-24 object-contain rounded-md" 
                />
            </div>
            <h1 className="text-center text-lg font-semibold mb-1 truncate">{data.productName}</h1>
            <div className="text-center mb-1">
                <p className="text-md font-semibold text-green-600">
                    {DisplayCurrency(data.sellingPrice)}
                </p>
            </div>
            <div className="text-center mb-1">
                <p className="text-xs text-gray-500">Category: <span className="text-gray-700">{data.category}</span></p>
                <p className="text-xs text-gray-500">Brand: <span className="text-gray-700">{data.brandName}</span></p>
            </div>
            <div className="text-center mb-1">
                <p className="text-xs text-gray-500">Stock: <span className="text-gray-700">{data.stock}</span></p>
            </div>
            <div className="flex justify-end">
                <button 
                    className="p-1 bg-green-200 hover:bg-green-500 rounded-full hover:text-white transition duration-300" 
                    onClick={() => setEditProduct(true)}
                >
                    <MdModeEditOutline size={20} />
                </button>
            </div>
            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchData={fetchData} 
                />
            )}
        </div>
    );
};

export default AdminProductCard;
