import React from 'react'
import { IoIosClose } from 'react-icons/io'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed bottom-0 right-0 left-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 mb-8 overflow-y-scroll'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <IoIosClose />
                </div>
                <div className='flex justify-center max-w-[80vh] p-4 max-h-[80vh]'>
                    <img src={imgUrl} className='w-full h-full' alt="" />
                </div>
            </div>

        </div>
    )
}

export default DisplayImage