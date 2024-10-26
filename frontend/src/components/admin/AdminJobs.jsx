import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Plus } from 'lucide-react'
import AdminTable from './AdminTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])


    return (
        <>
            <Navbar />
            <div className='max-w-6xl mx-auto p-3 my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className="w-[40%] p-2"
                            placeholder="Filter job by name or company.."
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <Button onClick={() => navigate("/admin/jobs/create")}><Plus className='pr-1 text-white' />New Job</Button>
                    </div>

                    <AdminTable  />
            </div>
        </>
    )
}

export default AdminJobs