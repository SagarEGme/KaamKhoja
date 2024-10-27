import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AppliedJobTable = () => {
    useGetAllAppliedJobs();
    const navigate = useNavigate()
    const { allAppliedJobs } = useSelector(store => store.auth)
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead >Positions</TableHead>
                        <TableHead >Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.map((item, index) => {
                            const badgeColor= item.status === 'pending' ? "blue": item.status === 'accepted'? "green" : "red" ;
                            // cant apply bg-${badgeColor}-400
                            return (

                                <TableRow>
                                    <TableCell>{item?.job?.title || "No name"}</TableCell>
                                    <TableCell>{item?.job?.company?.name ? item?.job?.company?.name : "NA"}</TableCell>
                                    {console.log(`bg-${badgeColor}-400`)}
                                    <TableCell className="font-medium"><Badge className={`p-2 text-[0.8rem] hover:cursor-pointer`}>{item.status} </Badge></TableCell>
                                    <TableCell>{item?.job?.position ? item?.job?.position :"NA"}</TableCell>
                                    <TableCell className="font-medium w-[17%] ">{item?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-blue-500 cursor-pointer hover:underline" onClick={()=>navigate(`/description/${item.job._id}`) }>Visit Job Description</TableCell>
                                </TableRow>
                )

                        })
                    }
            </TableBody>
        </Table>

        </div >
    )
}

export default AppliedJobTable