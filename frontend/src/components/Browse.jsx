
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { BiError } from 'react-icons/bi';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router-dom';



const Browse = () => {
    useGetAllJobs();
    const navigate = useNavigate();
    const { allJobs, searchQuery } = useSelector(store => store.job);

    const dispatch = useDispatch();
    const [searchJobValue, setSearchJobValue] = useState("")
    const submitQueryHandler = () => {
        dispatch(setSearchQuery(searchJobValue));
    }
    const [filterJobs, setFilterJobs] = useState([]);
    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => (job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || job?.description?.toLowerCase().includes(searchQuery.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) || job?.company?.location.toLowerCase().includes(searchQuery.toLowerCase())));
            // const filteredJobs = filterJobs.filter((job)=>job?.title?.toLowerCase()===searchQuery.toLowerCase() || job?.description?.toLowerCase()===searchQuery.toLowerCase() || job?.company?.name.toLowerCase()===searchQuery.toLowerCase());
            // I was filtering on filterJobs . but it was the filtered item so i was gettgin filterjobs as null.
            // it should be allJobs on which filter should be performed.
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs)
        }
    }, [searchQuery, allJobs, filterJobs]);

    const clearSearhcHandler = () => {
        dispatch(setSearchQuery(""));
        navigate("/browse")
      }
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex justify-between px-2 gap-3 md:gap-3 flex-col sm:flex-row'>
                    <h1 className='font-bold text-sm md:text-xl mt-10'>Search Results {searchQuery ? `for ${searchQuery}` : ""} ({filterJobs.length})</h1>
                    <div className='flex items-center '>
                        <input
                            type="text"
                            placeholder='Find your dream job'
                            onChange={(e) => setSearchJobValue(e.target.value)}
                            className='rounded-l-full border border-gray-300 border-r-transparent p-2 w-full'

                        />
                        <Button onClick={submitQueryHandler} className="p-3 rounded-r-full bg-[#6A38C2]">
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                </div>
                {
                    !filterJobs.length && <div>
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px',
                            backgroundColor: '#f8d7da', borderRadius: '10px', color: '#721c24', border: '1px solid #f5c6cb',
                            maxWidth: '400px', margin: 'auto',marginTop:'40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <BiError size={48} />
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>No Results Found</p>
                            <p style={{ fontSize: '14px', color: '#721c24' }}>Try a different search term ! You can search according to job title , company name , and location of job.</p>
                        <Button className="mt-4 p-2" onClick={clearSearhcHandler}>Clear Search</Button>
                        </div>
                       
                    </div>
                }
                <div className='grid md:grid-cols-3 gap-4'>
                    {
                        filterJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Browse
