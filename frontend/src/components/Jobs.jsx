import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { BiError } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allJobs);


    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job?.company?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job?.salary > searchQuery ||
                    job?.salary == searchQuery

            })
            setFilterJobs(filteredJobs)
           
            
        } else {
            
            setFilterJobs(allJobs)
        }
        
    }, [allJobs, searchQuery]);
    return (
        <div>
            <Navbar />
            <div className="flex flex-col max-w-7xl min-h-screen mx-auto mt-5">
                <div className="flex flex-gap-5 ">
                    <div className="W-18% hidden md:block">
                        <FilterCard />
                    </div>
                    <div className="flex-1 w-full pb-5 border-l-2  ">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center ">
                            {
                                filterJobs.length > 0 ? filterJobs.map((job) => <div
                                        className='w-full'
                                    key={job?._id}
                                >
                                    <Job job={job} />
                                </div>) :
                                
                                    <div className='absolute top-[50%]' >
                                        <div style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap:5,
                                            backgroundColor: '#f8d7da', borderRadius: '10px', color: '#721c24', border: '1px solid #f5c6cb',
                                            maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' , padding:10
                                        }}>
                                            <BiError size={48} />
                                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>No Results Found</p>
                                            <p style={{ fontSize: '14px', color: '#721c24' }}>Try a different search term ! You can search according to job title , company name , and location of job.</p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Jobs