import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import { useSelector } from 'react-redux';
import UpdateProfileDialog from './UpdateProfileDialog';
import Footer from './shared/Footer';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth)
  return (
    <div>
      <Navbar />
      <div className='m-4 max-w-4xl md:mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-10 w-10 md:h-24 md:w-24">
              <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user ? user?.fullName : "Sagar rEGmi"}</h1>
              <p className='text-xs md:text-sm'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right flex gap-3" variant="outline"><Pen className='md:w-6 md:h-6 w-4 h-4' /> Edit </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail className='w-5 h-5' />
            <span className='md:font-normal text-sm'>{user?.email || "onlyfans@gmail.com"}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact className='w-5 h-5' />
            <span className='md:font-normal text-sm'>{user?.phoneNumber || 100}</span>
          </div>
        </div>

      </div>
      <div className='max-w-5xl mx-auto mt-4 px-3'>

        <div className='my-5'>
          <h1 className='font-semibold md:font-bold text-xl'>Skills</h1>
          <div className='flex flex-wrap gap-y-3 gap-x-2 items-center my-2'>
            {/* {
            ["react","mern","html"].map((item,index) => {
              return (

                <Badge key={index}>{item}</Badge>
              )
            })
           } */}
            {
              user?.profile.skills.length ? user?.profile?.skills.map((item, index) => <Badge className="text-xs sm:text-sm capitalize hover:scale-105 " key={index}>{item}</Badge>) : <span>Not mentioned.</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-xl md:font-bold font-semibold">Resume</Label>
          {
            user?.profile.resume ? <a target='blank' rel="noopener noreferrer" href={user?.profile.resume} className='text-blue-500 w-full mx-3 font-medium hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span className='flex items-center gap-1 px-2'>NA</span>
          }
        </div>

        <div className='bg-slate-50 rounded-2xl my-3 p-3 w-full'>

          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
      <Footer />
    </div>

  )
}

export default Profile