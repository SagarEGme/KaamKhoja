import React from 'react'
import LatestJobCards from './LatestJobCards.jsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const LatestJobs = () => {
    const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-6xl mx-auto my-20'>
            <div className="flex items-center justify-center border-t-2 border-gray-200 p-4">

                <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            </div>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length !== 0 ? allJobs.slice(0, 6).map((job) => <LatestJobCards job={job} />) : <span>No Job posted.</span>
                }
            </div>
            {allJobs.length > 6 && <div className='font-medium text-xl mt-4 items-center justify-center flex'>
                <span>For more jobs, click on <Link className='text-blue-700' to="/jobs">Job</Link>.</span>
            </div>}
        </div>
    )
}

export default LatestJobs