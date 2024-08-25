import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/DisplayCurrency';
import summaryApi from '../common';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${data.productName}?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${summaryApi.deleteProduct.url}/${data._id}`, {
                method: summaryApi.deleteProduct.method,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json(); // Convert response to JSON
            console.log(result);

            if (response.ok && result.success) {
                alert('Product deleted successfully');
                fetchdata(); // Refresh the product list
            } else {
                alert(`Failed to delete product: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('An error occurred while deleting the product. Please try again later.');
        }
    };

    return (
        <div className='bg-white p-4 rounded border'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt={data.productName} />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {displayINRCurrency(data.sellingPrice)}
                    </p>
                    <div className='flex flex-row mx-auto justify-between'>
                        <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                            <MdModeEditOutline />
                        </div>
                        <div className='mx-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer'>
                            <MdDelete onClick={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )}
        </div>
    );
};

export default AdminProductCard;
