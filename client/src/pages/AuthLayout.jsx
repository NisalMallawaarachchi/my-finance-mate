/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { Children } from 'react'
import cardHomePage from "../images/cardHomePage.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>
        <span className="text-custom-purple">MyFinance</span>
        <span className="text-slate-700">Mate</span>
        </h2>
        {children}
      </div>

    <div className='hidden md:block w-[40vw] h-screen bg-violet-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative '>
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'/>
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10'/>
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5'/>

        <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard
                icon={<LuTrendingUpDown />}
                label="Track Your Income & Expenses"
                value="430,000"
                color="bg-primary"
            />
        </div>


        <img
        src={cardHomePage}
        className='w-64 lg:w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-blue-400/15 '
        />
    </div>

    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) =>{
    return <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10 '>
        <div className='w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl'>
        {icon}
        </div>
        <div>
            <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
            <span className='text-[20px]'>${value}</span>
        </div>
    </div>

}