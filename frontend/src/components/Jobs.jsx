import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allJobs);


    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job?.company?.location?.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchQuery]);
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 ">
                <div className="flex gap-5 ">
                    <div className="W-18%">
                        <FilterCard />
                    </div>
                    <div className="flex-1 h-[88vh] pb-5 border-l-2  ">
                        <div className="grid grid-cols-3 gap-3">
                            {
                                filterJobs.length > 0 ? filterJobs.map((job) => <div
                                   
                                    key={job?._id}
                                >
                                    <Job job={job} />
                                </div>) : <span>No jobs available</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs