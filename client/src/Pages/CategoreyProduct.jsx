import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategorey';
import VerticalCardProduct from '../Components/VerticalCardProducts';
import SummaryApi from '../common';

const CategoreyProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const urlCategorey = new URLSearchParams(location.search);
  const urlCategoreyListinArray = urlCategorey.getAll('categorey');
  const urlCategoreyListObject = {};
  urlCategoreyListinArray.forEach((el) => {
    urlCategoreyListObject[el] = true;
  });
  const [selectCategory, setSelectCategoy] = useState(urlCategoreyListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          categorey: filterCategoryList,
        }),
      });

      const dataResponse = await response.json();
      console.log('Fetched Data:', dataResponse); // Debugging log
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);
    const urlFormat = arrayOfCategory
      .map((el, index) => {
        if (arrayOfCategory.length - 1 === index) {
          return `categorey=${el}`;
        }
        return `categorey=${el}&&`;
      })
      .join('');
    navigate(`/product-categorey?${urlFormat}`);
  }, [selectCategory]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategoy((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOnChangeSortby = (e) => {
    const { value } = e.target;
    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    } else if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <button
        className='lg:hidden bg-gray-200 p-2 rounded mb-4'
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`lg:grid grid-cols-[200px,1fr] gap-4 ${sidebarOpen ? 'grid' : 'hidden lg:grid'}`}>
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll w-full lg:w-52'>
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-3 border-slate-300'>Sort by</h3>
            <form action='' className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-start gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  id='radioAsc'
                  value={'asc'}
                  onChange={handleOnChangeSortby}
                />
                <label htmlFor='radioAsc'>Price - Low to High</label>
              </div>
              <div className='flex items-start gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  id='radioDsc'
                  value={'dsc'}
                  onChange={handleOnChangeSortby}
                />
                <label htmlFor='radioDsc'>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-3 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='checkbox'
                    name='category'
                    id={categoryName.value}
                    value={categoryName?.value}
                    checked={selectCategory[categoryName?.value]}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div className='px-4'>
          <p className='font-medium text-slate-800 text-sm md:text-lg my-2'>Search Results: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <VerticalCardProduct loading={loading} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoreyProduct;
