import React from 'react'
import LatestJobCards from './LatestJobCards.jsx';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import { Button } from './ui/button.jsx';


const LatestJobs = () => {
    const navigate = useNavigate();
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);

    const sortedJobs = [...allJobs].sort((a,b)=>{
        return new Date(b.createdAt) - new Date(a.createdAt);
    })
    
    


    return (
        // use max-w-fit to limit the box only upto the content 
        // use max-w-full to properly grid the container.
        <div className='max-w-full ml-auto md:max-w-6xl md:mx-auto mt-20 mb-3 '>
            <div className="flex items-center justify-center border-t-2 border-gray-200 p-4">

                <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 p-2 lg:grid-cols-3 gap-4'>
                {
                    sortedJobs.length !== 0 ? sortedJobs.slice(0, 6).map((job) => <LatestJobCards job={job} />) : <span>No Job posted.</span>
                }
            </div>
            {allJobs.length > 6 && <div className='font-medium text-xl mt-4 items-center justify-center flex'>
                <span>For more jobs, click on <Link className='text-blue-700' to="/jobs">Job</Link>.</span>
            </div>}
            <div className='p-2 flex flex-col md:flex-row items-center justify-left gap-3'>
                <h3><span className='text-blue-600'>Disclaimer: </span>To Post Jobs,Create an account with a role of recruiter.</h3>
                <Button className="rounded-full px-4 bg-blue-600 text-lg" onClick={() => navigate("/signup")}>Signup</Button>
            </div>
        </div>
    )
}

export default LatestJobs