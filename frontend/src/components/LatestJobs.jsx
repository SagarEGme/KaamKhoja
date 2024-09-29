import React from 'react'
import LatestJobCards from './LatestJobCards.jsx';


const LatestJobs = () => {
    const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className='max-w-6xl mx-auto my-20'>
            <div className="flex items-center justify-center border-t-2 border-gray-200 p-4">

                <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            </div>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    randomJobs.map((item, index) => <LatestJobCards />)
                }
            </div>
        </div>
    )
}

export default LatestJobs