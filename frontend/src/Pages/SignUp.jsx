import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import loginIcon from '../assets/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import summaryApi from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {

  const navigate= useNavigate()
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

    const [data, setData] = useState({
      name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault()
        try {
          
        if(data.password == data.confirmPassword){

          const dataResponse=await fetch(summaryApi.SignUP.url,{
            method:summaryApi.SignUP.method,
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
          })
          const dataApi= await dataResponse.json()
          console.log('User',dataApi);
          toast.success('User Registered Successfully')
          navigate('/login')
          } 
          else{
           toast.error('Password and Confirm Password should be same')
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }

    }

    const handleUploadPic = async(e) =>{
      const file = e.target.files[0]
      
      const imagePic = await imageTobase64(file)
      
      setData((preve)=>{
        return{
          ...preve,
          profilePic : imagePic
        }
      })
  
    }


  return (
    <section id='signup'>
    <div className='mx-auto container p-4'>

        <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto'>
        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcon} alt='login icons'/>
                        </div>
                        <form>
                          <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                              Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                          </label>
                        </form>
                    </div>
                <form className='mt-4 flex flex-col' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                <label>Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='name' 
                                    placeholder='Name' 
                                    name='name'
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='Enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex items-center'>
                                <input 
                                    type= {showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                    <div>
                                     <span>
                                     {
                                            showPassword ? 
                                            <FaEye onClick={() => setShowPassword(!showPassword)}/> :
                                            <FaEyeSlash onClick={() => setShowPassword(!showPassword)}/>
                                     }

                                     </span>
                                    </div>
                            </div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex items-center'>
                                <input 
                                    type= {showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Enter Confirm Password'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                    <div>
                                     <span>
                                     {
                                            showConfirmPassword ? 
                                            <FaEye onClick={() => setShowConfirmPassword(!showPassword)}/> :
                                            <FaEyeSlash onClick={() => setShowConfirmPassword(!showPassword)}/>
                                     }

                                     </span>
                                    </div>
                            </div> 
                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Signup</button>
                            
                        </div>
                </form>
                <p className=' text-center my-5'>Already have an Account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                </div>
                </div>
                </section>
  )
}

export default SignUp
