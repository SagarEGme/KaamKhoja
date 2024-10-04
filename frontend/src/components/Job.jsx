import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const navigate = useNavigate();
  const jobId = "hello";
  return (
    <div className='p-4 shadow-xl rounded-xl m-2'>
      <div className='flex items-center justify-between'>
        <p>4 days ago</p>
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
          <p className='text-sm text-gray-500'>Kathmandu</p>
        </div>
      </div>
      <div>
                <h1 className='font-bold text-lg my-2'>Software Engineer</h1>
                <p className='text-sm text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nostrum?</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">senior dev</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">10 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={()=> navigate(`/description/${jobId}`)}>Details</Button>
                <Button className="bg-[#7209b7] w-full ">Save For Later</Button>
            </div>
    </div>
  )
}

export default Job