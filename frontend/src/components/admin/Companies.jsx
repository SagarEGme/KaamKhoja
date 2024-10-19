import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    //creating a local state.
    const [input,setInput] = useState("")
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input))
    },[input])



    const { allCompanies } = useSelector(store => store.company)
    return (
        <>
            <Navbar />
            <div className='max-w-3xl mx-auto'>
                <div className='max-w-6xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className="w-fit"
                            placeholder="Filter by name"
                            onChange={(e)=>setInput(e.target.value)}
                        />
                        <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                    </div>
                    {
                        allCompanies.length <= 0 ? <span>No companies registered.</span> : (

                            <CompaniesTable />
                        )}
                </div>
            </div>
        </>
    )
}

export default Companies