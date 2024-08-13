import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa"; 
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/DisplayCurrency';
import summaryApi from '../common'; 
import { toast } from 'react-toastify';

const AdminProductCard = ({ data,fetchData }) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token') || document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).split('=')[1];
    
            if (!token) {
                toast.error('No token found, please log in');
                return;
            }
    
            const response = await fetch(`${summaryApi.deleteProduct.url}/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 401) {
                toast.error('Unauthorized - Please log in');
                return;
            }
    
            const result = await response.json();
            if (result.Success) {
                toast.success('Product deleted successfully');
                fetchData();
                
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };
    

    return (
        <div className='bg-white p-4 rounded border'>
            <div className='w-40 flex flex-col justify-center items-center'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt={data.productName} />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <p className='font-semibold'>
                    {displayINRCurrency(data.sellingPrice)}
                </p>

                <div className='flex justify-between items-center w-full mt-2'>
                    <div
                        className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
                        onClick={() => setEditProduct(true)}
                    >
                        <MdModeEditOutline />
                    </div>
                    <div
                        className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer'
                        onClick={handleDelete}
                    >
                        <FaTrash />
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
