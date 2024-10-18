import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongoDBTime)=>{
    const createdAt = new Date(mongoDBTime);
    const currentTime = new Date();
    const timeDiffernece = currentTime - createdAt;
    return Math.floor(timeDiffernece/(1000*24*60*60));
  }

  return (
    <div className='p-4 shadow-xl rounded-xl m-2'>
      <div className='flex items-center justify-between'>
        <p>{daysAgoFunction(job?.createdAt)===0 ? "Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
        <Avatar>
        <AvatarImage className="rounded-full " src = "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"/>
        </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Google</h1>
          <p className='text-sm text-gray-500'>{job.location} || Kathmandu</p>
        </div>
      </div>
      <div>
                <h1 className='font-bold text-lg my-2'>{job.title}</h1>
                <p className='text-sm text-gray-600'>{job.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.position? job.position : "not mentioned"}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={()=> navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className="bg-[#7209b7] w-full ">Save For Later</Button>
            </div>
    </div>
  )
}

export default Job