import React from 'react'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const LatestJobCards = ({ job }) => {
    const daysAgoFunction = (mongoDBTime) => {
        const createdAt = new Date(mongoDBTime);
        const currentTime = new Date();
        const timeDiffernece = currentTime - createdAt;
        return Math.floor(timeDiffernece / (1000 * 24 * 60 * 60));
      }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
                    <p className='text-gray-400 text-sm'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>

            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name || "no company name"}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location || "no company location"}</p>
            </div>
            <div>
                <div className='flex items-center gap-3 my-3'>
                    <span className='text-gray-600 text-sm'>Job Title :</span>
                    <h1 className='font-bold text-lg'> {job.title}</h1>
                </div>
                <p className='text-sm text-gray-600'>{job.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Senior Developer</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary} LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards