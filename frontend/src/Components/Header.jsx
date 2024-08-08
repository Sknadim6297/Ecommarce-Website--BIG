import React, { useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { setUserDetails } from '../store/UserSlice';
import { toast } from 'react-toastify';


const Header = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const [menuDisplay,setMenuDisplay] = useState(false)
  

  const handleLogout = async (e) => { 
    e.preventDefault()
      try {
        const dataResponse = await fetch(summaryApi.logout.url, {
          method: summaryApi.logout.method,
          credentials: 'include',
        });
        const dataApi = await dataResponse.json();
           dispatch(setUserDetails(null))
           toast.success('Logout Successfully')
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')

      }
    
  }
  
  return (
    <header className='h-16 shadow-md' >
        <div className=' h-full flex items-center container mx-auto px-4 justify-between'>
            <div>
            <Link to='/'>
                <h1 className='text-2xl font-bold'>Nadeem.Estore </h1>
            </Link>
            </div>
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3'>
            <input className='outline-none w-full ' type="text" placeholder='Search Product here' />
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch />
            </div>
            </div>
            <div className='flex items-center gap-7'>
                
                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaUserCircle/>
                          )
                        }
                      </div>
                    )
                  }
            {
                menuDisplay && (
                  <div className='absolute md:bg-white bottom-0 top-11 h-fit p-2 md:shadow-lg rounded'>
                <nav>
                <Link to={"/admin"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                </nav>
              </div>
                )
              }
             </div>
             <div className='text-3xl cursor-pointer relative '>
              <span><FaShoppingCart/></span>
              <div className='bg-red-600 text-white rounded-full w-5 p-1 flex items-center justify-center absolute -top-2 -right-3 '>
              <p className='text-xs'>0</p>
              </div>
             </div>
             <div>
             {
              user?._id ? (
                <button onClick={handleLogout} className='px-6 py-2 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              ):(
                <Link to='/login' className='px-6 py-2 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
              )
             }
             </div>
            </div>
        </div>
    </header>

  )
}

export default Header
