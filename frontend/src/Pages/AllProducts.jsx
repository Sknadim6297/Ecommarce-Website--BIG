import React, { useEffect, useState } from 'react'
import UploadProduct from '../Components/UplodProduct'
import AdminProductCard from '../Components/AdminProductCard'
import summaryApi from '../common'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(summaryApi.allProducts.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* all products */}
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4   py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {allProduct.map((product, index) => (
          <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
        ))}
      </div>

      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  )
}

export default AllProducts
