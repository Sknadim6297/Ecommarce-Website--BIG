import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';
// import ChangeUserRole from '../Components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUsers.url,{
            method : SummaryApi.allUsers.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

    return (
        <div className='bg-white pb-4'>
            <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                    <thead className='bg-black text-white'>
                        <tr>
                            <th className='py-2 px-4'>Sr.</th>
                            <th className='py-2 px-4'>Name</th>
                            <th className='py-2 px-4'>Email</th>
                            <th className='py-2 px-4'>Role</th>
                            <th className='py-2 px-4'>Created Date</th>
                            <th className='py-2 px-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((el, index) => (
                            <tr key={index} className='border-b'>
                                <td className='py-2 px-4'>{index + 1}</td>
                                <td className='py-2 px-4'>{el?.name}</td>
                                <td className='py-2 px-4'>{el?.email}</td>
                                <td className='py-2 px-4'>{el?.role}</td>
                                <td className='py-2 px-4'>{moment(el?.createdAt).format('LL')}</td>
                                <td className='py-2 px-4'>
                                    <button
                                        className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                        onClick={() => {
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
  )
}

export default AllUsers