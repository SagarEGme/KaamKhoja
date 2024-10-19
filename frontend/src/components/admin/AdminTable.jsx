import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    useEffect(() => {
        const filteredJob = allAdminJobs?.length > 0 ? allAdminJobs.filter((job) => job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())) : [];
        setFilterJob(filteredJob);
    }, [allAdminJobs, searchJobByText])
    const navigate = useNavigate();
    return (
        <div className='max-w-4xl mx-auto'>
            {console.log(filterJob)
            }
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>

                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJob ? (
                        filterJob.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.role}</TableCell>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
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