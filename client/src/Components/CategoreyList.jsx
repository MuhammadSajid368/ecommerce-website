import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import '../css/custom.css'
import { Link } from 'react-router-dom'

const CategoreyList = () => {
    const [categoreyProduct, setCategoreyProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categoreyLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoreyProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoreyProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='flex justify-center items-center px-4'>
            <div className='flex items-center gap-4 justify-start overflow-x-auto scrollbar-none'>
                {
                    loading ? (
                        categoreyLoading.map((el, index) => (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoreyLoading" + index}></div>
                        ))
                    ) : (
                        categoreyProduct.map((product, index) => (
                            <Link to={`product-categorey?categorey=${product?.categorey}`} className='cursor-pointer' key={product?.categorey}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product.productImage[0]} alt={product?.category} className='h-full object-scale mix-blend-multiply hover:scale-125 transition-all' />
                                </div>
                                <p className='text-center text-sm md:text-balance capitalize'>{product.categorey}</p>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default CategoreyList
