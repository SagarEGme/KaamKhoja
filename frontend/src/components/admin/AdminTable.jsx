import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Cross, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import axios from 'axios'

const AdminTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    useEffect(() => {
        const filteredJob = allAdminJobs?.length > 0 ? allAdminJobs.filter((job) => job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())) : [];
        setFilterJob(filteredJob);
    }, [allAdminJobs, searchJobByText])
    const deleteJob= async (jobId)=>{
        console.log("inside delete job")
        try {
            console.log("inside try job")
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`,{withCredentials:true})
            console.log("inside res",res)
            toast.success(res.data.message);
            navigate("/admin/jobs")
        } catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate();
    const sortedFilteredJob = [...filterJob].sort((a,b)=>{
        return new Date(b.createdAt)- new Date(a.createdAt)
    })
    return (
        <div>

            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black font-semibold">Job Role</TableHead>
                        <TableHead className="text-black font-semibold">Company</TableHead>
                        <TableHead className="text-black font-semibold">Type</TableHead>
                        <TableHead className="text-black font-semibold">Date</TableHead>

                        <TableHead className="text-right text-black font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedFilteredJob ? (
                        sortedFilteredJob.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company.name}</TableCell>
                                <TableCell>{job.jobType}</TableCell>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-40 flex gap-3 flex-col">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 justify-start w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 justify-start w-fit cursor-pointer'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                            <div onClick={() => deleteJob(job._id)} className='flex items-center gap-2 justify-start w-fit cursor-pointer'>
                                                <Cross className='w-4 rotate-45' />
                                                <span>Delete Job</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="text-center">No jobs found</TableCell>
                        </TableRow>
                    )}


                </TableBody>
            </Table>
        </div>
    )
}

export default AdminTable