import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-dvh'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default MainLayout