import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between align-middle p-4 bg-stone-300 border-b'>
        <h1 className='font-black text-2xl'>AuthPractice</h1>

        <div className='flex gap-4 font-medium'>
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>Products</Link>
        </div>

        <div className='cursor-pointer'>
            Theme
        </div>
    </div>
  )
}

export default Navbar