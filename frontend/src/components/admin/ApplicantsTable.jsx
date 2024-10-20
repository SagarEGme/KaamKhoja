import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, Eye, EyeOff, Loader, MoreHorizontal, ScanEyeIcon, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const shortlistingStatus = ["Accepted", "Rejected", "Pending"];

const ApplicantsTable = () => {
  const { allApplicants } = useSelector(store => store.application);
  const navigate = useNavigate()
  const statusHandler = async (status, id) => {
    try {
      console.log("inside status");

      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
      if (res) {
        console.log(res)
        toast.success(res.data.message);
        navigate('/admin/jobs')

      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allApplicants && allApplicants?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>{item?.status}</TableCell>
                <TableCell >
                  {
                    item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {
                        shortlistingStatus.map((status, index) => {
                          return (

                            <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex mr-3 items-center my-2 cursor-pointer'>
                              {
                                status === "Accepted" ? <span> <Check /></span> : (status === "Rejected" ? <span><X /></span> : <span><Loader /></span>)
                              }
                              <span className='ml-2 hover:text-blue-700'>{status}</span>
                            </div>
                          )
                        })
                      }
                    </PopoverContent>
                  </Popover>

                </TableCell>

              </tr>
            ))
          }

        </TableBody>

      </Table>
    </div>
  )
}

export default ApplicantsTable