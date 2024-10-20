
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { Search } from 'lucide-react';


const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.job);
    
    const dispatch = useDispatch();
    const [searchJobValue, setSearchJobValue] = useState("")
    const submitQueryHandler = () => {
        console.log(searchJobValue)
        dispatch(setSearchQuery(searchJobValue));
    }
    const [filterJobs, setFilterJobs] = useState([]);
    useEffect(() => {
        if (searchQuery) {

            console.log("all jobs", allJobs)
            const filteredJobs = allJobs.filter((job) => (job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || job?.description?.toLowerCase().includes(searchQuery.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchQuery.toLowerCase())));
            console.log("filtered job", filteredJobs)
            // const filteredJobs = filterJobs.filter((job)=>job?.title?.toLowerCase()===searchQuery.toLowerCase() || job?.description?.toLowerCase()===searchQuery.toLowerCase() || job?.company?.name.toLowerCase()===searchQuery.toLowerCase());
            // I was filtering on filterJobs . but it was the filtered item so i was gettgin filterjobs as null.
            // it should be allJobs on which filter should be performed.
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs)
        }

    }, [searchQuery, allJobs]);
    // useEffect(()=>{
    //     dispatch(setSearchQuery(""));
    // },[])




    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-xl my-10'>Search Results {searchQuery ? `for ${searchQuery}` : ""} ({filterJobs.length})</h1>
                    <div className='flex items-center '>
                        <input
                            type="text"
                            placeholder='Find your dream job'
                            onChange={(e) => setSearchJobValue(e.target.value)}
                            className='rounded-l-full border border-gray-300 border-r-transparent p-2 w-full'

                        />
                        <Button onClick={submitQueryHandler} className="rounded-r-full bg-[#6A38C2]">
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        filterJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse
