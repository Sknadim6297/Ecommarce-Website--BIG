import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux'

const AdminPanel = () => {
    const user = useSelector((state) => state.user.user)
    
    return (
        <div className='min-h-[calc(100vh-60px)] flex flex-col md:flex-row'>
            <aside className='bg-zinc-600 w-full md:w-60 customShadow'>
                <div className='h-33 flex justify-center items-center flex-col p-4'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mt-5'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaUserCircle/>
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold text-white'>{user?.name}</p>
                    <p className='text-sm text-gray-300'>{user?.role}</p>
                </div>    
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-2 hover:bg-slate-100 text-white hover:text-black rounded-lg'>All Users</Link>
                        <hr className='border-gray-400 my-2'/>  
                        <Link to={"all-products"} className='px-2 py-2 hover:bg-slate-100 text-white hover:text-black rounded-lg'>All Products</Link>
                    </nav>
                </div>  
            </aside>
            

            <main className='w-full h-full p-4'>
                <Outlet />
            
            </main>
            
        </div>
    )
}

export default AdminPanel