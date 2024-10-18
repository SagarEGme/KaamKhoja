import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const company = null;
    const navigate = useNavigate();
    return (
        <div className='max-w-4xl mx-auto'>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    <TableCell>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                    </TableCell>
                    <TableCell>hello</TableCell>
                    <TableCell>hello</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div onClick={() => navigate("/admin/companies/abc")} className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <Edit2 className='w-4' />
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable