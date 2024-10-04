import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import { useSelector } from 'react-redux';

const Profile = () => {
  const isResume = false;
  const [open,setOpen] = useState(false);
  const user = useSelector(store => store.auth)
  console.log("profile section", user)
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}Sagar Regmi</h1>
              <p>{user?.profile?.bio}Hey biatch</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}onlyfans.com</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}100</span>
          </div>
        </div>
      </div>
      <div className='max-w-5xl mx-auto mt-4'>

        <div className='my-5'>
          <h1 className='font-bold text-md'>Skills</h1>
          <div className='flex items-center gap-1 my-2 p-2'>
           {
            ["react","mern","html"].map((item,index) => {
              return (

                <Badge key={index}>{item}</Badge>
              )
            })
           }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span className='flex items-center gap-1 px-2'>NA</span>
          }
        </div>
        <div className='bg-slate-50 rounded-2xl my-3 p-3'>

        <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>

    </div>

  )
}

export default Profile