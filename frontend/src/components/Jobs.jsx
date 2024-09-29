import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';

const Jobs = () => {
    const filterJobs = [1,2,3,4,5,6,7,8];
    return (
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="W-18%">
                        <FilterCard/>
                    </div>
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5 border-l-2  ">
                        <div className="grid grid-cols-3 gap-3">
                        {
                            filterJobs.map((job)=><Job/>)
                        }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Jobs