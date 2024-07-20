import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCardProduct from '../Components/VerticalCardProducts';

const SearchProduct = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const searchParam = new URLSearchParams(location.search).get('q');
            const fetchUrl = `${SummaryApi.searchProduct.url}?q=${searchParam}`;
            console.log("Fetch URL:", fetchUrl);
            try {
                const response = await fetch(fetchUrl);
                const dataResponse = await response.json();
                console.log("dataResponse", dataResponse);
                setData(dataResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [location]);

    return (
        <div className='container mx-auto p-4'>
            {loading && (
                <p className='text-lg text-center'>Loading....</p>
            )}
            <p>Search Results: {data.length}</p>
            {!loading && data.length === 0 && (
                <p className='bg-white text-lg text-center'>No Data Found</p>
            )}
            {!loading && data.length !== 0 && (
                <VerticalCardProduct data={data} />
            )}
        </div>
    );
};

export default SearchProduct;
