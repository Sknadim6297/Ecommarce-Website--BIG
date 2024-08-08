import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux'

const AdminPanel = () => {

    const user = useSelector((state) => state.user.user)
    
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-zinc-600 min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-33 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mt-5'>
                        {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaUserCircle/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>    
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <hr />  
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        <hr />
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel
