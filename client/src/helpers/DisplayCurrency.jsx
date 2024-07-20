import React from 'react';

const DisplayCurrency = (num, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2
  });
  return formatter.format(num);
}

export default DisplayCurrency;
