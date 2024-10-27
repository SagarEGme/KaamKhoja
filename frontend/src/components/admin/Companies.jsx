import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus } from 'lucide-react'
import Footer from '../shared/Footer'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    //creating a local state.
    const [input, setInput] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])



    const { allCompanies } = useSelector(store => store.company)
    return (
        <>
            <Navbar />
            <div className='max-w-3xl mx-auto p-3'>
                <div className='md:max-w-6xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className="md:w-fit w-[50%]"
                            placeholder="Filter by name"
                            onChange={(e) => setInput(e.target.value)}
                        />
                            
                            <Button className="p-2 w-fit text-xs sm:text-sm" onClick={() => navigate("/admin/companies/create")}><Plus className='pr-1 text-white w-5 sm:w-7' />New Company</Button>
                    </div>
                    {
                        allCompanies.length <= 0 ? <span>No companies registered.</span> : (

                            <CompaniesTable />
                        )}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Companies