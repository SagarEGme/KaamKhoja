import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {motion} from "framer-motion"

const CompaniesTable = () => {
    const { allCompanies,searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany,setFilterCompany] = useState(allCompanies);
    useEffect(()=>{
        const filteredCompany = allCompanies.length>=0 && allCompanies.filter((company)=>{
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    },[filterCompany])    
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
                    {
                        filterCompany.map((company) => (
                            <motion.tr
                                initial={{y:100, opacity:0}}
                                animate={{y:0, opacity:1}}
                                exit={{y:-100, opacity:0}}
                                transition={{duration:0.5}}
                            >
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}  />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>

                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable