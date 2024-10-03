import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3, 4].map((item, index) => {
                            return (

                                <TableRow>
                                    <TableCell className="font-medium w-[30%]">14th Feb,2024</TableCell>
                                    <TableCell>Full Stack</TableCell>
                                    <TableCell>TechAxis</TableCell>
                                    <TableCell className="text-right"><Badge>Pending</Badge></TableCell>
                                </TableRow>
                            )

                        })
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default AppliedJobTable