import React from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AddToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(SummaryApi.addToCart.url, {
    method: SummaryApi.addToCart.method,
    credentials: 'include',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(
      { productId: id }
    )
  })
  const responseData = await response.json()
  console.log("data", responseData)
  if (responseData.success) {
    toast.success(responseData.message)
  }

  if (responseData.error) {
    toast.error(responseData.message)
  }
  return responseData
};

export default AddToCart;
