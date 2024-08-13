import React, { useEffect, useState } from 'react';
import UplodProduct from '../Components/UplodProduct';
import summaryApi from '../common';
import AdminProductCard from '../Components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await fetch(summaryApi.allProducts.url, {
      method: summaryApi.allProducts.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataResponse = await response.json();
    if (dataResponse.Success) {
      setAllProducts(dataResponse?.data || []);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
        {allProducts.map((product, index) => (
          <AdminProductCard key={index + 'allProduct'} data={product}  fetchData={    fetchAllProducts
} />
        ))}
      </div>

      {openUploadProduct && <UplodProduct onclose={() => setOpenUploadProduct(false)} />}
    </div>
  );
};

export default AllProducts;