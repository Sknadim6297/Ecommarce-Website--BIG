import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/ProductCategory'
import VerticalCard from '../Components/VerticalCard'
import summaryApi from '../common'
import { FiMoreVertical, FiX } from 'react-icons/fi'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")
    const [showOptions, setShowOptions] = useState(false) // State to toggle options

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject || {})
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async () => {
        const response = await fetch(summaryApi.filterProduct.url, {
            method: summaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const dataResponse = await response.json()

        setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }))
    }

    const handleToggleOptions = () => {
        setShowOptions(prev => !prev)
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    return (
        <div className='container mx-auto p-4'>
            {/** Mobile: Toggle between three dots and close button */}
            <div className='lg:hidden flex justify-end mb-4'>
                <button onClick={handleToggleOptions} className='text-2xl'>
                    {showOptions ? <FiX /> : <FiMoreVertical />} {/* Show close or three dots */}
                </button>
            </div>

            <div className='lg:grid grid-cols-[200px,1fr] gap-4'>
                {/*** Left Side (Filter Section) ***/}
                {(showOptions || window.innerWidth >= 1024) && (
                    <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                        <div className=''>
                            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                            <form className='text-sm flex flex-col gap-2 py-2'>
                                <div className='flex items-center gap-3'>
                                    <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                    <label>Price - Low to High</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                    <label>Price - High to Low</label>
                                </div>
                            </form>
                        </div>

                        <div className=''>
                            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                            <form className='text-sm flex flex-col gap-2 py-2'>
                                {
                                    productCategory.map((categoryName, index) => {
                                        return (
                                            <div className='flex items-center gap-3' key={index}>
                                                <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>
                    </div>
                )}

                {/*** Right Side (Product Section) ***/}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && !loading && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
