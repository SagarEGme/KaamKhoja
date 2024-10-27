
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const [query, setQuery] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    dispatch(setSearchQuery(query));

    const checkIfEnter=(event)=>{
        if(event.key==='Enter') submitQueryHandler();
    }
    const submitQueryHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center '>
            <div className='flex max-w-fit ml-auto sm:max-w-6xl mx-auto flex-col gap-5 my-2'>
                <span className=' mx-auto px-3 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Kaam Khoja Sajilo jiwan roja</span>
                <h1 className='text-3xl md:text-5xl font-bold'>Search, Apply & <br /> Find Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
                <p className='text-xs text-gray-700 sm:text-sm'>Leading website in Nepal to find all kind of jobs - full time, part time <br/>- for students,graduates and others.</p>
                <div className='flex md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream job'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={checkIfEnter}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={submitQueryHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Hero;
